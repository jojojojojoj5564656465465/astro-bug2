/*

initial input text-[red, 3xl] bg-[hover:red,3xl] 

border-[lg:[hover:red,2],1]
{before}:{state}:{category}-{css}
output = lg:hover:border-red lg:border-2 border-1

*/
let eeee
eeee = 'last:lg:green,state1:css2,css-200,css-20099'
eeee = 'state:css2'
eeee = 'state1:state2:css-200,state11:css-200,css3'
eeee = 'lg:hover:[first:red-100,last:green]'
//hover:3xl,lg:[hover:red],
interface MyObject {
  before?: string
  state?: string
  category?: string
  css?: string
}
type regexArray = RegExpMatchArray | null
const regex = {
  validation: {
    nestedBrackets: new RegExp(
      '(\\w+):\\[(.+?)\\]|(\\w+)?:?(\\w+):\\[(.+?)\\]'
    ),
    virguleOrDots: new RegExp('[:,]')
  },
  beforeCapture: new RegExp('(?<before>.*):\\[(?<cssInside>.*)\\]'),
  beforeCaptureVirgule: new RegExp(
    '^(?<before>\\w.*):\\[(?<css_With_coma_inside>[\\w:,\\w:]+)\\]$'
  ),
  virgule: new RegExp('([^,]+)', 'gs'),
  twoDots: new RegExp('([^:\\s]+)', 'gs') // Add a backslash escape before the colon
}
interface String {
  splitToSet(delimiter: string): Set<string>
}

String.prototype.splitToSet = function (delimiter) {
  let set: Set<string> = new Set()
  let temp:string = ''
  for (const char of this) {
    if (char === delimiter) {
      set.add(temp)
      temp = ''
    } else {
      temp += char
    }
  }
  set.add(temp)
  return set
}

/**
 * @description decouper chaque element avec red,lg:[hover:green,3xl] =>[red, [lg, hover:green,3xl]]
 */
const splitString = (str: string): Set<string> => {
  const removeSpaceInString = (string: string): string => {
    return string
      .trim()
      .replace(/,+/g, ' ')
      .replace(/\s+/g, ',')
      .replace(/\|/g, ',')
  }

  const result: Set<string> = new Set()
  let currentElement: string = ''
  let parenthesesCount: boolean = true

  for (const char of removeSpaceInString(str)) {
    if (char === '[') {
      parenthesesCount = false
    } else if (char === ']') {
      parenthesesCount = true
    }

    if (char === ',' && parenthesesCount === true) {
      result.add(currentElement.toLowerCase().trim())
      currentElement = ''
    } else {
      currentElement += char.trim()
    }
  }

  if (currentElement.trim() !== '') {
    result.add(currentElement.toLowerCase().trim())
  }

  return result
}

/**
 * @description   groups: { before: 'lg:hover', cssInside: 'first:red-100,last:green' } ]
 */
/**
 * @description   groups: { before: 'lg:hover', cssInside: 'first:red-100,last:green' } ]
 */
interface NestedElementResult {
	before?: string[];
	cssInside: string[][];
}

function nestedElement(x: string): NestedElementResult | undefined {
	// Check if the string contains nested elements like "hover:[red,3xl]"
	if (regex.validation.nestedBrackets.test(x)) {
		const match = x.match(regex.beforeCapture);
		if (match && match.groups) {
			const { before, cssInside } = match.groups;
			if (before && cssInside) {
				const obj = {
					get before() {
						return before.split(":");
					},
					get cssArraySpliterFn() {
						return cssInside.split(",").map((e:string) => e.split(":"));
					},
				};
				// cb(obj.cssArraySpliterFn)
				return {
					before: obj.before,
					cssInside: obj.cssArraySpliterFn,
				};
			}
		}
	} else {
		// console.log("x val:",x.split(",").map((e) => e.split(":")));
		return {
			cssInside: x.split(",").map((e) => e.split(":")),
		};
	}
}

////////// essayer de destructurer cssinside
/// output >>>> Set { [ 'hover', 'red' ], [ 'ezs' ] }
const splitInsideBrakets = (cssInside: string): Set<string[]> => {
  const setResult: Set<string[]> = new Set()

  if (regex.validation.virguleOrDots.test(cssInside)) {
    const matches: regexArray = cssInside.match(regex.virgule)
    //console.log("virgule", matches);

    if (matches) {
      for (const d of matches) {
        let temp: Set<string> = new Set()
        const twoDotsMatches: regexArray = d.match(regex.twoDots)
        //console.log(twoDotsMatches);
        if (twoDotsMatches) {
          for (const m of twoDotsMatches) {
            temp.add(m)
          }
          setResult.add([...temp])
        }
      }
    }
  } else {
    setResult.add([cssInside])
  }
  return setResult
}



//fonction run
// je pense que cest un for quil faut faire de cette fonction et non la fonction finish
  const FINAL_SET_fn = nestedElement('lg:hover:hhh').cssInside.flatMap(
    (cssElement): Set<string> => {
      const tempppMap = new Map()

      if (teeee.before || cssElement.length > 1) {
        const tempState: string[] = cssElement.slice(0, -1)

        let tempSet_Before_State: Set<string> =
          teeee.before && teeee.before.length > 1
            ? new Set(teeee.before.concat(tempState))
            : new Set(tempState)

        tempppMap.set('state', [...tempSet_Before_State])
      }
      tempppMap.set('category_&&_css', [cat, cssElement.pop()!])

      const valuesArray = Array.from(tempppMap.values())

      let values = ''
      if (!!tempppMap.get('state').length) {
        values += [...tempppMap.get('state')]?.join(':') + ':'
      }
      values += [...tempppMap.get('category_&&_css')]!.join('-')

      return FINAL_SET.add(values)
    }
  )

const kh = finish(eeee)


const objd = {

splitString : splitString('hover:hover:[aa,hover:rk],red,pink,hover:3xl'),
nestedElement: nestedElement('red,3xl,lg:state:green,6'),
splitInsideBrakets:splitInsideBrakets('red,3xl,lg:state:green')
}
//console.log(obj)
for (const a of objd.splitString){
  console.log(nestedElement(a))
}

/*
const result = eeee.replace(
	/^(font|bg|border|stroke|outline|underline|ring|divide|text)-\[(.*)\]$/,
	(match, category, stringElement) => {
		const mediaQuery = ["sm", "md", "lg", "xl", "2xl"] as const;
		type MediaQuery = (typeof mediaQuery)[number];

		return ""; // Replace this with the desired result
	}
);
*/

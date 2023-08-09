type regexArray = RegExpMatchArray | null

interface NestedElementResult {
  before: string[]
  cssInside: string[][]
}

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

/**
 * @description   groups: { before: 'lg:hover', cssInside: 'first:red-100,last:green' } ]
 */
function nestedElement(x: string): NestedElementResult | undefined {
  // Check if the string contains nested elements like "hover:[red,3xl]"
  if (regex.validation.nestedBrackets.test(x)) {
    const match: regexArray = x.match(regex.beforeCapture)
    if (!!match) {
      const obj = {
        _before: match?.groups?.before,
        _string: match?.groups?.cssInside,
        get beforefn() {
          return this._before.split(':')
        },
        get cssArraySpliterFn() {
          return this._string.split(',').map((e) => e.split(':'))
        }
      }
      // cb(obj.cssArraySpliterFn)
      return {
        before: obj.beforefn,
        cssInside: obj.cssArraySpliterFn
      }
    }
  }
}

const teeee = nestedElement(
  'lg:hover:[before:hover:lg:red,pink,pink,before:before:orange]'
)

let cat = 'text'

if (teeee) {
  let before = teeee.before
  let cssArraySpliterFn = teeee.cssInside
  let FINAL_SET: Set<string> = new Set()
  const FINAL_SET_fn = cssArraySpliterFn.flatMap((cssElement): Set<string> => {
    const tempppMap = new Map()

    if (before || cssElement.length > 1) {
      const tempState: string[] = cssElement.slice(0, -1)
      let tempSet_Before_State: Set<string> =
        before.length > 1
          ? new Set(before.concat(tempState))
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
  })

  console.log(FINAL_SET)
}


export const addRule = (function(style) {
  var sheet = document.head.appendChild(style).sheet
  var firstIndex = 0
  return function(selectors, cssList) {
    selectors.forEach((selector, selectorIndex) => {
      var propText = Object.keys(cssList[selectorIndex]).map(function(cssPropName) {
        return cssPropName + ':' + cssList[selectorIndex][cssPropName]
      }).join(';\n')

      const ruleId = sheet.insertRule(selector + '{' + propText + '}', sheet.cssRules.length)

      if (selectorIndex === 0) {
        firstIndex = ruleId
      }
    })
    return { sheet, firstIndex }
  }
})(document.createElement('style'))

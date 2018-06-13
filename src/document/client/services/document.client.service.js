angular.module('Document').factory('DocumentService', [
  () => {
    function getTextAsHtml(document) {
      var text = document.text;
      if (!text) {
        return '';
      }
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br>');
    }

    return {
      getTextAsHtml
    };
  }
]);

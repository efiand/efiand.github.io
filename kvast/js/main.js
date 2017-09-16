var forms = document.querySelectorAll('form.js-fields-control');

for (var i = 0, iLength = forms.length; i < iLength; i++) {
  (function(form) {
    var fields = form.querySelectorAll('form.js-fields-control [name]');
    var btn = form.querySelector('form.js-fields-control button[type="submit"]');
    for (var j = 0, jLength = fields.length; j < jLength; j++) {
      (function(field) {
        var name = field.getAttribute('name');

        field.value = field.value || localStorage.getItem(name) || '';
        function fieldServ() {
          field.value = field.value.trim();
          localStorage.setItem(name, field.value);
          if (form.checkValidity() && btn.hasAttribute('disabled')) {
            btn.removeAttribute('disabled');
          }
          else if (!form.checkValidity()){
            btn.setAttribute('disabled', true);
          }
        }
        field.onkeyup = fieldserv;
        field.onblur = fieldServ;
      })(fields[j]);
    }
    if (!form.checkValidity()) {
      btn.setAttribute('disabled', true);
    }
  })(forms[i]);
}
const prenom = document.querySelector("#prenom");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const telephone = document.querySelector("#telephone");
const password = document.querySelector("#password");
// fonc vérification password
const confirm_password = document.querySelector("#confirm-password");
// fonc no no btn if not accepted
const accept_terms = document.querySelector("#accept-terms");
const btn_auth = document.querySelector("#btn-auth");
let pass = false;

// Fonction de validation des mots de passe et des conditions
if (password && confirm_password && accept_terms && btn_auth) {
  function validateForm() {
    const passwordsMatch = password.value === confirm_password.value;
    const termsAccepted = accept_terms.checked;

    if (passwordsMatch) {
      confirm_password.setCustomValidity("");
    } else {
      confirm_password.setCustomValidity(
        "Les mots de passe ne correspondent pas"
      );
    }

    btn_auth.disabled = !(passwordsMatch && termsAccepted);
  }

  confirm_password.addEventListener("input", validateForm);
  password.addEventListener("input", validateForm);
  accept_terms.addEventListener("change", validateForm);

  // Appel initial pour désactiver le bouton si nécessaire
  validateForm();
}

export { prenom, nom, email, telephone, password, pass };

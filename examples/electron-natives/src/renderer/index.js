const storage = require('electron-json-storage');
const { dialog } = require('electron').remote;

const FORM_DATA_KEY = 'form-x';

storage.get(FORM_DATA_KEY, (error, data) => {
  if (error) throw error;

  Object.entries(data).forEach(([key, value]) => {
    const el = document.getElementById(key);
    if (el) el.value = value;
  });
});

window.submit_form = (form) => {
  const data = Array.from(new FormData(form).entries()).reduce(
    (prev, [key, value]) => ({ ...prev, [key]: value }),
    {}
  );

  storage.set(FORM_DATA_KEY, data, (error) => {
    if (error) {
      dialog.showErrorBox('Oh snap', 'Failed to save form data');
    } else {
      dialog.showMessageBox({ message: 'Form data saved' });
    }
  });

  return false;
};

window.clear_data = () => {
  storage.clear();
  window.location.reload();
};

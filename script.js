// Changes the color palette by adjusting the CSS variables through the root element.
function setColorPalette(palette) {
  const rootElement = document.documentElement;
  
  rootElement.style.setProperty('--color-pri', palette[0]);
  rootElement.style.setProperty('--color-sec', palette[1]);
  rootElement.style.setProperty('--color-ter', palette[2]);
}

// Toggles the settings menu view.
const openSettingsBtn = document.getElementsByClassName('open-settings-btn')[0];
const closeSettingsBtn = document.getElementsByClassName('close-settings-btn')[0];
const settingsMenu = document.getElementsByClassName('settings-menu')[0];
const mainMenu = document.getElementsByClassName('main-menu')[0];

openSettingsBtn.addEventListener('click', () => {
  settingsMenu.classList.remove('hidden');
  mainMenu.classList.add('blurred');
});

closeSettingsBtn.addEventListener('click', () => {
  settingsMenu.classList.add('hidden');
  mainMenu.classList.remove('blurred');
});

const colorChanger = document.getElementsByClassName("color-changer")[0];
const colorPicker = document.getElementsByClassName("color-picker")[0];

let colorPalettes = {
  "Neat": ["#b9c3f6", "#1a2c53", "#00c9c8"],
  "Classic": ["white", "black", "violet"],
  "Coffee": ["#1a2c53", "#fff7d6", "#b1a3f1"],
  "Aqua": ["#5c8df7", "#f6f9ff", "#00535b"],
  "Vibrant": ["#1a2c53", "#6ffacc", "#006d98"]
};

// Importing pre-defined color palettes in JSON format into the color picker.
// Then associating each option with the corresponding colors.
for (let palette in colorPalettes) {
  let optionElement = document.createElement('option');
  document.getElementsByClassName('color-picker')[0].appendChild(optionElement);

  optionElement.innerText = palette;
  optionElement.addEventListener('click', () => {
    setColorPalette(colorPalettes[palette]);
    localStorage.setItem("preferedColorPalette", colorPalettes[palette]);
  });
}

// Switches visibility of the color picker window.
colorChanger.addEventListener('click', () => {
  if(colorPicker.classList.contains('hidden')) {
    colorPicker.classList.remove('hidden');
  } else {
    colorPicker.classList.add('hidden');
  }
});

// Manage styling of cards when in view.
const targets = document.getElementsByClassName('card');
Array.from(targets).forEach(element => {
  const observer = new IntersectionObserver((entries) => {
    
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        element.classList.add('in-view');
      } else {
        element.classList.remove('in-view');
      }
    });
  }, {threshold: 0.25});
  observer.observe(element);
});

// Load presets.
if (localStorage.getItem("preferedColorPalette")) setColorPalette(localStorage.getItem("preferedColorPalette").split(','));

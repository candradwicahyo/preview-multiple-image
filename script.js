window.addEventListener('load', () => {
  
  const imageWrapper = document.querySelector('.images-wrapper');
  const inputFile = document.querySelector('#choose');
  inputFile.addEventListener('change', function() {
    const files = this.files;
    for ( let i = 0; i < files.length; i++ ) {
      const result = createImage(files[i]);
      imageWrapper.appendChild(result);
    }
  });
  
  function createElementClass(element, classname) {
    const elementName = document.createElement(element);
    elementName.className = !classname ? '' : classname;
    return elementName;
  }
  
  function createElementValue(element, value, classname) {
    const elementName = document.createElement(element);
    elementName.className = !classname ? '' : classname;
    const elementValue = document.createTextNode(value);
    elementName.appendChild(elementValue);
    return elementName;
  }
  
  function createImage(files) {
    const column = createElementClass('div', 'col-md-6');
    const figure = createElementClass('figure');
    
    const image = createElementClass('img', 'image');
    image.setAttribute('alt', 'images');
    
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = function() {
      image.setAttribute('src', this.result);
    }
    figure.appendChild(image);
    
    const span = createElementValue('span', files.name ,'d-flex justify-content-center align-items-center my-1');
    figure.appendChild(span);
    column.appendChild(figure);
    
    return column;
  }
  
});
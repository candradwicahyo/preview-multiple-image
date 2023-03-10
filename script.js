window.onload = () => {
  
  const content = document.querySelector('.content');
  const button = document.querySelector('#file');
  button.addEventListener('change', function() {
    const file = this.files;
    // looping
    for (const data of file) {
      // render element
      const result = render(data);
      // tampilkan 
      content.appendChild(result);
    }
  });
  
  function render(file) {
    // element column
    const col = create('div', 'col-md-6');
    // frame atau pembungkus gambar
    const frame = create('div', 'frame');
    const image = create('img', 'image img-fluid');
    // jalankan fungsi renderImage()
    renderImage(image, file);
    // gabungkan kedalam element frame
    frame.appendChild(image);
    // pembungkus teks
    const wrapper = create('div', 'd-flex align-items-center my-3');
    const label = create('span', 'fw-light', 'Filename :', true);
    const text = create('span', 'fw-normal ms-1', filter(file.name), true);
    // gabungkan kedalam element wrapper
    wrapper.appendChild(label);
    wrapper.appendChild(text);
    // gabungkan kedalam element col
    col.appendChild(frame);
    col.appendChild(wrapper);
    // kembalikan nilai berupa element yang sudah digabung
    return col;
  }
  
  function create(name, classname, value, show = false) {
    // buat element sesuai isi param name
    const element = document.createElement(name);
    // berikan class pada element yang dibuat
    element.className = !classname ? '' : classname;
    // dengan value atau teks
    if (show == true) {
      // berikan value atau teks
      element.textContent = value;
      return element;
    }
    // tanpa value atau teks
    return element;
  }
  
  function renderImage(image, file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      image.setAttribute('src', reader.result);
    }
  }
  
  function filter(param) {
    // jumlah limit atau batas panjang nama file
    const limit = 20;
    // pecah menjadi beberapa bagian
    const parts = param.split('.');
    // index ke 0 sudah pasti adalah nama file yang baru saja diupload
    const oldName = parts[0].trim();
    // batasi nama file sesuai isi variabel limit
    const name = parts[0].trim().substring(0, limit);
    // dan index paling akhir sudah pasti adalah sebuah ekstensi file yang diupload
    const extension = parts[parts.length - 1].trim().toLowerCase();
    /*
      jika panjang dari nama file melebihi batas atau limit
      maka batasi nama file tersebut menjadi nama yang pendek
    */
    return (oldName.length > limit) ? `${name}.${extension}` : param;
  }
  
}
const wrapper = document.querySelector('.wrapper');
const close = document.querySelector('.close');
const copy = document.querySelector('.copy');
const form = document.querySelector('form');
const input = form.querySelector('input');
const paragraph = form.querySelector('p');
function fetchRequest(file,formData){
     paragraph.innerText = 'Scanning QR Code.....';
     fetch('http://api.qrserver.com/v1/read-qr-code/',{
          method: 'POST',
          body: formData,
     }).then(res => res.json()).then(result => {
          result = result[0].symbol[0].data;
          paragraph.innerText = result ? 'Upload QR Code to Scan': 'could not Scan QR Code';
          if(!result) return;
          document.querySelector('textarea').innerText = result;
          form.querySelector('img').src = URL.createObjectURL(file);
          wrapper.classList.add('active');
     }).catch(() => {
          paragraph.innerText = 'Could not Scan QR Code';
     });
}
input.addEventListener('change',async event => {
     let file = event.target.files[0];
     if(!file) return;
     let formData = new FormData();
     formData.append('file',file);
     fetchRequest(file,formData);
});
copy.addEventListener('click',() => {
     let text = document.querySelector('textarea').textContent;
     navigator.clipboard.writeText(text);
});
form.addEventListener('click',() => input.click());
close.addEventListener('click',() => wrapper.classList.remove('active'));
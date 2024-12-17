export function decodeHtmlEntities(str) {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent || doc.body.textContent;
  }
  
  export function resizeAndCompressImage(file, maxWidth, maxHeight, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = function(e) {
        img.src = e.target.result;
      };
      
      reader.onerror = function(err) {
        reject("Error reading file");
      };
  
      reader.readAsDataURL(file);
  
      img.onload = function() {
        let width = img.width;
        let height = img.height;
  
        const aspectRatio = width / height;
  
        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }
  
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
  
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toDataURL('image/jpeg', quality, (dataUrl) => {
          resolve(dataUrl);
        });
      };
    });
  }
  
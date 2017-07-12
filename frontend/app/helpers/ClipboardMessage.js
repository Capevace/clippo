import toBuffer from 'typedarray-to-buffer';

class ClipboardMessage {
  constructor(type, value, id = null) {
    this.id = id || String(Math.floor(Math.random() * 99999));
    this.type = type;
    this.value = null;
    this.decodedValue = null;
    this.decoding = false;
    this.setValue(value);
  }

  setValue(value) {
    if (!value.length) return;
    // If we're getting a string, encode it to an ArrayBuffer
    if (typeof value === 'string') {
      const arr = new TextEncoder().encode(value);
      const buffer = new ArrayBuffer(arr.length);
      const view = new DataView(buffer);

      //first arguement -> offset, represent from which byte we want to write the value
      //second arguement -> value to be stored
      //third arguement -> boolean -> Endianness -> false represents big-endian
      //setInt32 represents write the value to 32bits. Value is signed integer.
      arr.map((val, i) => {
        view.setInt8(i, val, false);
      });

      this.value = buffer;
      debugger;
    } else if (value.constructor === ArrayBuffer) {
      this.value = value;
    } else {
      console.error('Value:', value);
      throw new Error(
        'The supplied value for the ClipboardMessage was neither a string nor an ArrayBuffer and is thus invalid.'
      );
    }
  }

  isImage() {
    return /image/.test(this.type);
  }

  toImageDataURL() {
    return 'data:' + this.type + ';base64,' + this.decodedValue;
  }

  getDecodedValue() {
    return new Promise(resolve => {
      if (this.decodedValue) {
        resolve(this.decodedValue);
        return;
      }
      this.decoding = true;

      if (this.isImage()) {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.addEventListener('message', event => {
            console.log('message', event.data);
            if (event.data.id === this.id) {
              this.decodedValue = event.data.base64;
              this.decoding = false;
              resolve(this.decodedValue);
            }
          });

          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'DECODE_ARRAYBUFFER',
              payload: {
                buffer: this.value,
                id: this.id
              }
            });
          }
        }
      } else {
        this.decodedValue = new TextDecoder().decode(this.value);
        this.decoding = false;
        resolve(this.decodedValue);
      }
    });
  }

  static serialize(message) {
    return {
      id: message.id,
      type: message.type,
      value: message.value
    };
  }

  static deserialize(data) {
    return new ClipboardMessage(data.type, data.value, data.id);
  }
}

export default ClipboardMessage;

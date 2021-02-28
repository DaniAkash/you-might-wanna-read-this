const emojiImages = [
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/274/astronaut_1f9d1-200d-1f680.png",
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/274/rocket_1f680.png",
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/274/newspaper_1f4f0.png",
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/274/ringed-planet_1fa90.png",
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/274/microscope_1f52c.png",
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/274/laptop_1f4bb.png",
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/274/joystick_1f579-fe0f.png",
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/274/mobile-phone_1f4f1.png",
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/274/dna_1f9ec.png",
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/274/yarn_1f9f6.png"
];

class EmojiBackground {
  emojiImages = emojiImages;
  emojiHeight = 30;
  emojiWidth = 30;
  emojis = [];
  maxEmojis = 30;
  minScale = 0.4;
  canvas;
  context;

  setCanvasSize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  draw = () => {
    this.setCanvasSize();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.emojis.length; i++) {
      const emoji = this.emojis[i];
      emoji.image = new Image();
      emoji.image.style.height = emoji.height;
      emoji.image.src = emoji.src;
      this.context.globalAlpha = emoji.opacity;
      this.context.drawImage(
        emoji.image,
        emoji.x,
        emoji.y,
        emoji.width,
        emoji.height
      );
    }
    this.move();
  };

  move = () => {
    for (var b = 0; b < this.emojis.length; b++) {
      var emoji = this.emojis[b];
      emoji.y += emoji.ys;
      if (emoji.y > this.canvas.height) {
        emoji.x = Math.random() * this.canvas.width;
        emoji.y = -0.2 * this.emojiHeight;
      }
    }
  };

  constructor() {
    this.canvas = document.querySelector("#playground");
    if (!this.canvas.getContext) return;
    this.setCanvasSize();
    this.context = this.canvas.getContext("2d");

    for (let i = 0; i < this.maxEmojis; i++) {
      const scale = Math.random() * (1 - this.minScale) + this.minScale;
      this.emojis.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        ys: Math.random() + 1,
        height: scale * this.emojiHeight,
        width: scale * this.emojiWidth,
        opacity: scale * 0.5,
        src: emojiImages[Math.floor(Math.random() * emojiImages.length)]
      });
    }
    setInterval(this.draw, 11);
  }
}

new EmojiBackground();

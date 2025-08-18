import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';

(async () => {
  await imagemin(['src/assets/img-copy/*.{jpg,png}'], {
    destination: 'src/assets/webp',
    plugins: [
      imageminPngquant(),
      imageminMozjpeg(),
      imageminSvgo({
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      }),
      imageminWebp({ quality: 75 }),
    ],
  });
  console.log('Images optimized');
})();

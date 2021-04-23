import React, { useRef, useState } from 'react';
import request from 'umi-request';
import { useAsync } from 'react-use';
import { Layer, Rect, Stage, Image } from 'react-konva';
import useImage from 'use-image';

let TypeMap = new Map([
  [0, 'black'],
  [1, 'white'],
  [2, 'green'],
  [3, 'blue'],
  [4, 'red'],
]);

export default function IndexPage() {
  let [pixels, setPixels] = useState({
    Pixels: [[{ X: 0, Y: 0, R: 0, G: 0, B: 0, A: 0 }]],
    XMax: 0,
    YMax: 0,
  });

  const [rects, setRects] = useState([
    {
      X: 0,
      Y: 0,
      Width: 10000,
      Color: 'white',
    },
  ]);

  const url = 'https://maogai.obs.cn-north-4.myhuaweicloud.com/map.png';
  const [image, status] = useImage(url);

  const Lay = useRef(null);
  const Rec = useRef(null);

  function changeColor(aa: { x: number; y: number }[]) {
    for (let i = 0; i < aa.length; i++) {
      // @ts-ignore
      Lay.current.children[aa[i].x * pixels.YMax + aa[i].y].fill('red');
    }
    // @ts-ignore
    Lay.current.draw();
  }

  function createRect(x: number, y: number, width: number, color: string) {
    setRects([
      ...rects,
      {
        X: x,
        Y: y,
        Width: width,
        Color: color,
      },
    ]);
  }

  // 更改颜色函数调用举例
  // changeColor([
  //   { x: 1, y: 2 },
  //   { x: 1, y: 3 },
  //   { x: 1, y: 4 },
  //   { x: 1, y: 5 },
  //   { x: 1, y: 6 },
  //   { x: 2, y: 6 },
  //   { x: 4, y: 6 },
  //   { x: 5, y: 7 },
  //   { x: 1, y: 8 },
  // ]);

  return (
    <div>
      <div
        style={{
          margin: 'auto',
          fontSize: '48px',
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        校园导览系统预览
      </div>
      <div
        style={{
          width: '80%',
          margin: 'auto',
          maxHeight: '1000px',
          overflowX: 'scroll',
          overflowY: 'scroll',
          border: '7px solid rgb(61,166,250)',
        }}
        onClick={(event) => {
          console.log(Math.floor(event.nativeEvent.offsetX / 10));
          console.log(Math.floor(event.nativeEvent.offsetY / 10));
          createRect(
            Math.floor(event.nativeEvent.offsetX / 10),
            Math.floor(event.nativeEvent.offsetY / 10),
            10,
            'blue',
          );
        }}
      >
        <Stage
          style={{ border: '2px', borderColor: 'blue' }}
          width={8499}
          height={6024}
        >
          <Layer ref={Lay}>
            {rects.map((value, index) => {
              if (index == 0) {
                return <Image key={index} image={image} />;
              } else {
                return (
                  <Rect
                    key={index}
                    x={value.X * value.Width}
                    y={value.Y * value.Width}
                    width={value.Width}
                    height={value.Width}
                    fill={value.Color}
                  />
                );
              }
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

// useAsync(async () => {
//   request
//     .post('/api', {
//       data: {
//         jsonrpc: '2.0',
//         method: 'NodeService.GetPixels',
//         params: {},
//         id: 1,
//       },
//     })
//     .then(r => {
//       setPixels(r.result);
//     })
//
// }, []);

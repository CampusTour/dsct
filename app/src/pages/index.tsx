import React, {useRef, useState} from 'react';
import request from 'umi-request';
import {useAsync} from 'react-use';
import {Layer, Rect, Stage} from 'react-konva';

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

  useAsync(async () => {
    request
      .post('/api', {
        data: {
          jsonrpc: '2.0',
          method: 'NodeService.GetPixels',
          params: {},
          id: 1,
        },
      })
      .then(r => {
        setPixels(r.result);
      })

  }, []);

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

  console.log(pixels);

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
        校园导览系统模块化预览
      </div>
      <div
        style={{
          margin: 'auto',
          fontSize: '36px',
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        ①地图像素栅格化
      </div>
      <br />
      <div
        style={{
          width: '80%',
          margin: 'auto',
          maxHeight: '1000px',
          overflowX: 'scroll',
          overflowY: 'scroll',
          border: '7px solid rgb(61,166,250)',
        }}
      >
        <Stage
          style={{ border: '2px', borderColor: 'blue' }}
          width={pixels.XMax * 10}
          height={pixels.YMax * 10}
        >
          <Layer ref={Lay}>
            {pixels.Pixels.map((value, index) => {
              return value.map((value1, index1) => {
                if (value1.R == 0) {
                  return (
                    <Rect
                      onClick={(evt) => {
                        // @ts-ignore
                        evt.currentTarget.fill('red');
                        // @ts-ignore
                        Lay.current.draw();
                      }}
                      ref={Rec}
                      id={'rect' + value1.X.toString() + value1.Y.toString()}
                      key={index1}
                      x={value1.X * 10}
                      y={value1.Y * 10}
                      width={10}
                      height={10}
                      fill="white"
                    />
                  );
                } else {
                  return (
                    <Rect
                      onClick={(evt) => {
                        // @ts-ignore
                        evt.currentTarget.fill('red');
                        // @ts-ignore
                        Lay.current.draw();
                      }}
                      id={'rect' + value1.X.toString() + value1.Y.toString()}
                      key={index1}
                      x={value1.X * 10}
                      y={value1.Y * 10}
                      width={10}
                      height={10}
                      fill="black"
                    />
                  );
                }
              });
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

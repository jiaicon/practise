import React from 'react';
import yayJpg from '@assets/yay.jpg';
import { useClientLoaderData } from 'umi';

export default function HomePage() {
  const data = useClientLoaderData();
  console.log(data);
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>

    </div>
  );
}

function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        timestamp: new Date().getTime(),
      })
    }, 1000)
  })
}

// export async function clientLoader() {
//   const data1 = await getData();
//   const data2 = await getData();
//   const data3 = await getData();
//   return data1;
// }

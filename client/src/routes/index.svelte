<script>
  let balance = 0;

  const adding = () => {
    const add = window.prompt("How much USD: ");
    if (add > 0) {
      balance += Number(add);
    }
  };
  const subtracting = () => {
    const subtract = window.prompt("How much USD: ");
    if (balance > subtract && subtract > 0) {
      balance -= Number(subtract);
    }
  };
  const zeroing = () => {
    balance = 0;
  };

  let coinfrom = '';
  let cointo = '';
  let moneyto = '';

  const coinToCoin = () => {
    if (coinfrom && cointo) {
      const url = `api/coinex/${coinfrom}/${cointo}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          if (!data.message) {
            alert(`Exchange rate for 1 ${data.from} is ${data.price} ${data.to}`);
          } else {
            alert(data.message);
          }
      });
    } else {
      alert("Formu doldurmayı unuttun amk.");
    }
  };

  const coinToMoney = () => {
    if (coinfrom && moneyto) {
      const url = `api/coin/${coinfrom}/${moneyto}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          if (!data.message) {
            alert(`Exchange rate for 1 ${data.name} is ${data.price} ${moneyto.toUpperCase()}`);
          } else {
            alert(data.message);
          }
      });
    } else {
      alert("Formu doldurmayı unuttun amk.");
    }
  };
</script>

<svelte:head>
  <title>YOARRAK Coin!</title>
</svelte:head>

<div class="bg-gradient-to-r from-green-400 to-blue-500 text-white p-10">
  <h1 class="text-2xl text-center font-semibold">
    YARRAK COIN
  </h1>
  <p class="text-center">Sürekli yükselen tek coin!</p>
</div>
<div class="flex flex-col items-center gap-5 pt-3">
  <h2>Your balance: <span class="font-bold">{balance} USD</span></h2>
  <div class="inline-flex">
    <button on:click={adding} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
      Ekle
    </button>
    <button on:click={subtracting} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
      Para çek
    </button>
    <button on:click={zeroing} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
      Sıfırla
    </button>
  </div>
  <div class="flex md:flex-row flex-col gap-4">
    <form class="h-64 w-64 p-4 box-border border-t-2">
      <h2 class="text-lg text-center pb-2">Coin'den Coin'e</h2>
      <div class="p-2">
        <p class="text-sm text-gray-500">Bu coinden:</p>
        <input bind:value={coinfrom} type="text" name="price" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="eth">
      </div>
      <div class="p-2">
        <p class="text-sm text-gray-500">Bu coine:</p>
        <input bind:value={cointo} type="text" name="price" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="sol">
      </div>
      <div class="p-2 flex flex-col items-center">
        <button on:click|preventDefault={coinToCoin} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          Çevir
        </button>
      </div>
    </form>
    <form class="h-64 w-64 p-4 box-border border-t-2">
      <h2 class="text-lg text-center pb-2">Coin'den paraya</h2>
      <div class="p-2">
        <p class="text-sm text-gray-500">Bu coinden:</p>
        <input bind:value={coinfrom} type="text" name="price" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="eth">
      </div>
      <div class="p-2">
        <p class="text-sm text-gray-500">Bu paraya:</p>
        <input bind:value={moneyto} type="text" name="price" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="try">
      </div>
      <div class="p-2 flex flex-col items-center">
        <button on:click|preventDefault={coinToMoney} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          Çevir
        </button>
      </div>
    </form>
  </div>
</div>


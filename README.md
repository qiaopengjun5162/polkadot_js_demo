# Substrate入门之polkadot js 的使用

## 实操

```sh
./target/release/node-template --dev --tmp
mcd polkadot_js_demo # mkdir polkadot_js_demo & cd polkadot_js_demo
pnpm init 
pnpm add @polkadot/api
pnpm add @polkadot/types     
pnpm add web3     

pnpm install --save-dev nodemon   
pnpm start     
touch README.md
touch .gitignore  
pnpm i --save-dev @types/node
pnpm add @polkadot/api-augment
pnpm add @polkadot/keyring
touch meta.json   
```

### 订阅事件 `subscribeEvent` 的输出

```sh
Code/substrate-code/polkadot_js_demo is 📦 1.0.0 via ⬢ v21.7.1 via 🦕 v1.35.1 via 🐪 v5.34.1 via 🅒 base took 51.7s 
➜ pnpm start

> polkadot_js_demo@1.0.0 start /Users/qiaopengjun/Code/substrate-code/polkadot_js_demo
> ts-node main.ts

index  0x0000
event index:  0x0000
event data:  {
  dispatchInfo: {
    weight: { refTime: '284,906,000', proofSize: '1,493' },
    class: 'Mandatory',
    paysFee: 'Yes'
  }
}
data  {
  dispatchInfo: {
    weight: { refTime: '284,906,000', proofSize: '1,493' },
    class: 'Mandatory',
    paysFee: 'Yes'
  }
}
index  0x0000
event index:  0x0000
event data:  {
  dispatchInfo: {
    weight: { refTime: '284,906,000', proofSize: '1,493' },
    class: 'Mandatory',
    paysFee: 'Yes'
  }
}
data  {
  dispatchInfo: {
    weight: { refTime: '284,906,000', proofSize: '1,493' },
    class: 'Mandatory',
    paysFee: 'Yes'
  }
}
index  0x0408
event index:  0x0408
event data:  {
  who: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  amount: '295,649,147'
}
data  {
  who: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  amount: '295,649,147'
}
index  0x0402
event index:  0x0402
event data:  {
  from: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  to: '5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL',
  amount: '10,000,000,000,000'
}
data  {
  from: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  to: '5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL',
  amount: '10,000,000,000,000'
}
index  0x0500
event index:  0x0500
event data:  {
  who: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  actualFee: '295,649,147',
  tip: '0'
}
data  {
  who: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  actualFee: '295,649,147',
  tip: '0'
}
index  0x0000
event index:  0x0000
event data:  {
  dispatchInfo: {
    weight: { refTime: '295,649,000', proofSize: '3,593' },
    class: 'Normal',
    paysFee: 'Yes'
  }
}
data  {
  dispatchInfo: {
    weight: { refTime: '295,649,000', proofSize: '3,593' },
    class: 'Normal',
    paysFee: 'Yes'
  }
}
index  0x0000
event index:  0x0000
event data:  {
  dispatchInfo: {
    weight: { refTime: '284,906,000', proofSize: '1,493' },
    class: 'Mandatory',
    paysFee: 'Yes'
  }
}
data  {
  dispatchInfo: {
    weight: { refTime: '284,906,000', proofSize: '1,493' },
    class: 'Mandatory',
    paysFee: 'Yes'
  }
}
main function
main function done

```

### 编写一个类型脚本程序来订阅template pallet中的值的更新（something）和event

```sh
Code/substrate-code/polkadot_js_demo is 📦 1.0.0 via ⬢ v21.7.1 via 🦕 v1.35.1 via 🐪 v5.34.1 via 🅒 base took 52.0s 
➜ pnpm start

> polkadot_js_demo@1.0.0 start /Users/qiaopengjun/Code/substrate-code/polkadot_js_demo
> ts-node main.ts

something event 0x0700
something value:  49
main function
main function done

```

## 问题

### 1.  报错 `Cannot find name 'process'. Do you need ...`

解决：安装`@types/node`

```sh
pnpm i --save-dev @types/node    
```

参考：<https://www.cnblogs.com/zsg88/p/15700520.html>

## 参考

- <https://polkadot.js.org/docs/api/start/install>
- <https://github.com/polkadot-js/apps>

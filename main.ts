import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import '@polkadot/api-augment';
import type { KeyringPair } from "@polkadot/keyring/types";
import type { FrameSystemAccountInfo } from "@polkadot/types/lookup";

// WebSocket地址，用于连接到Polkadot区块链网络
const WEB_SOCKET = "ws://127.0.0.1:9944";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 定义connect函数，用于连接到Polkadot区块链网络
const connect = async () => {
    // wsProvider：创建一个WsProvider实例，用于连接到WebSocket地址。
    const wsProvider = new WsProvider(WEB_SOCKET);
    // api：使用ApiPromise.create方法创建一个ApiPromise实例，该实例包含与Polkadot区块链交互所需的所有方法。
    const api = await ApiPromise.create({ provider: wsProvider, types: {} });
    // await api.isReady：等待API实例准备就绪。
    await api.isReady;
    // 返回api：返回创建的ApiPromise实例。
    return api;
}

const getConst = async (api: ApiPromise) => {
    const existentialDeposit = await api.consts.balances.existentialDeposit.toHuman();
    return existentialDeposit;
}

const getFreeBalance = async (api: ApiPromise, address: string) => {
    // https://techblg.app/articles/how-to-solve-property-data-does-not-exist-on-type-codec/
    // const { data: balance } = await api.query.system.account(address);
    // const free = balance?.free;

    // 获取指定地址的账户信息
    // const { data: { free, }} = await api.query.system.account<FrameSystemAccountInfo>(address);
    const { data: { free, } }: FrameSystemAccountInfo = await api.query.system.account(address);
    // 返回freeBalance：返回指定地址的账户余额。
    return free;
}

const transfer = async (api: ApiPromise, from: KeyringPair, to: string, amount: number) => {
    await api.tx.balances.transfer(to, amount).signAndSend(from, res => {
        console.log(`Current tx status is ${res.status}`);

        // 如果交易被确认，则打印确认信息。
        if (res.status.isInBlock) {
            console.log(`Completed at block hash #${res.status.asInBlock.toString()}`);
        }
    });
    console.log('transfer done');

}

const getMetadata = async (api: ApiPromise) => {
    const metadata = await api.rpc.state.getMetadata();
    // return metadata.toHuman();
    return metadata.toString();
}

const subscribe = async (api: ApiPromise, address: string) => {
    await api.query.system.account(address, accountInfo => {
        console.log(`freeBalance: ${accountInfo.data.free.toHuman()}`);
    })
}

const subscribeEvent = async (api: ApiPromise) => {
    // 订阅指定事件
    await api.query.system.events(events => {
        // 遍历事件
        events.forEach(function (event) {
            console.log("index ", event.event.index.toHuman());
            // console.log("event index: ", event['event']['index'].toHuman());
            // console.log("event data: ", event['event']['data'].toHuman());
            console.log("data ", event.event.data.toHuman());
        });
    })
}

// 编写一个类型脚本程序来订阅template pallet中的值的更新（something）和event。
const subscribeTemplatePallet = async (api: ApiPromise) => {
    // 订阅template pallet中的event
    await api.query.system.events(events => {
        // 遍历事件
        events.forEach(function (event) {
            const event_index = event.event.index.toString();
            const event_data = event.event.data;
            // console.log("event index: ", event_index);
            // console.log("event data: ", event_data.toHuman());

            if (event_index == '0x0700' && event_data) {
                console.log("something event", event_index);
                // 订阅template pallet中的值的更新（something）
                // const something_value = event_data.toHuman();
                const something_value = (event_data as Record<string, any>)['something'].toString();
                console.log("something value: ", something_value);
            }
        });

    })
}

// 定义main函数，用于执行与Polkadot区块链交互的操作
const main = async () => {
    // 调用connect函数，连接到Polkadot区块链网络并获取API实例。
    const api = await connect();

    // 调用getConst函数，获取常量existentialDeposit的值。
    // const deposit = await getConst(api);
    // console.log("deposit:", deposit);

    // 调用getFreeBalance函数，获取指定地址的账户余额。
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');
    const bob = keyring.addFromUri('//Bob');

    // const freeBalance = await getFreeBalance(api, alice.address);
    // // 打印freeBalance：将账户余额打印到控制台。
    // console.log("freeBalance:", freeBalance.toHuman());

    // const bob_balance = await getFreeBalance(api, bob.address);
    // console.log("bob_balance:", bob_balance.toHuman());

    // // 调用transfer函数，将指定数量的代币从Alice账户转移到Bob账户。
    // const amount = 10 ** 10 + 1;
    // await transfer(api, alice, bob.address, amount);

    // // 等待一段时间，以确保交易被确认。
    // await sleep(5000);

    // // 再次调用getFreeBalance函数，获取Bob账户的余额。
    // const new_bob_balance = await getFreeBalance(api, bob.address);
    // console.log("new_bob_balance:", new_bob_balance.toHuman());

    // 调用getMetadata函数，获取metadata的值。
    // const metadata = await getMetadata(api);
    // console.log("metadata:", metadata);

    // 调用subscribe函数，订阅指定地址的账户余额变化。
    // await subscribe(api, alice.address);

    // 调用subscribeEvent函数，订阅指定事件。
    // await subscribeEvent(api);

    // 调用subscribeTemplatePallet函数，订阅template pallet中的值的更新（something）和event。
    await subscribeTemplatePallet(api);
    await sleep(50000);

    console.log('main function');

}

// 调用main函数
main()
    // 如果main函数执行成功，则执行以下操作：
    .then(() => {
        console.log('main function done');
        process.exit(0);
    })
    // 如果main函数执行失败，则执行以下操作：
    .catch((err) => {
        console.log("err in main function", err);
        process.exit(1); // 退出程序，返回1
    })

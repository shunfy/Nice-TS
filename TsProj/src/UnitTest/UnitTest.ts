import {TimeUtil} from '../Framework/Util/TimeUtil';
import {SingletonTest} from './SingletonTest';
import {Logger} from '../Framework/Logger/Logger';
import {Messenger} from '../Framework/Common/Messenger';
import { TimeManager } from '../Framework/Manager/TimeManager';
import { Timer } from '../Framework/Timer/Timer';
import { ResManager } from '../Framework/Manager/ResManager';

const CS = require('csharp');


export class UnitTest{
    public static testVar:number = 10000;


    public static async doTest(){

        Logger.log("TimeUtil =============================");
        TimeUtil.test();

        Logger.log("Singleton =============================");
        SingletonTest.Instance(SingletonTest);
        Logger.log("===");
        let t1: SingletonTest = SingletonTest.Instance(SingletonTest);
        let t2: SingletonTest = SingletonTest.Instance(SingletonTest);

        Logger.log(t1.test() + " : " + t2.test());
        t1.add();
        Logger.log(t1.test() + " : " + t2.test());
        t2.add();
        Logger.log(t1.test() + " : " + t2.test());


        Logger.log("Messager =============================");

        let messenger:Messenger = new Messenger();
        let listen:Function = function(a:number, b:string){
            Logger.log(`listen call: ${a} , ${b}`)
        }
        let listen2:Function = function(a:number, b:string){
            Logger.log(`listen call2: ${a} , ${b}`)
        }

        let  EVENT_CODE:number = 100;
        messenger.addListener(EVENT_CODE, listen);
        messenger.addListener(EVENT_CODE,listen2);
        messenger.broadcast(EVENT_CODE, 999," Hello");

        messenger.removeListener(EVENT_CODE,listen);
        messenger.broadcast(EVENT_CODE, 999," Hello");

        messenger.clearup();
        messenger.broadcast(EVENT_CODE, 999," Hello");


        Logger.log("Timer =============================");
        let timeFun = function(){
            Logger.log(this.testVar);
            Logger.log("timer tick..");
        };
        let timer:Timer = TimeManager.Instance(TimeManager).getTImer(5,timeFun,this);
        //timer.start();

        Logger.log("ResourceManager =============================");

        let prefab = await ResManager.Instance(ResManager).loadPrefab("Models/1001/Character.prefab") ;
        
        Logger.log(prefab);

        //let inst = CS.UnityEngine.GameObject.Instantiate(prefab);
        //inst.name = "Test Ch";


        Logger.log("引用类型 =============================");
        let testMap:Map<string,Array<number>> = new Map();
        testMap.set("key1" ,new Array());

        let arr1:Array<number> = testMap.get("key1");
        arr1.push(12);
        arr1.push(333);

        let arr2:Array<number> = testMap.get("key1");
        Logger.log(arr2);
        
    }

    

}
# cocos2dJsProject
   一个简单的jumpChess游戏。
	
   一开始写象棋卡住了就先写西洋跳棋，感觉跳棋会简单点，结果发现跳棋更难2333~ 象棋没有这么复杂的强制吃棋规则，也没有连跳（只要下一步能吃棋就必须一直吃下去），也不会出现无棋可走的情况。
	
   还有一些规则没有实现（比如跳棋规则中如果能吃棋是必须强制吃棋的，但是这里一次默认是一次走一步而且没有强制去吃棋的规则，而西洋跳棋是可以连跳的。
	
   悔棋没有做，不过保存了onTouchBegan时的坐标退回上一步应该不难，但是如果要一直往后的话怎么写还没向想过。
	
   连跳啊强制吃棋啊什么的写规则的时候写的就头很大，自己写的循环都不愿意再去看了，如果要实现这些规则的话估计检测的语句又会很庞大，而且会有很多重复代码，如果过想实现的话就必须考虑把一些检测抽象起来了。
	
   以后看心情完善这个游戏吧。
   
   放一些截图
   
   游戏开始界面向上滑动进入游戏场景
	
 ![image](https://github.com/chat1llon/cocos2dJsProject/blob/master/screenshoot/pic1.jpg)
 
 ![image](https://github.com/chat1llon/cocos2dJsProject/blob/master/screenshoot/pic2.jpg)
 
 ![image](https://github.com/chat1llon/cocos2dJsProject/blob/master/screenshoot/pic3.jpg)

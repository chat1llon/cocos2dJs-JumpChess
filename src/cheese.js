/**
 * Created by aoyue on 17/7/21.
 */
var cheese=cc.Sprite.extend({
    evolution:null,
    type:null,
   ctor:function (type) {
       this._super();
       this.type=type;
       var draw=new cc.DrawNode();
       switch (type){
           case 1:
               draw.drawCircle(cc.p(0, 0), 54,0,999,false,5,cc.color(0,0,0,255));
               draw.drawDot(cc.p(0,0),52,cc.color(245,245,245,255));
               break;
           case 0:
               draw.drawCircle(cc.p(0, 0), 54,0,999,false,5,cc.color(255,255,255,255));
               draw.drawDot(cc.p(0,0),52,cc.color(10,10,10,255));
       }
       draw.setContentSize(54,54);
       draw.setAnchorPoint(0,0);
       draw.setTag(1);
       draw.setPosition(draw.width/2,draw.height/2);

       var logo=new cc.Sprite(res.fish);
       logo.setScale(1.2);
       logo.setTag(2);
       draw.addChild(logo);

       this.addChild(draw);
       this.setAnchorPoint(0,0);
       this.setContentSize(54,54);
       this.evolution=false;
   },
    evolutionChess:function () {
       if(this.evolution==false){
        this.evolution=true;
        this.getChildByTag(1).removeChildByTag(2);
        var logo=new cc.Sprite(res.crown);
        this.getChildByTag(1).addChild(logo);
       }
    },
    transToPos:function (x,y) {
       var px=0;
        var py=0;
        while (x > 20) {
            px++;
            x -= 119.5;
        }
        while (y > 20) {
            py++;
            y -= 119.5;
        }
        this.setPos(px,py);
    },
    setPos:function (x,y) {
       this.setPosition(80+119.5*(x-1),80+(y-1)*119.5);
    }
});
/* Nico222 Phone - SillyTavern Extension v2.0 */
(function(){
'use strict';

var FLOAT_ID='nicole-float', CSS_ID='nicole-phone-styles', PANEL_ID='nicole-phone-panel', TOGGLE_ID='nicole-toggle-btn';

/* ============ CSS (scoped, no global pollution) ============ */
var CSS = `/* ===== 酒馆下拉键修复：强制居中且可点击 ===== */
.welcomeRecent{text-align:center!important;}
.welcomePanel{justify-content:center!important;}
button.menu_button_icon.showMoreChats{pointer-events:auto!important;z-index:999999!important;position:relative!important;display:inline-flex!important;}
button.menu_button_icon.showMoreChats .fa{pointer-events:none!important;}
/* 强制弹幕容器不拦截点击；歌词模块可拖动但子元素穿透，展开面板时恢复交互 */
.Nicole-danmu-container, .Nicole-danmu-container *{pointer-events:none!important;}
.Nicole-lyric-module{pointer-events:auto!important;max-height:60vh!important;overflow:hidden!important;}
.Nicole-lyric-module .lyric-mini, .Nicole-lyric-module .lyric-mini *{pointer-events:none!important;}
.Nicole-lyric-module.expanded{max-height:none!important;overflow:visible!important;}
.Nicole-lyric-module.expanded .lyric-panel, .Nicole-lyric-module.expanded .lyric-panel *{pointer-events:auto!important;}
.Nicole-lyric-setting-panel, .Nicole-lyric-setting-panel *{pointer-events:auto!important;}

.Nicole-mu-inp-wrap,.Nicole-mu-ctrl,.Nicole-mu-time-disp,.Nicole-mu-now,.Nicole-mu-stage,.Nicole-mu-invbtn{flex-shrink:0!important;}

.Nicole-mu-list{display:flex;flex-direction:column;gap:6px;flex:1 1 auto;min-height:120px;max-height:240px!important;overflow-y:auto!important;padding-bottom:10px;scrollbar-width:none;-webkit-overflow-scrolling:touch;}

.Nicole-mu-list::-webkit-scrollbar{display:none;}

.Nicole-mu-item{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:rgba(250,250,250,.85);border-radius:12px;font-size:12px;color:#444;cursor:pointer;transition:background .2s,transform .1s;border:1px solid rgba(0,0,0,.02);flex-shrink:0;}

.Nicole-mu-item:active{transform:scale(.98);background:rgba(240,240,240,.9);}

.Nicole-mu-item.active{background:#333!important;color:#fff!important;font-weight:600;}

.Nicole-mu-item.active .jmudel{color:rgba(255,255,255,.6)!important;}

.Nicole-home-screen{position:absolute;inset:0;background-color:#f2f2f7;background-image:url('https://tuchuang.org.cn/imgs/2026/07/10/cdf179abe6c5f102.png');background-size:cover;background-position:center;background-repeat:no-repeat;z-index:200;display:flex;flex-direction:column;transition:transform .35s cubic-bezier(.2,.8,.2,1);transform:translateX(-100%);border-radius:inherit;overflow:hidden;}

.Nicole-home-screen.active{transform:translateX(0);}

.Nicole-ios-statusbar{position:absolute;top:0;left:0;right:0;height:44px;display:flex;justify-content:space-between;align-items:center;padding:0 24px;font-size:14px;font-weight:600;color:var(--hdr-txt,#222);z-index:210;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif;letter-spacing:.5px;text-shadow:0 1px 4px rgba(255,255,255,.6);}

.Nicole-ios-statusbar-right{display:flex;align-items:center;gap:6px;}

.Nicole-ios-statusbar-right svg{height:12px;fill:var(--hdr-txt,#222);filter:drop-shadow(0 1px 2px rgba(255,255,255,.5));}

.Nicole-ios-battery{width:22px;height:11px;border:1px solid var(--hdr-txt,rgba(0,0,0,.6));border-radius:4px;position:relative;padding:1px;display:flex;box-shadow:0 1px 2px rgba(255,255,255,.5);}

.Nicole-ios-battery::after{content:'';position:absolute;right:-4px;top:3px;width:2px;height:3px;background:var(--hdr-txt,rgba(0,0,0,.6));border-radius:0 2px 2px 0;}

.Nicole-ios-battery-level{background:var(--hdr-txt,#222);height:100%;width:85%;border-radius:1px;}

.Nicole-sticky-note{position:absolute;top:54px;left:8px;right:auto;transform:none;width:48%;max-width:172px;min-width:140px;background:rgba(255,255,255,.96);border-radius:4px;box-shadow:0 2px 10px rgba(0,0,0,.1);padding:12px 10px 10px;display:flex;flex-direction:column;z-index:50;}

.Nicole-sticky-tape{position:absolute;top:-10px;left:50%;transform:translateX(-50%) rotate(-3deg);width:64px;height:20px;background:rgba(255,255,255,.4);box-shadow:0 1px 2px rgba(0,0,0,.05);border:1px solid rgba(255,255,255,.4);border-radius:2px;pointer-events:none;z-index:51;}

.Nicole-sticky-textarea{width:100%;min-height:72px;border:none;background:transparent;resize:none;outline:none;font-size:12px;color:#333;line-height:1.5;font-family:'Kaiti','Comic Sans MS',-apple-system,sans-serif;overflow-y:auto;scrollbar-width:none;font-weight:500;}

.Nicole-sticky-textarea::-webkit-scrollbar{display:none;}

.Nicole-sticky-btn{align-self:flex-end;margin-top:6px;background:#222;color:#fff;border:none;border-radius:12px;padding:4px 12px;font-size:11px;cursor:pointer;opacity:0;transition:opacity .3s,transform .1s;font-weight:500;}

.Nicole-calendar{position:absolute;bottom:104px;right:14px;width:56%;max-width:200px;min-width:160px;height:168px;background:rgba(255,255,255,.96);border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.1);padding:10px 8px 8px;display:flex;flex-direction:column;z-index:50;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif;overflow:hidden;}
.Nicole-cal-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;padding:0 2px;}
.Nicole-cal-title{font-size:11px;font-weight:600;color:#222;letter-spacing:.3px;cursor:pointer;flex:1;text-align:center;transition:opacity .2s;}
.Nicole-cal-title:active{opacity:.5;}
.Nicole-cal-dateinput{width:100%;border:1px solid #ddd;border-radius:4px;padding:2px 4px;font-size:10px;color:#333;text-align:center;outline:none;background:#fafafa;font-family:inherit;}
.Nicole-cal-nav{display:flex;gap:2px;}
.Nicole-cal-navbtn{width:16px;height:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#999;font-size:13px;border-radius:3px;transition:background .2s;line-height:1;}
.Nicole-cal-navbtn:active{background:#eee;color:#222;}
.Nicole-cal-weekdays{display:grid;grid-template-columns:repeat(7,1fr);gap:1px;margin-bottom:3px;}
.Nicole-cal-wd{text-align:center;font-size:9px;color:#bbb;font-weight:500;padding:1px 0;}
.Nicole-cal-days{display:grid;grid-template-columns:repeat(7,1fr);gap:1px;}
.Nicole-cal-day{text-align:center;font-size:10px;color:#444;padding:3px 0;cursor:pointer;border-radius:3px;transition:background .15s;font-weight:400;}
.Nicole-cal-day.empty{cursor:default;}
.Nicole-cal-day.today{background:#222;color:#fff;font-weight:600;}
.Nicole-cal-day.selected{background:#e8e8e8;color:#222;font-weight:600;}
.Nicole-cal-day:active:not(.empty){background:#f0f0f0;}
.Nicole-cal-day.today:active{background:#333;}
.Nicole-cal-foot{margin-top:6px;padding-top:5px;border-top:.5px solid #eee;font-size:9px;color:#999;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px;}

.Nicole-home-apps{position:absolute;left:8px;bottom:96px;width:36%;max-width:130px;min-width:110px;height:190px;display:grid;grid-template-columns:1fr 1fr;gap:10px;justify-items:center;align-content:center;z-index:50;}
.Nicole-home-app{width:42px;height:42px;border-radius:11px;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.08);transition:transform .1s,opacity .15s;}
.Nicole-home-app:active{transform:scale(.9);opacity:.75;}
.Nicole-home-app svg{width:22px;height:22px;stroke:#333;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;}

.Nicole-sticky-note:focus-within .Nicole-sticky-btn{opacity:1;}

.Nicole-sticky-btn:active{transform:scale(.95);}

/* ===== MP3播放器 (iOS通知栏毛玻璃风格) ===== */
.Nicole-mp3-player{position:absolute;top:48px;left:50%;transform:translateX(-50%);width:82%;max-width:300px;min-width:220px;background:rgba(28,28,30,0.6);backdrop-filter:blur(28px) saturate(180%)!important;-webkit-backdrop-filter:blur(28px) saturate(180%)!important;border-radius:20px;padding:14px 16px 12px;display:flex;flex-direction:column;z-index:50;box-shadow:0 8px 32px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,0.1);}
.Nicole-mp3-cover{position:relative;width:58px;height:58px;border-radius:14px;overflow:hidden;flex-shrink:0;background:#333;box-shadow:0 4px 12px rgba(0,0,0,.3);}
.Nicole-mp3-cover-img{width:100%;height:100%;background-size:cover;background-position:center;background:linear-gradient(135deg,#3a3a3c,#1c1c1e);display:flex;align-items:center;justify-content:center;}
.Nicole-mp3-cover-img::after{content:'♪';font-size:26px;color:rgba(255,255,255,.2);font-weight:300;}
.Nicole-mp3-vinyl{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:20px;height:20px;border-radius:50%;background:#0a0a0a;border:2px solid #2a2a2a;opacity:0;transition:opacity .3s;pointer-events:none;}
.Nicole-mp3-player.playing .Nicole-mp3-vinyl{opacity:1;animation:mp3-spin 3s linear infinite;}
@keyframes mp3-spin{from{transform:translate(-50%,-50%) rotate(0);}to{transform:translate(-50%,-50%) rotate(360deg);}}
.Nicole-mp3-main{width:100%;display:flex;flex-direction:column;gap:8px;}
.Nicole-mp3-info{text-align:center;margin-bottom:2px;}
.Nicole-mp3-title{font-size:15px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.3px;line-height:1.3;}
.Nicole-mp3-artist{font-size:12px;color:rgba(255,255,255,.55);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;font-weight:400;line-height:1.3;}
.Nicole-mp3-progress{position:relative;height:4px;background:rgba(255,255,255,.18);border-radius:2px;cursor:pointer;margin-bottom:6px;overflow:visible;}
.Nicole-mp3-bar{height:100%;width:0%;background:rgba(255,255,255,.85);border-radius:2px;transition:width .15s linear;}
.Nicole-mp3-dot{position:absolute;top:50%;left:0%;transform:translate(-50%,-50%);width:10px;height:10px;border-radius:50%;background:#fff;opacity:0;transition:opacity .2s;box-shadow:0 1px 4px rgba(0,0,0,.4);}
.Nicole-mp3-progress:hover .Nicole-mp3-dot{opacity:1;}
.Nicole-mp3-time{display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,.4);font-weight:500;letter-spacing:.3px;}
.Nicole-mp3-ctrl{display:flex;align-items:center;justify-content:center;gap:14px;flex-shrink:0;margin-top:2px;}
.Nicole-mp3-btn{width:32px;height:32px;border-radius:50%;background:transparent;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,.75);transition:color .15s,transform .1s;padding:0;}
.Nicole-mp3-btn:active{transform:scale(.88);color:#fff;}
.Nicole-mp3-btn svg{width:18px;height:18px;fill:currentColor;stroke:none;}
.Nicole-mp3-btn.play{width:42px;height:42px;background:rgba(255,255,255,.92);color:#1c1c1e;box-shadow:0 2px 12px rgba(0,0,0,.3);}
.Nicole-mp3-btn.play svg{width:20px;height:20px;}
.Nicole-mp3-btn.play:active{background:#fff;}
.Nicole-mp3-danmu svg{fill:none!important;stroke:currentColor!important;stroke-width:1.5!important;}

.Nicole-dock{position:absolute;bottom:24px;left:20px;right:20px;height:68px;background:rgba(255,255,255,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;display:flex;justify-content:space-evenly;align-items:center;padding:0 10px;box-shadow:0 4px 20px rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.02);}

.Nicole-dock-icon{width:48px;height:48px;border-radius:14px;background:transparent;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .2s,background .2s;}

.Nicole-dock-icon:active{transform:scale(.9);background:rgba(0,0,0,.05);}

.Nicole-dock-icon svg{width:28px;height:28px;stroke:#222;stroke-width:1.5;fill:none;}

#app-wechat svg{width:25px;height:25px;}

.Nicole-hd-back{cursor:pointer;padding:4px;display:flex;align-items:center;color:var(--hdr-ic,#333);margin-right:4px;transition:opacity .2s;flex-shrink:0;}

.Nicole-hd-back:active{opacity:.6;}

.Nicole-hd-back svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.5;}

.Nicole-sys-app{position:absolute;inset:0;background:#fff;z-index:250;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s;border-radius:inherit;}

.Nicole-sys-app.show{transform:translateX(0);}

.Nicole-sys-app-hd{padding:40px 16px 16px;background:rgba(255,255,255,.9);backdrop-filter:blur(10px);font-size:16px;font-weight:500;display:flex;align-items:center;gap:12px;border-bottom:.5px solid rgba(0,0,0,.05);z-index:10;}

.Nicole-sys-app-body{flex:1;overflow-y:auto;padding:0;scrollbar-width:none;display:flex;flex-direction:column;background:#fff;}

.Nicole-sys-app-body::-webkit-scrollbar{display:none;}

.Nicole-phone-app-container{display:flex;flex-direction:column;height:100%;width:100%;}

.Nicole-phone-content{flex:1;overflow-y:auto;scrollbar-width:none;background:#fff;padding-bottom:20px;}

.Nicole-phone-tabbar{display:flex;justify-content:space-around;padding:10px 0 20px;border-top:.5px solid rgba(0,0,0,.05);background:rgba(250,250,250,.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}

.Nicole-ptab{font-size:10px;color:#888;cursor:pointer;transition:color .2s;display:flex;flex-direction:column;align-items:center;gap:4px;font-weight:500;}

.Nicole-ptab svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.5;}

.Nicole-ptab.active{color:#222;}

.Nicole-list-item{padding:14px 20px;border-bottom:.5px solid rgba(0,0,0,.03);display:flex;justify-content:space-between;align-items:center;cursor:pointer;background:#fff;transition:background .2s;}

.Nicole-list-item:active{background:#f9f9f9;}

.Nicole-item-title{font-size:15px;font-weight:500;color:#222;}

.Nicole-item-sub{font-size:12px;color:#888;margin-top:4px;}

.Nicole-api-input{width:100%;padding:10px 12px;border:1px solid #e5e5e5;border-radius:8px;font-size:13px;color:#333;outline:none;transition:border-color .2s,background .2s;background:#fafafa;box-sizing:border-box;font-family:inherit;}
.Nicole-api-input:focus{border-color:#222;background:#fff;}
.Nicole-api-input::placeholder{color:#ccc;}
.Nicole-api-btn{flex:1;padding:11px 0;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:opacity .15s,transform .1s;font-family:inherit;letter-spacing:.3px;}
.Nicole-api-btn.test{background:#f2f2f2;color:#333;}
.Nicole-api-btn.save{background:#222;color:#fff;}
.Nicole-api-btn:active{opacity:.75;transform:scale(.97);}
.Nicole-api-label{font-size:11px;color:#999;display:block;margin-bottom:6px;font-weight:500;letter-spacing:.2px;}
.Nicole-api-section{margin-bottom:14px;}
.Nicole-api-status{font-size:11px;text-align:center;padding:8px 0;margin-bottom:14px;min-height:16px;letter-spacing:.2px;transition:color .2s;}

/* ===== 通用App内容面板 ===== */
.Nicole-app-panel{position:absolute;top:0;left:0;width:100%;height:100%;background:#fff;z-index:300;display:none;flex-direction:column;}
.Nicole-app-panel.show{display:flex;}
.Nicole-app-hd{display:flex;align-items:center;padding:14px 16px;border-bottom:.5px solid #f0f0f0;flex-shrink:0;}
.Nicole-app-title{flex:1;text-align:center;font-size:15px;font-weight:600;color:#222;letter-spacing:.3px;}
.Nicole-app-body{flex:1;overflow-y:auto;scrollbar-width:none;background:#fafafa;}
.Nicole-app-body::-webkit-scrollbar{display:none;}

/* ===== 抖音视频界面 ===== */
.Nicole-dy-feed{width:100%;height:100%;position:relative;background:#000;overflow:hidden;}
.Nicole-dy-video{width:100%;height:100%;position:relative;display:flex;align-items:center;justify-content:center;}
.Nicole-dy-video-bg{width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;filter:brightness(.7);}
.Nicole-dy-video-placeholder{width:100%;height:100%;position:absolute;top:0;left:0;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);display:flex;align-items:center;justify-content:center;}
.Nicole-dy-video-placeholder .Nicole-dy-char-avatar{width:120px;height:120px;border-radius:50%;background-size:cover;background-position:center;border:3px solid rgba(255,255,255,.2);box-shadow:0 0 60px rgba(255,255,255,.1);}
.Nicole-dy-text-img{width:85%;max-width:280px;padding:24px 20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:16px;color:#fff;font-size:15px;line-height:1.7;text-align:center;font-weight:500;letter-spacing:.3px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);word-break:break-word;max-height:60%;overflow-y:auto;scrollbar-width:none;}
.Nicole-dy-text-img::-webkit-scrollbar{display:none;}
.Nicole-dy-video-overlay{position:absolute;bottom:0;left:0;right:0;height:50%;background:linear-gradient(transparent,rgba(0,0,0,.7));pointer-events:none;}
.Nicole-dy-topbar{position:absolute;top:0;left:0;right:0;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;z-index:10;background:linear-gradient(rgba(0,0,0,.3),transparent);}
.Nicole-dy-topbar-title{font-size:16px;font-weight:700;color:#fff;letter-spacing:.5px;}
.Nicole-dy-refresh{cursor:pointer;padding:7px 14px;background:rgba(255,255,255,.12);border-radius:16px;font-size:12px;color:#fff;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.15);transition:background .2s;}
.Nicole-dy-refresh:active{background:rgba(255,255,255,.25);}
.Nicole-dy-right-bar{position:absolute;right:10px;bottom:110px;display:flex;flex-direction:column;align-items:center;gap:20px;z-index:10;}
.Nicole-dy-action{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;transition:transform .1s;}
.Nicole-dy-action:active{transform:scale(.85);}
.Nicole-dy-action svg{width:28px;height:28px;stroke:#fff;fill:none;stroke-width:1.5;}
.Nicole-dy-action.liked svg{fill:#fe2c55;stroke:#fe2c55;}
.Nicole-dy-action span{font-size:11px;color:#fff;font-weight:600;text-shadow:0 1px 2px rgba(0,0,0,.3);}
.Nicole-dy-avatar{width:42px;height:42px;border-radius:50%;border:2px solid #fff;background-size:cover;background-position:center;margin-bottom:4px;}
.Nicole-dy-bottom-info{position:absolute;bottom:24px;left:14px;right:72px;z-index:10;}
.Nicole-dy-author{font-size:15px;font-weight:700;color:#fff;margin-bottom:7px;text-shadow:0 1px 3px rgba(0,0,0,.4);}
.Nicole-dy-desc{font-size:13px;color:#fff;line-height:1.5;margin-bottom:10px;text-shadow:0 1px 3px rgba(0,0,0,.4);}
.Nicole-dy-music{font-size:12px;color:#fff;display:flex;align-items:center;gap:6px;text-shadow:0 1px 3px rgba(0,0,0,.4);}
.Nicole-dy-music svg{width:14px;height:14px;stroke:#fff;fill:none;stroke-width:1.5;animation:dy-music-spin 3s linear infinite;}
@keyframes dy-music-spin{from{transform:rotate(0);}to{transform:rotate(360deg);}}
/* 弹幕 */
.Nicole-dy-danmaku{position:absolute;top:40px;left:0;width:100%;height:55%;pointer-events:none;z-index:5;overflow:hidden;}
.Nicole-dy-danmaku-item{position:absolute;white-space:nowrap;color:#fff;font-size:13px;text-shadow:0 1px 3px rgba(0,0,0,.6),0 0 4px rgba(0,0,0,.3);font-weight:500;padding:4px 10px;background:rgba(0,0,0,.2);border-radius:12px;backdrop-filter:blur(4px);}
@keyframes dy-danmaku-scroll{from{transform:translateX(100vw);}to{transform:translateX(-100%);}}
.Nicole-dy-loading{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font-size:14px;z-index:20;text-align:center;}
.Nicole-dy-loading-spinner{width:32px;height:32px;border:3px solid rgba(255,255,255,.2);border-top-color:#fff;border-radius:50%;animation:dy-spin .8s linear infinite;margin:0 auto 10px;}
@keyframes dy-spin{to{transform:rotate(360deg);}}
.Nicole-dy-empty{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:rgba(255,255,255,.6);font-size:13px;z-index:20;text-align:center;width:80%;}
.Nicole-dy-empty button{margin-top:14px;padding:8px 20px;background:#fe2c55;color:#fff;border:none;border-radius:18px;font-size:13px;font-weight:600;cursor:pointer;}

/* ===== 相册/Ins/微博 通用简洁界面 ===== */
.Nicole-simple-app{padding:16px;}
.Nicole-simple-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.Nicole-simple-card{background:#fff;border-radius:12px;padding:14px;box-shadow:0 1px 4px rgba(0,0,0,.04);cursor:pointer;transition:transform .1s;}
.Nicole-simple-card:active{transform:scale(.97);}
.Nicole-simple-card-icon{width:36px;height:36px;border-radius:10px;background:#f5f5f5;display:flex;align-items:center;justify-content:center;margin-bottom:10px;}
.Nicole-simple-card-icon svg{width:20px;height:20px;stroke:#333;fill:none;stroke-width:1.5;}
.Nicole-simple-card-title{font-size:13px;font-weight:600;color:#222;margin-bottom:3px;}
.Nicole-simple-card-sub{font-size:11px;color:#999;}
.Nicole-simple-header{font-size:18px;font-weight:700;color:#222;margin-bottom:14px;letter-spacing:.3px;}

/* ===== App通用刷新栏 ===== */
.Nicole-app-refreshbar{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:#fff;border-bottom:.5px solid #f0f0f0;position:sticky;top:0;z-index:10;}
.Nicole-app-refreshbar-title{font-size:15px;font-weight:600;color:#222;}
.Nicole-app-refreshbtn{cursor:pointer;padding:6px 14px;background:#222;color:#fff;border-radius:14px;font-size:12px;font-weight:500;border:none;transition:opacity .15s;}
.Nicole-app-refreshbtn:active{opacity:.7;}
.Nicole-app-loading{text-align:center;padding:40px 20px;color:#999;font-size:13px;}
.Nicole-app-empty{text-align:center;padding:40px 20px;color:#bbb;font-size:13px;}
.Nicole-app-empty button{margin-top:14px;padding:8px 20px;background:#222;color:#fff;border:none;border-radius:16px;font-size:13px;cursor:pointer;}

/* ===== 抖音评论弹窗 ===== */
.Nicole-dy-comment-panel{position:absolute;bottom:0;left:0;width:100%;height:60%;background:#fff;border-radius:16px 16px 0 0;z-index:50;display:none;flex-direction:column;animation:dy-slide-up .3s ease;}
.Nicole-dy-comment-panel.show{display:flex;}
@keyframes dy-slide-up{from{transform:translateY(100%);}to{transform:translateY(0);}}
.Nicole-dy-comment-hd{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:.5px solid #f0f0f0;}
.Nicole-dy-comment-hd span{font-size:14px;font-weight:600;color:#222;}
.Nicole-dy-comment-close{cursor:pointer;font-size:20px;color:#999;width:24px;text-align:center;}
.Nicole-dy-comment-list{flex:1;overflow-y:auto;scrollbar-width:none;padding:8px 16px;}
.Nicole-dy-comment-list::-webkit-scrollbar{display:none;}
.Nicole-dy-comment-item{display:flex;gap:10px;padding:10px 0;border-bottom:.5px solid #f5f5f5;}
.Nicole-dy-comment-av{width:32px;height:32px;border-radius:50%;background-size:cover;background-position:center;flex-shrink:0;}
.Nicole-dy-comment-body{flex:1;}
.Nicole-dy-comment-user{font-size:12px;color:#999;margin-bottom:4px;font-weight:500;}
.Nicole-dy-comment-text{font-size:13px;color:#333;line-height:1.5;}
.Nicole-dy-comment-time{font-size:11px;color:#ccc;margin-top:4px;}
.Nicole-dy-video-indicator{position:absolute;top:50%;left:6px;transform:translateY(-50%);display:flex;flex-direction:column;gap:6px;z-index:10;}
.Nicole-dy-video-dot{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.4);transition:all .2s;}
.Nicole-dy-video-dot.active{background:#fff;height:16px;border-radius:2px;}
.Nicole-dy-video-nav{position:absolute;top:0;bottom:0;width:30%;z-index:8;cursor:pointer;}
.Nicole-dy-video-nav.prev{left:0;}
.Nicole-dy-video-nav.next{right:0;}

/* ===== 情侣问答App ===== */
.Nicole-couple-list{padding:12px;}
.Nicole-couple-card{background:#fff;border-radius:12px;padding:14px;margin-bottom:10px;box-shadow:0 1px 4px rgba(0,0,0,.04);}
.Nicole-couple-q{font-size:14px;font-weight:600;color:#222;margin-bottom:10px;line-height:1.5;}
.Nicole-couple-qnum{display:inline-block;width:22px;height:22px;border-radius:50%;background:#222;color:#fff;font-size:11px;text-align:center;line-height:22px;margin-right:8px;font-weight:600;}
.Nicole-couple-input{width:100%;padding:9px 12px;border:1px solid #e5e5e5;border-radius:8px;font-size:13px;color:#333;outline:none;resize:none;box-sizing:border-box;font-family:inherit;transition:border-color .2s;background:#fafafa;}
.Nicole-couple-input:focus{border-color:#222;background:#fff;}
.Nicole-couple-btn{margin-top:8px;padding:7px 16px;background:#222;color:#fff;border:none;border-radius:14px;font-size:12px;font-weight:500;cursor:pointer;transition:opacity .15s;}
.Nicole-couple-btn:active{opacity:.7;}
.Nicole-couple-btn.revealed{background:#f2f2f2;color:#999;}
.Nicole-couple-answer{margin-top:10px;padding:10px 12px;background:linear-gradient(135deg,#fff5f5,#fff0f6);border-radius:8px;border-left:3px solid #fe2c55;display:none;}
.Nicole-couple-answer.show{display:block;animation:couple-fade .3s ease;}
@keyframes couple-fade{from{opacity:0;transform:translateY(-5px);}to{opacity:1;transform:translateY(0);}}
.Nicole-couple-answer-label{font-size:11px;color:#fe2c55;font-weight:600;margin-bottom:4px;}
.Nicole-couple-answer-text{font-size:13px;color:#333;line-height:1.6;}
.Nicole-couple-match{margin-top:6px;font-size:11px;color:#999;}

/* ===== 备忘录App (iOS风格) ===== */
.Nicole-memo-list{padding:0;}
.Nicole-memo-item{padding:14px 16px;border-bottom:.5px solid #f0f0f0;cursor:pointer;transition:background .15s;background:#fff;}
.Nicole-memo-item:active{background:#f5f5f5;}
.Nicole-memo-item-title{font-size:15px;font-weight:600;color:#222;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.Nicole-memo-item-preview{font-size:12px;color:#999;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.Nicole-memo-item-date{font-size:11px;color:#ccc;margin-top:2px;}
.Nicole-memo-item.voice .Nicole-memo-item-title::before{content:'🎙 ';font-size:13px;}
.Nicole-memo-detail{padding:20px 16px;min-height:100%;background:#fff;}
.Nicole-memo-detail-title{font-size:20px;font-weight:700;color:#222;margin-bottom:6px;line-height:1.4;}
.Nicole-memo-detail-date{font-size:12px;color:#999;margin-bottom:16px;}
.Nicole-memo-detail-body{font-size:14px;color:#333;line-height:1.8;white-space:pre-wrap;}
.Nicole-memo-voice-player{display:flex;align-items:center;gap:12px;padding:14px;background:#f5f5f5;border-radius:12px;margin-bottom:16px;}
.Nicole-memo-voice-play{width:40px;height:40px;border-radius:50%;background:#222;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}
.Nicole-memo-voice-play:active{opacity:.7;}
.Nicole-memo-voice-wave{flex:1;height:30px;display:flex;align-items:center;gap:2px;}
.Nicole-memo-voice-bar{flex:1;background:#ddd;border-radius:1px;animation:voice-wave 1.2s ease-in-out infinite;}
.Nicole-memo-voice-bar:nth-child(odd){animation-delay:.3s;}
.Nicole-memo-voice-bar:nth-child(3n){animation-delay:.6s;}
@keyframes voice-wave{0%,100%{height:20%;}50%{height:100%;}}
.Nicole-memo-voice-time{font-size:12px;color:#999;flex-shrink:0;}
.Nicole-memo-back{cursor:pointer;padding:6px 12px;color:#ff9500;font-size:15px;font-weight:400;display:flex;align-items:center;gap:2px;}
.Nicole-memo-back:active{opacity:.6;}

.Nicole-item-arrow svg{width:16px;height:16px;stroke:#ccc;fill:none;stroke-width:1.5;}

.Nicole-contact-detail{padding:20px;display:flex;flex-direction:column;gap:20px;animation:Nicole-pop .3s forwards;}

.Nicole-c-av-wrap{display:flex;justify-content:center;margin-bottom:10px;}

.Nicole-c-av{width:80px;height:80px;border-radius:50%;background:#f0f0f0;display:flex;justify-content:center;align-items:center;font-size:32px;color:#888;font-weight:300;}

.Nicole-c-input-grp{display:flex;flex-direction:column;gap:6px;}

.Nicole-c-input-grp label{font-size:12px;color:#888;margin-left:4px;}

.Nicole-c-input{width:100%;border:none;border-bottom:1px solid rgba(0,0,0,.1);padding:12px 4px;font-size:16px;color:#222;outline:none;background:transparent;transition:border-color .3s;}

.Nicole-c-input:focus{border-bottom-color:#222;}

.Nicole-c-btns{display:flex;gap:12px;margin-top:10px;}

.Nicole-c-btn{flex:1;padding:14px;border-radius:12px;border:none;font-size:14px;font-weight:500;cursor:pointer;text-align:center;transition:transform .1s,opacity .2s;}

.Nicole-c-btn:active{transform:scale(.98);opacity:.8;}

.Nicole-c-btn.call{background:#333;color:#fff;}

.Nicole-c-btn.save{background:#f2f2f7;color:#222;}

.Nicole-dial-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px 24px;max-width:260px;margin:0 auto;padding-top:20px;}

.Nicole-dial-key{width:68px;height:68px;border-radius:50%;background:#f2f2f7;display:flex;flex-direction:column;justify-content:center;align-items:center;font-size:28px;font-weight:300;color:#222;cursor:pointer;transition:transform .1s,background .1s;border:1px solid rgba(0,0,0,.02);}

.Nicole-dial-key:active{transform:scale(.9);background:#e5e5ea;}

.Nicole-dial-callbtn{width:68px;height:68px;border-radius:50%;background:#34c759;display:flex;justify-content:center;align-items:center;cursor:pointer;margin:30px auto 0;transition:transform .1s;box-shadow:0 4px 12px rgba(52,199,89,.3);}

.Nicole-dial-callbtn:active{transform:scale(.9);}

.Nicole-dial-callbtn svg{width:30px;height:30px;stroke:#fff;stroke-width:1.5;fill:none;}


.Nicole-stage{width:90%;display:flex;justify-content:center;padding:10px 0;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;touch-action:pan-y;--wrap-bg:#e0e0e0;--hdr-bg:rgba(255,255,255,.85);--ftr-bg:rgba(255,255,255,.9);--bub-r:rgba(245,245,245,.9);--bub-l:rgba(255,255,255,.9);--txt-main:#222;--wv-bg:#aaa;--sys-txt:#888;--card-txt:#222;--hdr-txt:#333;--hdr-ic:#333;--card-ic:#333;--pull-bg:rgba(200,200,200,.3);--card-bg:rgba(255,255,255,.7);--call-bub-l:rgba(250,250,250,.9);--call-bub-r:rgba(240,240,240,.9);--call-bub-txt:#222;--blur-val:16px;background:transparent;border:none!important;outline:none!important;box-shadow:none!important;}

.Nicole-phone-wrap{padding:6px;background:var(--wrap-bg);border-radius:42px;display:flex;justify-content:center;align-items:center;width:100%;max-width:360px;transition:background .3s;border:none!important;outline:none!important;box-shadow:none!important;background-clip:padding-box;}

input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}

input[type=number]{-moz-appearance:textfield;}

::-webkit-scrollbar{display:none;width:0;height:0;}

.Nicole-root.solid-mode{--blur-val:0px!important;}

.Nicole-root.solid-mode .Nicole-hd,.Nicole-root.solid-mode .Nicole-ft,.Nicole-root.solid-mode .Nicole-hd-pull{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}

.Nicole-root.av-sq .Nicole-uav,.Nicole-root.av-sq .Nicole-rav,.Nicole-root.av-sq .Nicole-lav,.Nicole-root.av-sq .Nicole-call-av,.Nicole-root.av-sq .Nicole-cp-face,.Nicole-root.av-sq .Nicole-pyq-iav,.Nicole-root.av-sq .Nicole-pyq-uav,.Nicole-root.av-sq .Nicole-mu-face,.Nicole-root.av-sq .Nicole-anchor-av{border-radius:10px!important;}

.Nicole-root.av-sq .Nicole-call.minimized:not(.video) .Nicole-call-av{border-radius:6px!important;}

.Nicole-phone{width:100%;height:510px;background:#fdfdfd;border-radius:36px;position:relative;overflow:hidden;-webkit-mask-image:-webkit-radial-gradient(white,black);transform:translateZ(0);display:flex;flex-direction:column;box-sizing:border-box;border:none;outline:none;box-shadow:none;}

.Nicole-bg{position:absolute;inset:-2px;z-index:0;background-size:cover;background-position:center;background-repeat:no-repeat;background-color:#f7f7f7;transition:background-image .3s;border-radius:inherit;}

.Nicole-content-layer{position:relative;z-index:1;display:flex;flex-direction:column;width:100%;height:100%;}

.Nicole-hd{position:absolute;top:0;left:0;right:0;padding:20px 14px 8px;display:flex;align-items:center;justify-content:space-between;background:var(--hdr-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));z-index:50;transition:transform .35s cubic-bezier(.2,.8,.2,1),background .3s;border-bottom:.5px solid rgba(0,0,0,.03);}

.Nicole-hd.collapsed{transform:translateY(-100%);}

.Nicole-notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:70px;height:16px;background:#222;border-radius:0 0 10px 10px;z-index:30;}

.Nicole-hd-pull{position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);width:44px;height:16px;background:var(--pull-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:0 0 14px 14px;display:flex;justify-content:center;align-items:center;cursor:pointer;z-index:100;color:var(--sys-txt);transition:all .3s;pointer-events:auto;}

.Nicole-hd.collapsed .Nicole-hd-pull svg{transform:rotate(180deg);}

.Nicole-hd-ph{width:4px;}

.Nicole-hd-mid{display:flex;align-items:center;gap:12px;flex:1;justify-content:flex-start;margin-left:2px;}

.Nicole-ubox{display:flex;flex-direction:column;align-items:center;gap:4px;width:56px;}

.Nicole-uav{width:32px;height:32px;aspect-ratio:1;border-radius:50%;background-size:cover;background-position:center;cursor:pointer;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}

.Nicole-uname{font-size:11px;font-weight:500;color:var(--hdr-txt,#222);width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;outline:none;cursor:text;padding:2px;border-radius:4px;transition:background .2s,color .3s;}

.Nicole-uname:focus{background:rgba(0,0,0,.05);}

.Nicole-waves{display:flex;align-items:center;gap:3px;height:20px;}

.Nicole-wave{width:2px;background:var(--wv-bg);border-radius:10px;opacity:.85;animation:Nicole-jp 1s ease-in-out infinite alternate;transition:background .3s;}

.Nicole-wave:nth-child(2){animation-delay:.3s} .Nicole-wave:nth-child(3){animation-delay:.15s} .Nicole-wave:nth-child(4){animation-delay:.5s} .Nicole-wave:nth-child(5){animation-delay:.25s} .Nicole-wave:nth-child(6){animation-delay:.4s}

@keyframes Nicole-jp{0%{height:4px}100%{height:16px}}

/* 群聊模式 - 隐藏头像，只显示群名 */
.Nicole-hd.group-mode .Nicole-ubox{display:none!important;}
.Nicole-hd.group-mode .Nicole-waves{display:none!important;}
.Nicole-hd.group-mode .Nicole-hd-mid{justify-content:center;}
.Nicole-hd.group-mode .Nicole-group-name{display:block;font-size:15px;font-weight:600;color:var(--hdr-txt,#222);text-align:center;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.Nicole-group-name{display:none;}

/* 群聊设置面板 - 模仿微信，黑白灰配色 */
.Nicole-group-setting{position:absolute;top:0;left:0;right:0;bottom:0;background:#f5f5f5;z-index:200;display:none;flex-direction:column;}
.Nicole-group-setting.show{display:flex;}
.Nicole-group-setting-hd{display:flex;align-items:center;padding:12px 16px;background:#fff;border-bottom:.5px solid #e5e5e5;gap:12px;}
.Nicole-group-setting-back{cursor:pointer;color:#333;font-size:20px;flex-shrink:0;}
.Nicole-group-setting-title{flex:1;text-align:center;font-size:15px;font-weight:600;color:#222;}
.Nicole-group-setting-body{flex:1;overflow-y:auto;padding:12px;}
.Nicole-group-section{background:#fff;border-radius:10px;margin-bottom:12px;overflow:hidden;}
.Nicole-group-section-title{padding:10px 14px;font-size:12px;color:#999;font-weight:400;}
.Nicole-group-member-item{display:flex;align-items:center;padding:10px 14px;gap:12px;border-top:.5px solid #f0f0f0;}
.Nicole-group-member-item:first-child{border-top:none;}
.Nicole-group-member-av{width:36px;height:36px;border-radius:50%;background:#ddd;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:#fff;flex-shrink:0;}
.Nicole-group-member-name{flex:1;font-size:14px;color:#222;font-weight:400;}
.Nicole-group-member-role{font-size:11px;color:#999;margin-left:6px;}
.Nicole-group-kick-btn{background:none;border:none;color:#ff3b30;font-size:13px;cursor:pointer;padding:4px 8px;border-radius:6px;transition:background .2s;}
.Nicole-group-kick-btn:hover{background:#fff0f0;}
.Nicole-group-add-btn{display:flex;align-items:center;justify-content:center;padding:12px;color:#07c160;font-size:14px;cursor:pointer;gap:6px;transition:background .2s;}
.Nicole-group-add-btn:hover{background:#f0fff4;}
.Nicole-group-info-row{display:flex;align-items:center;padding:12px 14px;gap:12px;border-top:.5px solid #f0f0f0;}
.Nicole-group-info-label{font-size:14px;color:#333;width:80px;flex-shrink:0;}
.Nicole-group-info-value{flex:1;font-size:14px;color:#666;text-align:right;}
.Nicole-group-dismiss-btn{display:block;width:100%;padding:14px;background:#fff;color:#ff3b30;font-size:15px;border:none;border-radius:10px;cursor:pointer;margin-top:8px;transition:background .2s;}
.Nicole-group-dismiss-btn:hover{background:#fff0f0;}

.Nicole-icons-rt{display:flex;gap:6px;align-items:center;}

.Nicole-icbtn{padding:4px;cursor:pointer;color:var(--hdr-ic,#333)!important;transition:opacity .2s;}

.Nicole-icbtn:active{opacity:.6;}

.Nicole-icbtn svg{width:20px;height:20px;fill:none!important;stroke:var(--hdr-ic,#333)!important;stroke-width:1.5;}

.Nicole-chat{flex:1;padding:14px;padding-top:76px;display:flex;flex-direction:column;gap:14px;overflow-y:auto;touch-action:pan-y;z-index:5;scrollbar-width:none;overscroll-behavior:contain;position:relative;transition:padding-top .35s cubic-bezier(.2,.8,.2,1);}

.Nicole-chat.collapsed{padding-top:26px;}

.Nicole-row{display:flex;gap:8px;max-width:95%;opacity:0;animation:Nicole-pop .4s forwards cubic-bezier(.2,.8,.2,1);position:relative;transition:transform .2s,filter .2s;}

@keyframes Nicole-pop{from{transform:translateY(6px);opacity:0;}to{transform:translateY(0);opacity:1;}}

.Nicole-row.left{align-self:flex-start;}

.Nicole-row.right{align-self:flex-end;flex-direction:row-reverse;}

.Nicole-rav,.Nicole-lav{width:32px;height:32px;border-radius:50%;background-size:cover;background-position:center;flex-shrink:0;user-select:none;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}

.Nicole-ct{display:flex;flex-direction:column;gap:4px;max-width:calc(100% - 40px);position:relative;}

.Nicole-row.right .Nicole-ct{align-items:flex-end;}

.Nicole-err-icon{display:none;width:18px;height:18px;border-radius:50%;border:1.5px solid #444;color:#444;background:rgba(255,255,255,.9);align-items:center;justify-content:center;font-size:13px;font-weight:bold;cursor:pointer;flex-shrink:0;align-self:center;}

.Nicole-row.has-err .Nicole-err-icon{display:flex;animation:Nicole-pop .3s forwards;}

.Nicole-sys-msg{width:100%;text-align:center;font-size:11px;color:var(--sys-txt);font-weight:400;opacity:0;animation:Nicole-pop .4s forwards;padding:4px 0;transition:color .3s;}

.Nicole-view-rev{color:#444;font-weight:500;cursor:pointer;margin-left:4px;border-bottom:.5px solid #444;}

.Nicole-sys-rej{color:var(--sys-txt);filter:brightness(.85);transition:color .3s;}

.Nicole-bub{padding:10px 14px;font-size:13px;line-height:1.5;color:var(--txt-main);word-wrap:break-word;word-break:break-all;white-space:pre-wrap;cursor:pointer;position:relative;backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));transition:background .3s,backdrop-filter .3s;font-weight:400;border:.5px solid rgba(0,0,0,.03);}

.Nicole-row.left .Nicole-bub{background:var(--bub-l);border-radius:4px 18px 18px 18px;}

.Nicole-row.right .Nicole-bub{background:var(--bub-r);border-radius:18px 4px 18px 18px;}

@keyframes Nc-poke{0%{transform:scale(1) rotate(0);}20%{transform:scale(1.1) rotate(-15deg) translateX(-4px);}40%{transform:scale(1.1) rotate(15deg) translateX(4px);}60%{transform:scale(1.1) rotate(-15deg) translateX(-4px);}80%{transform:scale(1.1) rotate(15deg) translateX(4px);}100%{transform:scale(1) rotate(0);}}

@keyframes Nc-dice{0%{transform:translateY(0) rotate(0);}25%{transform:translateY(-12px) rotate(90deg);}50%{transform:translateY(0) rotate(180deg);}75%{transform:translateY(-6px) rotate(270deg);}100%{transform:translateY(0) rotate(360deg);}}

@keyframes Nc-rps{0%{transform:scale(.3);opacity:0;}50%{transform:scale(1.2);opacity:1;}100%{transform:scale(1);opacity:1;}}

.Nicole-interact-item{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;background:transparent;border:none;box-shadow:none;color:#444;margin:4px 0;}

.Nicole-interact-item svg{width:44px;height:44px;stroke:currentColor;fill:none;stroke-width:1.5;}

.Nicole-anim-poke svg{animation:Nc-poke .6s ease-in-out;}

.Nicole-anim-dice svg{animation:Nc-dice .7s ease-in-out;}

.Nicole-anim-rps svg{animation:Nc-rps .5s cubic-bezier(.175,.885,.32,1.275);}

.Nicole-row.right .Nicole-interact-item{align-items:flex-end;}

.Nicole-row.left .Nicole-interact-item{align-items:flex-start;}

.Nicole-img{width:140px;max-width:100%;border-radius:14px;display:block;background:transparent;object-fit:cover;cursor:pointer;border:.5px solid rgba(0,0,0,.03);}

.Nicole-txt-img{display:flex!important;justify-content:center!important;align-items:center!important;width:150px!important;max-width:100%!important;aspect-ratio:1!important;background:linear-gradient(135deg,var(--bub-l),var(--bub-r))!important;backdrop-filter:blur(var(--blur-val))!important;-webkit-backdrop-filter:blur(var(--blur-val))!important;border-radius:18px!important;padding:14px!important;font-size:13px!important;font-weight:400!important;color:var(--txt-main)!important;text-align:center!important;word-wrap:break-word!important;white-space:pre-wrap!important;line-height:1.5!important;cursor:pointer!important;overflow:hidden!important;border:.5px solid rgba(0,0,0,.03)!important;box-shadow:none!important;transition:all .3s;}

.Nicole-txt-img:active{filter:brightness(.95);}

.Nicole-quote-box{position:relative;font-size:11px;color:inherit;opacity:.75;background:rgba(0,0,0,.02);padding:8px 12px;border-radius:10px;margin-bottom:8px;word-wrap:break-word;white-space:pre-wrap;display:block;width:100%;max-width:220px;box-sizing:border-box;overflow:hidden;}

.Nicole-row.right .Nicole-quote-box{background:rgba(0,0,0,.02);}

.Nicole-reply-bar{display:none;background:rgba(255,255,255,.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:14px;padding:8px 14px;font-size:12px;color:#666;margin:10px 0 8px;justify-content:space-between;align-items:center;border:.5px solid rgba(0,0,0,.03);}

.Nicole-reply-bar.show{display:flex;}

.Nicole-reply-txt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85%;font-weight:400;}

.Nicole-reply-txt::before{content:'💬 引用：';color:#444;font-size:11px;margin-right:4px;font-weight:500;}

.Nicole-reply-close{cursor:pointer;font-weight:300;color:#888;padding:0 4px;font-size:18px;}

.Nicole-au{padding:10px 14px;cursor:pointer;overflow:hidden;transition:all .3s;backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));user-select:none;border:.5px solid rgba(0,0,0,.03);}

.Nicole-row.left .Nicole-au{background:var(--bub-l);border-radius:4px 18px 18px 18px;}

.Nicole-row.right .Nicole-au{background:var(--bub-r);border-radius:18px 4px 18px 18px;}

.Nicole-au-main{display:flex;align-items:center;gap:8px;width:130px;pointer-events:none;}

.Nicole-au-play{width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:7px solid #888;transition:border-left-color .2s;}

.Nicole-au.playing .Nicole-au-play{border-left-color:#222;}

.Nicole-au-bars{flex:1;display:flex;align-items:center;gap:2px;height:10px;}

.Nicole-au-bars span{width:2px;height:100%;background:rgba(0,0,0,.1);border-radius:1px;transition:height .2s,background .2s;}

.Nicole-au-bars span:nth-child(even){height:60%} .Nicole-au-bars span:nth-child(3n){height:85%}

.Nicole-au.playing .Nicole-au-bars span{background:#222;animation:Nicole-bar-jump .4s infinite alternate;}

.Nicole-au.playing .Nicole-au-bars span:nth-child(2){animation-delay:.1s} .Nicole-au.playing .Nicole-au-bars span:nth-child(3){animation-delay:.2s} .Nicole-au.playing .Nicole-au-bars span:nth-child(4){animation-delay:.3s}

@keyframes Nicole-bar-jump{0%{transform:scaleY(.4);}100%{transform:scaleY(1.3);}}

.Nicole-au-dur{font-size:11px;font-weight:400;color:#666;pointer-events:none;}

.Nicole-au-wrap{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s;}

.Nicole-au.open .Nicole-au-wrap{grid-template-rows:1fr;}

.Nicole-au-txt{overflow:hidden;font-size:12px;color:var(--txt-main);word-wrap:break-word;white-space:pre-wrap;border-top:.5px solid transparent;transition:all .3s;opacity:.8;font-weight:300;}

.Nicole-au.open .Nicole-au-txt{border-top-color:rgba(0,0,0,.05);margin-top:8px;padding-top:8px;}

.Nicole-meta{display:flex;align-items:center;gap:4px;font-size:10px;color:#aaa;margin-top:2px;font-weight:300;}

.Nicole-tick{color:#aaa;font-size:11px;letter-spacing:-1.5px;font-weight:400;}

.Nicole-tf,.Nicole-link-card,.Nicole-gift-card,.Nicole-mu-invite-card,.Nicole-loc-card,.Nicole-food-card,.Nicole-music-share-card{background:var(--card-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:16px;padding:14px;display:flex;align-items:center;gap:12px;width:210px;cursor:pointer;text-decoration:none;transition:filter .2s,opacity .2s,background .3s;border:.5px solid rgba(0,0,0,.03);}

.Nicole-tf-ic{width:34px;height:34px;background:rgba(0,0,0,.03);border-radius:50%;display:flex;justify-content:center;align-items:center;font-weight:400;font-size:15px;color:var(--card-ic,#222);flex-shrink:0;transition:all .3s;}

.Nicole-tf.got,.Nicole-tf.returned{opacity:.75;}

.Nicole-tf.got .Nicole-tf-ic,.Nicole-tf.returned .Nicole-tf-ic{background:rgba(0,0,0,.02);color:#888;}

.Nicole-link-ic,.Nicole-food-ic{width:36px;height:36px;background:transparent;border-radius:10px;display:flex;justify-content:center;align-items:center;flex-shrink:0;}

.Nicole-link-ic svg,.Nicole-food-ic svg{width:18px;height:18px;fill:none;stroke:var(--card-ic,#222);stroke-width:1.5px;transition:stroke .3s;}

.Nicole-tf-info{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;pointer-events:none;}

.Nicole-tf-t{font-size:13px;font-weight:500;color:var(--card-txt,var(--txt-main));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .3s;letter-spacing:.2px;}

.Nicole-tf-a{font-size:11px;color:var(--sys-txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:300;}

.Nicole-tf-f{font-size:10px;color:var(--txt-main);opacity:.4;margin-top:4px;padding-top:4px;font-weight:300;}

.Nicole-cp-qacard{width:auto;max-width:240px;align-items:flex-start;flex-direction:column;gap:6px;background:var(--card-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:18px;padding:16px;cursor:pointer;transition:filter .2s,background .3s;border:.5px solid rgba(0,0,0,.03);}

.Nicole-cp-qacard .Nicole-tf-t{font-size:11px;font-weight:500;color:var(--sys-txt);letter-spacing:.5px;width:100%;display:flex;align-items:center;gap:6px;text-transform:uppercase;}

.Nicole-cp-qatxt{font-size:13px;color:var(--txt-main);line-height:1.5;font-weight:400;width:100%;word-break:break-word;padding-top:4px;pointer-events:none;}

.Nicole-music-share-card{flex-direction:column;align-items:stretch;width:230px;padding:14px;gap:12px;border-radius:18px;}

.Nicole-msc-top{display:flex;align-items:center;gap:12px;}

.Nicole-msc-cover{width:46px;height:46px;border-radius:10px;background-size:cover;background-position:center;position:relative;flex-shrink:0;}

.Nicole-msc-playic{position:absolute;inset:0;background:rgba(0,0,0,.2);border-radius:10px;display:flex;justify-content:center;align-items:center;}

.Nicole-msc-playic svg{width:18px;height:18px;fill:rgba(255,255,255,.9);}

.Nicole-msc-info{display:flex;flex-direction:column;min-width:0;flex:1;}

.Nicole-msc-name{font-size:13px;font-weight:500;color:var(--txt-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;}

.Nicole-msc-artist{font-size:11px;color:var(--sys-txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;font-weight:300;}

.Nicole-msc-bot{padding-top:8px;display:flex;align-items:center;gap:6px;font-size:10px;color:#888;font-weight:400;}

.Nicole-msc-bot svg{width:14px;height:14px;stroke:#888;}


.Nicole-ft{background:var(--ftr-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));padding:0 14px 14px;display:flex;flex-direction:column;flex-shrink:0;z-index:10;transition:background .3s;border-top:.5px solid rgba(0,0,0,.03);}

.Nicole-in-area{display:flex;gap:8px;align-items:center;padding-top:10px;}

.Nicole-lang{width:34px;height:28px;font-size:11px;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.03);border-radius:10px;cursor:pointer;color:#555;font-weight:500;flex-shrink:0;}

.Nicole-plus{width:28px;height:28px;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .3s;flex-shrink:0;}

.Nicole-plus svg{width:22px;height:22px;stroke:#444;stroke-width:1.5px;fill:none;}

.Nicole-plus.on{transform:rotate(45deg);}

.Nicole-input{flex:1;min-width:0;height:36px;border-radius:18px;background:rgba(240,240,240,.8)!important;padding:0 16px;font-size:13px;outline:none;border:none;color:#222;font-weight:400;}

.Nicole-mic,.Nicole-send{width:28px;height:28px;display:flex;justify-content:center;align-items:center;cursor:pointer;color:#444;flex-shrink:0;}

.Nicole-mic svg,.Nicole-send svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.5px;}

.Nicole-mic.rec{color:#222;animation:Nicole-pl 1s infinite alternate;}

.Nicole-panel{max-height:0;overflow:hidden;transition:max-height .3s ease;display:grid;grid-template-columns:repeat(4,1fr);gap:16px 6px;}

.Nicole-panel.show{max-height:280px;padding-top:16px;overflow-y:auto;scrollbar-width:none;}

.Nicole-pi{display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;position:relative;}

.Nicole-pic{width:46px;height:46px;background:rgba(0,0,0,.02);border-radius:14px;display:flex;justify-content:center;align-items:center;border:.5px solid rgba(0,0,0,.03);}

.Nicole-pic svg{width:22px;height:22px;fill:none;stroke:#333;stroke-width:1.2px;}

.Nicole-ptx{font-size:10px;color:#777;font-weight:400;text-align:center;white-space:nowrap;}

.Nicole-call{position:absolute;inset:0;background:#fdfdfd;z-index:9999;display:flex;flex-direction:column;opacity:0;pointer-events:none;transition:all .35s cubic-bezier(.2,.8,.2,1);border-radius:inherit;overflow:hidden;}

.Nicole-call.show{opacity:1;pointer-events:auto;}

.Nicole-call-vbg{position:absolute;inset:0;background-size:cover;background-position:center;background-image:url('');filter:blur(20px) brightness(.9) grayscale(.2);opacity:0;transition:all .3s;z-index:1;}

.Nicole-call:not(.video) .Nicole-call-vbg{opacity:1;}

.Nicole-call.video .Nicole-call-vbg{opacity:1;filter:blur(10px) brightness(.9) grayscale(.2);}

.Nicole-call-pip{position:absolute;top:30px;right:16px;width:70px;height:100px;background-size:cover;border-radius:12px;z-index:20;opacity:0;transition:opacity .3s;border:.5px solid rgba(255,255,255,.2);}

.Nicole-call.video .Nicole-call-pip{opacity:1;}

.Nicole-call-mini-top{position:absolute;top:20px;left:16px;z-index:60;cursor:pointer;color:#333;padding:4px;display:flex;align-items:center;justify-content:center;transition:color .2s,transform .2s;}

.Nicole-call.video .Nicole-call-mini-top{color:rgba(255,255,255,.9);}

.Nicole-call-mini-top:active{transform:scale(.85);}

.Nicole-call-mini-top svg{width:24px;height:24px;stroke:currentColor;stroke-width:1.5;fill:none;}

.Nicole-call.minimized .Nicole-call-mini-top{display:none;}

.Nicole-call-ct{position:relative;z-index:10;display:flex;flex-direction:column;height:100%;padding:10px 16px 16px;transition:padding .3s;}

.Nicole-call-avs{display:flex;justify-content:center;align-items:center;margin-bottom:12px;transition:transform .4s cubic-bezier(.2,.8,.2,1);}

.Nicole-call.active .Nicole-call-avs{transform:scale(.85) translateY(-10px);}

.Nicole-call-av{width:84px;height:84px;border-radius:50%;background-size:cover;position:relative;transition:border-radius .3s,width .4s,height .4s;border:.5px solid rgba(0,0,0,.05);}

.Nicole-jcall-lav{z-index:1;}

.Nicole-jcall-rav{margin-left:-20px;z-index:2;}

.Nicole-call.active .Nicole-call-av{width:64px;height:64px;}

.Nicole-call.video .Nicole-call-avs{transform:scale(0);height:0;margin:0;opacity:0;display:none;}

.Nicole-call-nm{text-align:center;font-size:20px;font-weight:500;color:#222;z-index:10;letter-spacing:.5px;transition:font-size .4s;margin-bottom:6px;}

.Nicole-call.active .Nicole-call-nm{font-size:16px;margin-bottom:0px;}

.Nicole-call.video .Nicole-call-nm{color:#fff!important;font-weight:500;text-shadow:0 1px 4px rgba(0,0,0,.3);}

.Nicole-call-st{text-align:center;font-size:12px;color:#888;margin-bottom:8px;z-index:10;font-weight:300;transition:all .3s;}

.Nicole-call.active .Nicole-call-st{display:none;}

.Nicole-call.video .Nicole-call-st{color:rgba(255,255,255,.8)!important;font-weight:400;text-shadow:0 1px 3px rgba(0,0,0,.3);}

.Nicole-call-timer{text-align:center;font-size:10px;color:#555;font-family:-apple-system,sans-serif;font-weight:400;margin-bottom:8px;z-index:10;display:none;transition:opacity .3s;}

.Nicole-call.active .Nicole-call-timer{display:block;opacity:1;}

.Nicole-call.video .Nicole-call-timer{color:#fff!important;text-shadow:0 1px 3px rgba(0,0,0,.3);}

.Nicole-call-bubs{flex:1;display:flex;flex-direction:column;justify-content:flex-start;gap:8px;margin-bottom:16px;overflow-y:auto;z-index:10;padding:0 4px;scrollbar-width:none;opacity:0;transition:opacity .3s;touch-action:pan-y;-webkit-overflow-scrolling:touch;}

.Nicole-call-bubs::before{content:"";flex:1 1 auto;min-height:0;}

.Nicole-call.active .Nicole-call-bubs{opacity:1;}

.Nicole-cb-wrap{display:flex;flex-direction:column;}

.Nicole-cb-wrap.left{align-items:flex-start;} .Nicole-cb-wrap.right{align-items:flex-end;}

.Nicole-cb{background:var(--call-bub-l,rgba(250,250,250,.9));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:var(--call-bub-txt,#222);padding:10px 14px;border-radius:16px;font-size:13px;max-width:85%;animation:Nicole-pop .3s forwards cubic-bezier(.2,.8,.2,1);font-weight:400;border:.5px solid rgba(0,0,0,.03);}


.Nicole-cb-wrap.right .Nicole-cb{background:var(--call-bub-r,rgba(240,240,240,.9));}

.Nicole-call.video .Nicole-cb{color:var(--call-bub-txt,#222)!important;text-shadow:none;}

.Nicole-call .Nicole-call-ft {

    display: flex !important;

    flex-direction: column;

    gap: 20px;

    z-index: 99999 !important;

    padding-bottom: 10px;

}

.Nicole-call-btns {

    display: none !important;

    justify-content: space-evenly !important;

    padding: 0 30px !important;

    animation: Nicole-pop .3s !important;

}

.Nicole-call.state-out .btns-out {

    display: flex !important;

}

.Nicole-call.state-in .btns-in {

    display: flex !important;

}

.Nicole-call-btn {

    width: 64px !important;

    height: 64px !important;

    border-radius: 50% !important;

    display: flex !important;

    justify-content: center !important;

    align-items: center !important;

    cursor: pointer !important;

    transition: transform .1s, background .2s !important;

}

.Nicole-call-btn:active {

    transform: scale(.92) !important;

}

.Nicole-call-btn.hangup {

    background: #ffffff !important;

    color: #222222 !important;

    box-shadow: 0 2px 8px rgba(0,0,0,.15) !important;

    border: 1px solid rgba(0,0,0,.1) !important;

}

.Nicole-call-btn.answer {

    background: #ffffff !important;

    color: #222222 !important;

    box-shadow: 0 2px 8px rgba(0,0,0,.15) !important;

    border: 1px solid rgba(0,0,0,.1) !important;

}

.Nicole-call-btn.cancel {

    background: #f5f5f5 !important;

    color: #666666 !important;

    box-shadow: 0 2px 8px rgba(0,0,0,.1) !important;

    border: 1px solid rgba(0,0,0,.08) !important;

}

.Nicole-call-btn svg {

    width: 28px !important;

    height: 28px !important;

    stroke: currentColor !important;

    stroke-width: 1.8 !important;

    fill: none !important;

}

.Nicole-call-inrow {

    display: none !important;

    gap: 10px;

    align-items: center;

    background: rgba(250, 250, 250, 0.9) !important;

    backdrop-filter: blur(10px);

    padding: 6px 8px !important;

    height: 36px !important;

    border-radius: 22px;

    animation: Nicole-pop .3s;

    border: .5px solid rgba(0, 0, 0, .03);

    z-index: 99999 !important;

}

.Nicole-call.active .Nicole-call-inrow {

    display: flex !important;

}

.Nicole-call-in {

    flex: 1;

    border: none;

    background: transparent;

    padding: 0 8px !important;

    height: 24px !important;

    font-size: 12px !important;

    outline: none;

    color: #222;

    min-width: 0;

    font-weight: 400;

}

.Nicole-call.active .Nicole-call-btn.mini {

    width: 28px !important;

    height: 28px !important;

    flex-shrink: 0;

    box-shadow: none !important;

}

.Nicole-call.active .Nicole-call-btn.mini svg {

    width: 16px !important;

    height: 16px !important;

}

.Nicole-call.active .Nicole-call-send {

    height: 24px !important;

    padding: 0 12px !important;

    font-size: 11px !important;

    background: #222;

    color: #fff;

    border-radius: 16px;

    font-weight: 500;

    cursor: pointer;

    transition: background .2s;

    border: none;

}

.Nicole-call.minimized{cursor:grab;}

.Nicole-call.minimized:active{cursor:grabbing;}

.Nicole-call.minimized.video{top:16px;right:16px;bottom:auto;left:auto;width:84px;height:134px;border-radius:14px;padding:0;background:#000;overflow:hidden;}

.Nicole-call.minimized.video .Nicole-call-vbg{display:block!important;opacity:1!important;filter:none!important;z-index:1;}

.Nicole-call.minimized.video .Nicole-call-pip{display:block!important;opacity:1!important;width:26px;height:38px;top:6px;right:6px;border-radius:6px;z-index:25;border:none;}

.Nicole-call.minimized.video .Nicole-call-ct{display:flex!important;flex-direction:column;justify-content:flex-end;align-items:center;padding:8px!important;z-index:10;background:linear-gradient(to top,rgba(0,0,0,.5),transparent 60%);height:100%;}

.Nicole-call.minimized.video .Nicole-call-avs,.Nicole-call.minimized.video .Nicole-call-nm,.Nicole-call.minimized.video .Nicole-call-st,.Nicole-call.minimized.video .Nicole-call-bubs,.Nicole-call.minimized.video .Nicole-call-ft{display:none!important;}

.Nicole-call.minimized.video .Nicole-call-timer{display:block!important;margin:0;padding:0;font-size:11px;color:#fff!important;font-weight:400;text-shadow:0 1px 4px rgba(0,0,0,.5);letter-spacing:.5px;opacity:1;}

.Nicole-call.minimized:not(.video){top:60px;right:16px;bottom:auto;left:auto;width:auto;min-width:104px;height:42px;border-radius:21px;background:rgba(250,250,250,.95);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:0 16px;display:flex;flex-direction:row;justify-content:center;align-items:center;overflow:visible;border:.5px solid rgba(0,0,0,.05);}

.Nicole-call.minimized:not(.video) .Nicole-call-vbg{display:none;}

.Nicole-call.minimized:not(.video) .Nicole-call-ct{padding:0;flex-direction:row;justify-content:space-between;align-items:center;width:100%;gap:10px;}

.Nicole-call.minimized:not(.video) .Nicole-call-avs{margin:0;transform:none;display:flex!important;opacity:1!important;height:auto;pointer-events:none;}

.Nicole-call.minimized:not(.video) .Nicole-call-av{width:24px;height:24px;}

.Nicole-call.minimized:not(.video) .Nicole-jcall-rav{margin-left:-10px;z-index:2;}

.Nicole-call.minimized:not(.video) .Nicole-call-nm,.Nicole-call.minimized:not(.video) .Nicole-call-st{display:none;}

.Nicole-call.minimized:not(.video) .Nicole-call-timer{display:block!important;font-size:13px;font-weight:500;color:#222!important;margin:0;text-shadow:none;pointer-events:none;letter-spacing:.5px;opacity:1;}

.Nicole-call.minimized .Nicole-call-bubs,.Nicole-call.minimized .Nicole-call-ft,.Nicole-call.minimized:not(.video) .Nicole-call-pip{display:none!important;}

.Nicole-call-mini-hint{display:none;position:absolute;inset:0;z-index:50;}

.Nicole-call.minimized .Nicole-call-mini-hint{display:block;}

.Nicole-set{position:absolute;inset:0;background:#ffffff;z-index:9999;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s;padding:24px;overflow-y:auto;scrollbar-width:none;}

.Nicole-set.show{transform:translateX(0);}
.nc-inline-row{margin:6px 0;animation:nc-inline-pop .3s ease-out;clear:both!important;box-sizing:border-box;}
.nc-inline-row.nc-left{max-width:75%;display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:start;margin-left:6px;}
.nc-inline-row.nc-right{max-width:75%;margin-left:auto;display:grid;grid-template-columns:1fr auto;gap:8px;justify-items:end;text-align:right;align-items:start;margin-right:6px;}
.nc-inline-av-wrap{display:flex;flex-direction:column;align-items:center;gap:3px;flex-shrink:0;}
.nc-inline-av{width:36px;height:36px;border-radius:50%;background-size:cover;background-position:center;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;}.nc-inline-av.nc-av-char{background:#2c2c2c;color:#fff;border:1px solid #1a1a1a;}.nc-inline-av.nc-av-user{background:#e8e8e8;color:#333;border:1px solid #d0d0d0;}
.nc-inline-content{display:flex;flex-direction:column;gap:2px;min-width:0;max-width:100%;}
.nc-inline-row.nc-right .nc-inline-content{align-items:flex-end;}
.nc-inline-row.nc-left .nc-inline-content{align-items:flex-start;}
.nc-inline-name{font-size:11px;color:#999;white-space:nowrap;max-width:120px;overflow:hidden;text-overflow:ellipsis;margin:0 2px;line-height:1.2;}
.nc-inline-bub{padding:9px 14px;border-radius:14px;font-size:14px;line-height:1.55;word-break:break-word;width:-moz-fit-content;width:fit-content;max-width:100%;position:relative;box-shadow:0 1px 2px rgba(0,0,0,.06);text-align:left;}
.nc-inline-call{min-width:120px;}
.nc-inline-voice{display:flex;align-items:center;gap:8px;min-width:80px;}
.nc-inline-voice-bars{display:flex;align-items:center;gap:2px;height:16px;}
.nc-inline-voice-bars span{width:3px;background:currentColor;opacity:.6;border-radius:2px;}
.nc-inline-voice-dur{font-size:12px;color:#222;opacity:1;}
.nc-inline-card{display:flex;align-items:center;gap:10px;}
.nc-inline-card-ic{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0;}
.nc-inline-card-tx{font-size:13px;font-weight:600;}
.nc-inline-card-sub{font-size:11px;opacity:.6;margin-top:2px;}
.nc-inline-img{max-width:180px;border-radius:10px;display:block;}
@keyframes nc-inline-pop{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.Nicole-chatlist-screen{position:absolute;inset:0;background:#f5f5f5;z-index:300;display:none;flex-direction:column;border-radius:inherit;overflow:hidden;}
.Nicole-chatlist-screen.show{display:flex;}
.Nicole-chatlist-hd{display:flex;align-items:center;padding:14px 16px;background:#fff;border-bottom:1px solid #eee;font-size:16px;font-weight:600;}
.Nicole-chatlist-hd .back{cursor:pointer;margin-right:12px;display:flex;}
.Nicole-chatlist-hd .add{cursor:pointer;margin-left:auto;display:flex;}
.Nicole-chatlist-body{flex:1;overflow-y:auto;}
.Nicole-chatlist-item{position:relative;overflow:hidden;cursor:pointer;border-bottom:1px solid #eee;background:#fff;}
.Nicole-chatlist-inner{display:flex;align-items:center;padding:12px 16px;background:#fff;position:relative;z-index:2;transition:transform .3s cubic-bezier(.2,.8,.2,1);width:100%;box-sizing:border-box;}
.Nicole-chatlist-del{position:absolute;right:0;top:0;bottom:0;width:70px;background:#ff3b30;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;z-index:1;}
.Nicole-chatlist-del svg{width:20px;height:20px;}
.Nicole-chatlist-del span{font-size:11px;font-weight:500;}
.Nicole-chatlist-item:active{background:#f0f0f0;}
.Nicole-chatlist-av{width:46px;height:46px;border-radius:50%;background:#ddd;background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:600;color:#fff;margin-right:12px;flex-shrink:0;}
.Nicole-chatlist-av.group-av{background:linear-gradient(135deg,#576b95,#3d5a80);border-radius:12px;color:#fff;}
.Nicole-chatlist-av.group-av svg{width:22px;height:22px;stroke:#fff;}
.Nicole-chatlist-info{flex:1;min-width:0;}
.Nicole-chatlist-name{font-size:15px;font-weight:500;color:#222;margin-bottom:3px;}
.Nicole-chatlist-msg{font-size:12px;color:#999;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.Nicole-chatlist-item{position:relative;overflow:hidden;}
.Nicole-chatlist-inner{display:flex;align-items:center;padding:12px 16px;transition:transform .3s cubic-bezier(.2,.8,.2,1);background:#fff;position:relative;z-index:2;width:100%;box-sizing:border-box;}
.Nicole-chatlist-del{position:absolute;right:0;top:0;bottom:0;width:70px;background:linear-gradient(135deg,#ff6b6b,#ee5a5a);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;z-index:1;opacity:.9;}
.Nicole-chatlist-del svg{width:20px;height:20px;}
.Nicole-chatlist-del span{font-size:11px;font-weight:500;}
.Nicole-chatlist-add{display:flex;align-items:center;justify-content:center;padding:20px;color:#999;font-size:13px;cursor:pointer;}
.Nicole-addchar-modal{position:absolute;inset:0;background:rgba(0,0,0,.5);z-index:400;display:none;align-items:center;justify-content:center;}
.Nicole-addchar-modal.show{display:flex;}
.Nicole-addchar-box{background:#fff;border-radius:14px;padding:20px;width:80%;max-width:280px;}
.Nicole-addchar-box h4{margin:0 0 12px 0;font-size:15px;text-align:center;}
.Nicole-addchar-box input{width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:14px;box-sizing:border-box;margin-bottom:12px;}
.Nicole-addchar-btns{display:flex;gap:10px;}
.Nicole-addchar-btns button{flex:1;padding:10px;border:none;border-radius:8px;font-size:14px;cursor:pointer;}
.Nicole-addchar-btns .cancel{background:#f0f0f0;color:#666;}
.Nicole-addchar-btns .ok{background:#07c160;color:#fff;}

.Nicole-set-h{font-size:18px;font-weight:500;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;color:#222;}

.Nicole-set-x{font-size:24px;cursor:pointer;color:#888;width:32px;height:32px;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.03);border-radius:50%;font-weight:300;}

.Nicole-set-r{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:.5px solid rgba(0,0,0,.03);font-size:13px;color:#555;font-weight:400;}

.Nicole-color-wrap{display:flex;align-items:center;gap:8px;}

.Nicole-hex-in{width:70px;height:30px;border:none;border-radius:8px;padding:0 6px;font-size:11px;font-family:monospace;outline:none;background:rgba(0,0,0,.03);color:#222;text-align:center;}

.Nicole-color-wrap input[type=color]{border:none;width:30px;height:30px;border-radius:8px;cursor:pointer;background:none;padding:0;}

.Nicole-bg-btn{padding:6px 12px;height:30px;border-radius:8px;border:none;background:#f2f2f7;cursor:pointer;font-size:12px;color:#333;outline:none;font-weight:500;transition:background .2s,color .2s;}

.Nicole-bg-btn.active{background:#222;color:#fff;}

.Nicole-mf{position:absolute;inset:0;background:rgba(0,0,0,.15);z-index:50;display:flex;flex-direction:column;justify-content:flex-end;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}

.Nicole-mf.show{opacity:1;pointer-events:auto;}

.Nicole-mbox{background:rgba(255,255,255,.98);height:75%;border-radius:28px 28px 0 0;display:flex;flex-direction:column;transform:translateY(100%);transition:transform .3s;overflow:hidden;}

.Nicole-mf.show .Nicole-mbox{transform:translateY(0);}

.Nicole-mh{display:flex;justify-content:space-between;align-items:center;padding:20px 24px 14px;font-weight:500;font-size:15px;color:#222;}

.Nicole-mc{width:28px;height:28px;background:rgba(0,0,0,.03);border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;color:#888;font-weight:300;}

.Nicole-act-btn{padding:18px;text-align:center;font-size:15px;font-weight:400;color:#222;cursor:pointer;}

.Nicole-act-space{height:8px;background:rgba(0,0,0,.02);}

.Nicole-act-btn:active{background:rgba(0,0,0,.03);}

.Nicole-cen{position:absolute;inset:0;background:rgba(0,0,0,.25);z-index:999;display:none;justify-content:center;align-items:center;opacity:0;transition:opacity .3s;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}

.Nicole-cen.show{display:flex;opacity:1;}

.Nicole-cen-box{background:rgba(250,250,250,.98);width:260px;border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:16px;transform:translateY(20px);transition:transform .3s;}

.Nicole-cen.show .Nicole-cen-box{transform:translateY(0);}

.Nicole-cen-box h4{text-align:center;font-size:15px;font-weight:500;color:#222;}

.Nicole-tf-grp{display:flex;align-items:baseline;border-bottom:1.5px solid rgba(0,0,0,.1);padding-bottom:6px;gap:8px;}

.Nicole-tf-grp input{border:none;font-size:26px;font-weight:400;width:100%;outline:none;background:transparent;color:#222;}

.Nicole-cen-inp,.Nicole-cen-box textarea{border:none;background:rgba(0,0,0,.03);padding:12px;border-radius:10px;font-size:13px;outline:none;resize:none;color:#222;width:100%;font-weight:400;}

.Nicole-cen-btns{display:flex;gap:12px;}

.Nicole-cen-btns button{flex:1;padding:12px;border-radius:12px;border:none;font-size:13px;font-weight:500;cursor:pointer;}

.Nicole-cen-btns .cc{background:rgba(0,0,0,.04);color:#55;} .Nicole-cen-btns .ok{background:#222;color:#fff;}

.Nicole-cen.w260 .Nicole-cen-box{width:280px;gap:12px;}

.Nicole-draw-canvas{border-radius:14px;background:#fff;touch-action:none;cursor:crosshair;display:block;margin:0 auto;border:.5px solid rgba(0,0,0,.03);}

.Nicole-draw-tools{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;margin:6px 0;background:rgba(0,0,0,.02);padding:8px 10px;border-radius:14px;}

.Nicole-draw-color{width:26px;height:26px;border-radius:8px;cursor:pointer;padding:0;background:transparent;flex-shrink:0;border:none;}

.Nicole-draw-range{flex:1;accent-color:#222;height:4px;}

.Nicole-draw-btn-icon{width:28px;height:28px;border-radius:8px;background:rgba(0,0,0,.03);display:flex;justify-content:center;align-items:center;cursor:pointer;color:#444;flex-shrink:0;transition:transform .1s,background .2s;}

.Nicole-draw-btn-icon:active{transform:scale(.9);}

.Nicole-draw-btn-icon svg{stroke:currentColor;fill:none;width:16px;height:16px;stroke-width:1.5;}

.Nicole-txt-zoom{position:absolute;inset:0;background:rgba(250,250,250,.9);z-index:1000;display:none;justify-content:center;align-items:center;opacity:0;transition:opacity .3s;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:20px;cursor:zoom-out;}

.Nicole-txt-zoom.show{display:flex;opacity:1;align-items:center;}

.Nicole-txt-zoom-in{width:100%;max-width:300px;max-height:80vh;overflow-y:auto;scrollbar-width:none;background:#fff;border-radius:20px!important;padding:28px;font-size:16px;color:#222;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;word-wrap:break-word;white-space:pre-wrap;font-weight:400;cursor:default;box-shadow:0 8px 30px rgba(0,0,0,.05);border:.5px solid rgba(0,0,0,.02);}

.Nicole-txt-zoom-in.txt-img-zoom{border:none!important;background:linear-gradient(135deg,var(--bub-l),var(--bub-r))!important;aspect-ratio:1;justify-content:center;border-radius:20px!important;padding:16px!important;}

.Nicole-txt-zoom-in.gift-zoom{justify-content:center;}

.Nicole-loc-wrap{flex:1;display:flex;flex-direction:column;align-items:center;position:relative;background:#fdfdfd;background-image:radial-gradient(rgba(0,0,0,.05) 1px,transparent 1px);background-size:20px 20px;border-radius:0 0 28px 28px;overflow:hidden;padding:24px 0;}

.Nicole-loc-dist{font-size:13px;color:#222;font-weight:500;margin-top:6px;padding:6px 14px;background:rgba(0,0,0,.03);border-radius:14px;}

.Nicole-radar{width:280px;height:280px;position:relative;margin:30px auto;display:flex;justify-content:center;align-items:center;}

.Nicole-radar-wave{position:absolute;width:100%;height:100%;border-radius:50%;background:radial-gradient(circle,rgba(0,0,0,.06) 0%,rgba(0,0,0,.02) 60%,transparent 80%);animation:Nicole-radar-pulse 3s ease-out infinite;opacity:0;}

.Nicole-radar-wave.w2{animation-delay:1.5s;width:80%;height:80%;}

.Nicole-anchor{position:absolute;display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:transform .2s cubic-bezier(.2,.8,.2,1);z-index:5;}

.Nicole-anchor:active{transform:scale(1.08);}

.Nicole-anchor.a1{top:25%;left:15%;}

.Nicole-anchor.a2{bottom:20%;right:15%;}

.Nicole-anchor-av{width:46px;height:46px;border-radius:50%;background-size:cover;position:relative;z-index:2;transition:border-radius .3s;border:1px solid rgba(255,255,255,.8);box-shadow:0 4px 10px rgba(0,0,0,.05);}

.Nicole-anchor-tip{position:absolute;top:-38px;background:rgba(255,255,255,.95);backdrop-filter:blur(16px);padding:8px 14px;border-radius:16px;font-size:12px;color:#222;font-weight:500;white-space:nowrap;opacity:0;pointer-events:none;transition:all .2s;z-index:10;transform:translateY(4px);box-shadow:0 2px 8px rgba(0,0,0,.05);border:.5px solid rgba(0,0,0,.02);}

.Nicole-anchor:hover .Nicole-anchor-tip{opacity:1;transform:translateY(0);}

.Nicole-loc-send{margin-top:auto;background:#222;color:#fff;border-radius:18px;padding:14px 36px;font-size:14px;font-weight:500;cursor:pointer;border:none;}

.Nicole-mu,.Nicole-cp,.Nicole-emo{flex:1;display:flex;flex-direction:column;padding:20px;gap:20px;overflow-y:auto;scrollbar-width:none;min-height:0;}

.Nicole-mu-stage{display:flex;justify-content:center;align-items:center;gap:16px;}

.Nicole-mu-face{width:64px;height:64px;border-radius:50%;background-size:cover;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}

.Nicole-mu-waves{display:flex;align-items:center;justify-content:center;gap:6px;height:36px;width:48px;}

.Nicole-mu-waves .Nicole-wave{background:rgba(0,0,0,.1);width:3px;height:4px;border-radius:2px;transition:height .3s;}

.Nicole-mu-waves.playing .Nicole-wave{background:#222;animation:Nicole-jp 1s ease-in-out infinite alternate;}

.Nicole-mu-waves.playing .Nicole-wave:nth-child(2){animation-delay:.3s}

.Nicole-mu-waves.playing .Nicole-wave:nth-child(3){animation-delay:.15s}

.Nicole-mu-time-disp{text-align:center;font-size:12px;color:#555;font-weight:500;background:rgba(0,0,0,.02);padding:6px 14px;border-radius:16px;margin:0 auto;border:.5px solid rgba(0,0,0,.02);}

.Nicole-mu-ctrl{display:flex;justify-content:center;align-items:center;gap:28px;margin-top:12px;}

.Nicole-mu-btn{width:48px;height:48px;border-radius:50%;background:transparent;display:flex;justify-content:center;align-items:center;cursor:pointer;border:none;transition:transform .2s;}

.Nicole-mu-btn:active{transform:scale(.9);}

.Nicole-mu-btn svg{width:26px;height:26px;stroke:#222;fill:none;stroke-width:1.2;}

.Nicole-mu-btn.main svg{width:34px;height:34px;fill:#222;stroke:none;}

.Nicole-mu-inp-wrap{display:flex;gap:10px;}

.Nicole-mu-inp,.Nicole-mu-name,.Nicole-mu-artist,.Nicole-mu-cover{flex:1;border-radius:12px;padding:12px 14px;font-size:13px;background:rgba(0,0,0,.02);outline:none;border:none;color:#222;font-weight:400;}

.Nicole-mu-add{padding:0 16px;border:none;border-radius:12px;background:#222;color:#fff;font-size:13px;font-weight:500;}

.Nicole-mu-invbtn{margin-top:auto;padding:14px;border-radius:16px;background:rgba(0,0,0,.03);color:#222;font-size:14px;font-weight:500;cursor:pointer;border:none;}

/* 竖向输入框 */
.Nicole-mu-inputs{display:flex;flex-direction:column;gap:8px;width:100%;}
.Nicole-mu-inputs .Nicole-mu-name,.Nicole-mu-inputs .Nicole-mu-artist,.Nicole-mu-inputs .Nicole-mu-cover{width:100%;box-sizing:border-box;}
.Nicole-mu-search-row{display:flex;gap:6px;width:100%;}
.Nicole-mu-search-row .Nicole-mu-inp{flex:1;min-width:0;}
.Nicole-mu-search{padding:0 12px;border:none;border-radius:12px;background:#555;color:#fff;font-size:12px;font-weight:500;cursor:pointer;flex-shrink:0;white-space:nowrap;}
.Nicole-mu-search:active{background:#333;}
.Nicole-mu-add{padding:0 14px;border:none;border-radius:12px;background:#222;color:#fff;font-size:12px;font-weight:500;cursor:pointer;flex-shrink:0;white-space:nowrap;}

/* 歌单栏 */
.Nicole-mu-playlist-bar{display:flex;gap:6px;align-items:center;width:100%;}
.Nicole-mu-playlist-select{flex:1;min-width:0;border-radius:10px;padding:8px 10px;font-size:12px;background:rgba(0,0,0,.03);border:none;outline:none;color:#222;font-weight:400;cursor:pointer;}
.Nicole-mu-playlist-add,.Nicole-mu-playlist-del{width:28px;height:28px;border:none;border-radius:8px;background:rgba(0,0,0,.05);color:#555;font-size:16px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;line-height:1;}
.Nicole-mu-playlist-add:active,.Nicole-mu-playlist-del:active{background:rgba(0,0,0,.1);}

/* 播放模式按钮 */
.Nicole-mu-btn.Nicole-jmu-mode{width:36px;height:36px;}
.Nicole-mu-btn.Nicole-jmu-mode svg{width:18px;height:18px;}
.Nicole-mu-btn.Nicole-jmu-danmu{width:36px;height:36px;opacity:.4;transition:opacity .2s;}
.Nicole-mu-btn.Nicole-jmu-danmu svg{width:18px;height:18px;}
.Nicole-mu-btn.Nicole-jmu-danmu.active{opacity:1;}
.Nicole-mu-btn.Nicole-jmu-danmu.active svg{stroke:#e91e63!important;}

/* 歌词弹幕容器 - 固定在酒馆聊天界面上方 */
.Nicole-danmu-container{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none!important;z-index:1000;overflow:hidden;}
.Nicole-danmu-container.hidden{display:none;}
/* ===== QQ音乐风格歌词模块 ===== */
.Nicole-lyric-module{position:fixed;top:120px;left:50%;transform:translateX(-50%);z-index:1001;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;cursor:pointer;user-select:none;-webkit-user-select:none;touch-action:none;transition:all .3s ease;max-width:80vw;}
.Nicole-lyric-module.hidden{display:none;}
/* 收起状态 - 只显示透明歌词，无模块包裹 */
.Nicole-lyric-module .lyric-mini{text-align:center;background:transparent;border:none;box-shadow:none;padding:0;backdrop-filter:none;-webkit-backdrop-filter:none;}
.Nicole-lyric-module .lyric-mini .lyric-current{font-size:20px;font-weight:600;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.6),0 0 20px rgba(0,0,0,.3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;letter-spacing:1px;}
.Nicole-lyric-module .lyric-mini .lyric-prev{font-size:13px;color:rgba(255,255,255,.5);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 4px rgba(0,0,0,.5);}
/* 展开状态 - 毛玻璃大面板，上下滚动歌词 */
.Nicole-lyric-module.expanded{width:380px;max-width:90vw;}
.Nicole-lyric-module.expanded .lyric-mini{display:none;}
.Nicole-lyric-module .lyric-panel{display:none;background:rgba(20,20,20,.75);backdrop-filter:blur(30px) saturate(180%);-webkit-backdrop-filter:blur(30px) saturate(180%);border-radius:24px;border:1px solid rgba(255,255,255,.12);box-shadow:0 20px 60px rgba(0,0,0,.5);overflow:hidden;}
.Nicole-lyric-module.expanded .lyric-panel{display:block;}
.Nicole-lyric-module .lyric-panel-hd{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.08);}
.Nicole-lyric-module .lyric-panel-title{font-size:13px;color:rgba(255,255,255,.6);display:flex;align-items:center;gap:6px;}
.Nicole-lyric-module .lyric-panel-title svg{width:14px;height:14px;fill:none;stroke:#4fc3f7;stroke-width:2;}
.Nicole-lyric-module .lyric-panel-actions{display:flex;gap:8px;}
.Nicole-lyric-module .lyric-action-btn{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s;border:none;color:rgba(255,255,255,.7);font-size:14px;line-height:1;}
.Nicole-lyric-module .lyric-action-btn:hover{background:rgba(255,255,255,.18);color:#fff;}
.Nicole-lyric-module .lyric-scroll{height:280px;overflow-y:auto;padding:20px 18px;scroll-behavior:smooth;}
.Nicole-lyric-module .lyric-scroll::-webkit-scrollbar{width:4px;}
.Nicole-lyric-module .lyric-scroll::-webkit-scrollbar-track{background:transparent;}
.Nicole-lyric-module .lyric-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:2px;}
.Nicole-lyric-module .lyric-line{font-size:15px;color:rgba(255,255,255,.35);text-align:center;line-height:2.2;padding:2px 0;transition:all .3s ease;white-space:pre-wrap;word-break:break-word;}
.Nicole-lyric-module .lyric-line.active{color:#fff;font-size:18px;font-weight:600;text-shadow:0 0 20px rgba(79,195,247,.4);transform:scale(1.02);}
.Nicole-lyric-module .lyric-line.near{color:rgba(255,255,255,.6);}
/* 空状态 */
.Nicole-lyric-module .lyric-empty{text-align:center;color:rgba(255,255,255,.3);font-size:13px;padding:60px 0;}
/* ===== QQ音乐风格歌词设置面板 ===== */
.Nicole-lyric-setting-panel{position:fixed;z-index:1002;width:280px;max-width:90vw;background:rgba(30,30,32,.92);backdrop-filter:blur(30px) saturate(180%);-webkit-backdrop-filter:blur(30px) saturate(180%);border-radius:16px;border:1px solid rgba(255,255,255,.1);box-shadow:0 20px 60px rgba(0,0,0,.5);overflow:hidden;opacity:0;transform:translateY(-10px) scale(.95);pointer-events:none;transition:all .25s cubic-bezier(.4,0,.2,1);font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;}
.Nicole-lyric-setting-panel.show{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}
.Nicole-lyric-setting-panel .lsp-hd{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08);}
.Nicole-lyric-setting-panel .lsp-title{font-size:15px;font-weight:600;color:#fff;letter-spacing:.3px;}
.Nicole-lyric-setting-panel .lsp-close{width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,.6);font-size:16px;line-height:1;transition:all .2s;}
.Nicole-lyric-setting-panel .lsp-close:hover{background:rgba(255,255,255,.2);color:#fff;}
.Nicole-lyric-setting-panel .lsp-body{padding:14px 16px;max-height:70vh;overflow-y:auto;}
.Nicole-lyric-setting-panel .lsp-body::-webkit-scrollbar{width:4px;}
.Nicole-lyric-setting-panel .lsp-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:2px;}
.Nicole-lyric-setting-panel .lsp-section{margin-bottom:16px;}
.Nicole-lyric-setting-panel .lsp-label{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:rgba(255,255,255,.6);margin-bottom:8px;font-weight:500;}
.Nicole-lyric-setting-panel .lsp-val{color:#4fc3f7;font-weight:600;font-size:12px;}
.Nicole-lyric-setting-panel .lsp-colors{display:flex;gap:10px;flex-wrap:wrap;}
.Nicole-lyric-setting-panel .lsp-color{width:28px;height:28px;border-radius:50%;cursor:pointer;transition:all .2s;border:2px solid transparent;box-shadow:0 2px 8px rgba(0,0,0,.3);}
.Nicole-lyric-setting-panel .lsp-color:hover{transform:scale(1.15);}
.Nicole-lyric-setting-panel .lsp-color.active{border-color:#fff;box-shadow:0 0 0 2px rgba(255,255,255,.3),0 2px 8px rgba(0,0,0,.3);}
.Nicole-lyric-setting-panel .lsp-slider{-webkit-appearance:none;width:100%;height:4px;background:rgba(255,255,255,.15);border-radius:2px;outline:none;cursor:pointer;}
.Nicole-lyric-setting-panel .lsp-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#4fc3f7;cursor:pointer;box-shadow:0 2px 6px rgba(79,195,247,.4);transition:transform .15s;}
.Nicole-lyric-setting-panel .lsp-slider::-webkit-slider-thumb:hover{transform:scale(1.2);}
.Nicole-lyric-setting-panel .lsp-switch-row{display:flex;justify-content:space-between;align-items:center;}
.Nicole-lyric-setting-panel .lsp-switch{width:44px;height:24px;border-radius:12px;background:rgba(255,255,255,.15);position:relative;cursor:pointer;transition:background .25s;}
.Nicole-lyric-setting-panel .lsp-switch.on{background:#4fc3f7;}
.Nicole-lyric-setting-panel .lsp-switch-dot{position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 2px 4px rgba(0,0,0,.3);transition:transform .25s cubic-bezier(.4,0,.2,1);}
.Nicole-lyric-setting-panel .lsp-switch.on .lsp-switch-dot{transform:translateX(20px);}
.Nicole-lyric-setting-panel .lsp-reset{width:100%;padding:10px;border-radius:10px;background:rgba(255,255,255,.06);border:none;color:rgba(255,255,255,.6);font-size:13px;cursor:pointer;transition:all .2s;font-family:inherit;margin-top:4px;}
.Nicole-lyric-setting-panel .lsp-reset:hover{background:rgba(255,255,255,.12);color:#fff;}
/* 单条弹幕 - 保留从右飘动样式（可选） */
.Nicole-danmu-item{position:absolute;white-space:nowrap;font-weight:600;color:#fff;text-shadow:1px 1px 2px rgba(0,0,0,.8),0 0 10px rgba(0,0,0,.5);letter-spacing:1px;pointer-events:none;animation:nicole-danmu-scroll linear forwards;will-change:transform;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;}
.Nicole-danmu-item.gradient{background:linear-gradient(90deg,#ff6b6b,#feca57,#48dbfb,#ff9ff3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-shadow:none;}
@keyframes nicole-danmu-scroll{from{transform:translateX(100vw);}to{transform:translateX(-100%);}}
/* 弹幕设置面板 - 模仿QQ视频弹幕设置，可拖动 */
.Nicole-danmu-panel{position:fixed;top:100px;right:20px;width:260px;background:rgba(20,20,20,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:14px;border:1px solid rgba(255,255,255,.1);z-index:2147483646;box-shadow:0 8px 32px rgba(0,0,0,.5);font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;color:#fff;overflow:hidden;transition:opacity .2s,transform .2s;}
.Nicole-danmu-panel.hidden{opacity:0;transform:scale(.9);pointer-events:none;}
.Nicole-danmu-panel-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;cursor:move;user-select:none;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);}
.Nicole-danmu-panel-title{font-size:14px;font-weight:600;display:flex;align-items:center;gap:8px;}
.Nicole-danmu-panel-title svg{width:16px;height:16px;fill:none;stroke:#4fc3f7;stroke-width:2;}
.Nicole-danmu-panel-close{width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;line-height:1;transition:background .2s;}
.Nicole-danmu-panel-close:hover{background:rgba(255,255,255,.2);}
.Nicole-danmu-panel-body{padding:14px;}
.Nicole-danmu-row{margin-bottom:14px;}
.Nicole-danmu-row:last-child{margin-bottom:0;}
.Nicole-danmu-label{font-size:12px;color:rgba(255,255,255,.6);margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;}
.Nicole-danmu-label span:last-child{color:#4fc3f7;font-weight:500;}
.Nicole-danmu-slider{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:3px;outline:none;cursor:pointer;}
.Nicole-danmu-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;border-radius:50%;background:#fff;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.3);border:2px solid #4fc3f7;transition:transform .15s;}
.Nicole-danmu-slider::-webkit-slider-thumb:hover{transform:scale(1.2);}
.Nicole-danmu-slider::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.3);border:2px solid #4fc3f7;}
.Nicole-danmu-color-r{background:linear-gradient(to right,#000,#ff0000);}
.Nicole-danmu-color-g{background:linear-gradient(to right,#000,#00ff00);}
.Nicole-danmu-color-b{background:linear-gradient(to right,#000,#0000ff);}
.Nicole-danmu-color-preview{width:100%;height:24px;border-radius:6px;margin-top:8px;border:1px solid rgba(255,255,255,.2);}
.Nicole-danmu-toggle{display:flex;align-items:center;justify-content:space-between;}
.Nicole-danmu-switch{position:relative;width:40px;height:22px;background:rgba(255,255,255,.15);border-radius:11px;cursor:pointer;transition:background .2s;}
.Nicole-danmu-switch.active{background:#4fc3f7;}
.Nicole-danmu-switch::after{content:'';position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.3);}
.Nicole-danmu-switch.active::after{transform:translateX(18px);}
.Nicole-danmu-reset{width:100%;padding:8px;border:none;border-radius:8px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);font-size:12px;cursor:pointer;transition:background .2s;}
.Nicole-danmu-reset:hover{background:rgba(255,255,255,.15);color:#fff;}

/* 歌曲列表项 - 竖向排列，歌手名在歌曲下方 */
.Nicole-mu-item{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:10px 14px;background:rgba(250,250,250,.85);border-radius:12px;font-size:13px;color:#444;cursor:pointer;transition:background .2s,transform .1s;border:1px solid rgba(0,0,0,.02);flex-shrink:0;gap:2px;position:relative;overflow:hidden;}
.Nicole-mu-item .mu-song-name{font-weight:500;color:#222;font-size:13px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.3;}
.Nicole-mu-item .mu-song-artist{font-size:11px;color:#888;font-weight:400;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.3;}
.Nicole-mu-item .jmudel{position:absolute;top:8px;right:10px;color:#bbb;font-size:16px;cursor:pointer;line-height:1;padding:2px 6px;border-radius:6px;}
.Nicole-mu-item .jmudel:hover{color:#666;background:rgba(0,0,0,.05);}
.Nicole-mu-item.active{background:#333!important;}
.Nicole-mu-item.active .mu-song-name{color:#fff!important;}
.Nicole-mu-item.active .mu-song-artist{color:rgba(255,255,255,.6)!important;}
.Nicole-mu-item.active .jmudel{color:rgba(255,255,255,.5)!important;}

.Nicole-emo-games{display:flex;gap:10px;padding:12px 20px;flex-shrink:0;align-items:center;}

.Nicole-emo-gamebtn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(0,0,0,.02);border-radius:14px;padding:10px 0;font-size:13px;color:#222;font-weight:500;cursor:pointer;transition:transform .1s,background .2s;border:.5px solid rgba(0,0,0,.02);}

.Nicole-emo-gamebtn:active{transform:scale(.95);background:rgba(0,0,0,.05);}

.Nicole-emo-gamebtn svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;}

.Nicole-emo-addbtn{width:36px;height:36px;flex-shrink:0;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.02);border-radius:12px;cursor:pointer;transition:transform .1s,background .2s;border:.5px solid rgba(0,0,0,.02);}

.Nicole-emo-addbtn:active{transform:scale(.9);background:rgba(0,0,0,.06);}

.Nicole-emo-addbtn svg{width:18px;height:18px;stroke:#222;stroke-width:1.5;fill:none;}

.Nicole-emo{display:grid;grid-template-columns:repeat(2,1fr);align-content:start;gap:12px;padding-top:12px;}

.Nicole-emo-card{background:rgba(0,0,0,.02);border-radius:16px;padding:8px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;transition:transform .1s;border:.5px solid rgba(0,0,0,.02);}

.Nicole-emo-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;pointer-events:none;border:none;}

.Nicole-emo-t{font-size:11px;color:#555;text-align:center;font-weight:400;}

.Nicole-cp-top{display:flex;flex-direction:column;align-items:center;gap:10px;}

.Nicole-cp-avs{display:flex;justify-content:center;align-items:center;}

.Nicole-cp-face{width:64px;height:64px;border-radius:50%;background-size:cover;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}

.Nicole-cp-face.Nicole-jcpf2{margin-left:-20px;position:relative;z-index:2;}

.Nicole-cp-id-group{font-size:14px;font-weight:500;color:#222;letter-spacing:.2px;display:flex;align-items:center;gap:8px;}

.Nicole-cp-rel{text-align:center;font-size:12px;color:#555;background:rgba(0,0,0,.02);border-radius:14px;padding:8px 16px;}

.Nicole-cp-sec{background:rgba(0,0,0,.02);border-radius:20px;padding:16px;transition:background .3s;border:.5px solid rgba(0,0,0,.02);}

.Nicole-cp-h{font-size:13px;font-weight:500;color:#222;margin-bottom:14px;display:flex;align-items:center;gap:8px;}

.Nicole-sign-mod{display:flex;flex-direction:column;gap:10px;background:rgba(255,255,255,.8);padding:14px;border-radius:16px;margin-bottom:12px;}

.Nicole-sign-hd{display:flex;align-items:center;gap:10px;}

.Nicole-sign-bd{font-size:12px;color:#444;line-height:1.5;padding-left:42px;word-wrap:break-word;font-weight:300;}

.Nicole-sign-act{display:flex;align-items:center;background:rgba(0,0,0,.03);border-radius:18px;padding:4px;margin-top:10px;}

.Nicole-jusignin{flex:1;border:none;background:transparent;padding:8px 12px;font-size:12px;outline:none;color:#222;min-width:0;font-weight:400;}

.Nicole-jusignsave{height:30px;padding:0 16px;border:none;border-radius:15px;background:#222;color:#fff;font-size:12px;font-weight:500;cursor:pointer;flex-shrink:0;}

.Nicole-signdel{cursor:pointer;color:#aaa;margin-left:auto;padding:4px;transition:color .2s;}

.Nicole-signdel:active{color:#666;}

.Nicole-cp-things,.Nicole-cp-days{display:flex;flex-direction:column;gap:8px;}

.Nicole-cp-thing{display:flex;align-items:center;gap:10px;font-size:13px;color:#333;padding:10px 14px;background:rgba(255,255,255,.8);border-radius:12px;font-weight:400;}

.Nicole-cp-thing .dot{width:16px;height:16px;border-radius:50%;border:1.5px solid #ccc;flex-shrink:0;cursor:pointer;}

.Nicole-cp-thing.done{opacity:.4;} .Nicole-cp-thing.done .dot{background:#ccc;border-color:#ccc;}

.Nicole-cp-addrow{display:flex;align-items:center;background:rgba(0,0,0,.02);border-radius:14px;padding:6px;margin-top:12px;gap:6px;flex-wrap:wrap;border:.5px solid rgba(0,0,0,.03);}

.Nicole-cp-addrow input,.Nicole-cp-addrow select{flex:1;min-width:60px;border:none;background:#fff;border-radius:10px;padding:8px 10px;font-size:12px;outline:none;color:#222;}

.Nicole-cp-addrow button{height:32px;padding:0 16px;border:none;border-radius:10px;background:#222;color:#fff;font-size:12px;font-weight:500;cursor:pointer;}

.Nicole-cp-day{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,.8);border-radius:14px;}

.Nicole-cp-day span{font-size:14px;font-weight:500;color:#222;max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

.Nicole-cp-day b{color:#555;font-size:11px;font-weight:400;background:rgba(0,0,0,.03);padding:6px 12px;border-radius:20px;}

.Nicole-cp-albums{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:6px 0;}

.Nicole-cp-album-card{position:relative;background:rgba(255,255,255,.8);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;cursor:pointer;border:.5px solid rgba(0,0,0,.03);}

.Nicole-cp-album-img{width:100%;aspect-ratio:1;background-size:cover;background-position:center;border:none;}

.Nicole-cp-album-txt{padding:8px 10px;font-size:11px;color:#333;font-weight:400;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#fff;}

.Nicole-cp-album-txt-only{padding:14px;font-size:13px;color:#222;text-align:center;display:flex;align-items:center;justify-content:center;height:100%;aspect-ratio:1;background:#fff;font-weight:400;word-wrap:break-word;white-space:pre-wrap;overflow-y:auto;scrollbar-width:none;line-height:1.5;border:none;}

.Nicole-cp-album-who{position:absolute;top:6px;right:6px;background:rgba(0,0,0,.2);color:#fff;font-size:10px;padding:4px 8px;border-radius:10px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);pointer-events:none;font-weight:300;}

.Nicole-pyq-panel{position:absolute;inset:0;background:#fdfdfd;z-index:60;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s cubic-bezier(.2,.8,.2,1);}

.Nicole-pyq-panel.show{transform:translateX(0);}

.Nicole-pyq-hd{padding:24px 20px 12px;display:flex;align-items:center;justify-content:space-between;background:rgba(253,253,253,.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:26;border-bottom:.5px solid rgba(0,0,0,.03);}

.Nicole-pyq-back{cursor:pointer;display:flex;align-items:center;color:#222;}

.Nicole-pyq-back svg{width:24px;height:24px;stroke:currentColor;stroke-width:1.5;fill:none;}

.Nicole-pyq-addbtn{width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.03);display:flex;justify-content:center;align-items:center;cursor:pointer;}

.Nicole-pyq-addbtn svg{width:18px;height:18px;stroke:#222;stroke-width:1.5;fill:none;}

.Nicole-pyq-scroll{flex:1;overflow-y:auto;scrollbar-width:none;padding-bottom:20px;}

.Nicole-pyq-cover{height:200px;background-color:#f0f0f0;background-size:cover;background-position:center;position:relative;cursor:pointer;}

.Nicole-pyq-user{position:absolute;right:20px;bottom:-24px;display:flex;align-items:flex-end;gap:14px;}

.Nicole-pyq-uname{font-size:16px;font-weight:600;color:#fff;text-shadow:0 1px 6px rgba(0,0,0,.4);margin-bottom:28px;letter-spacing:.5px;}

.Nicole-pyq-uav{width:72px;height:72px;border-radius:16px;background-size:cover;cursor:pointer;transition:border-radius .3s;border:1px solid rgba(255,255,255,.8);}

.Nicole-pyq-list{padding:48px 20px 20px;display:flex;flex-direction:column;gap:24px;}

.Nicole-pyq-item{display:flex;gap:12px;padding-bottom:20px;position:relative;border-bottom:.5px solid rgba(0,0,0,.03);}

.Nicole-pyq-delbtn{position:absolute;right:0;top:0;padding:6px;color:#ccc;cursor:pointer;transition:color .2s;}

.Nicole-pyq-delbtn:active{color:#888;}

.Nicole-pyq-delbtn svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;}

.Nicole-pyq-iav{width:44px;height:44px;border-radius:12px;background-size:cover;flex-shrink:0;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.03);}

.Nicole-pyq-ict{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px;}

.Nicole-pyq-inm{font-size:14px;font-weight:500;color:#222;letter-spacing:.2px;}

.Nicole-pyq-itxt{font-size:13px;color:#444;line-height:1.6;white-space:pre-wrap;word-break:break-word;font-weight:300;}

.Nicole-pyq-iimg{max-width:80%;border-radius:12px;margin-top:4px;display:block;border:.5px solid rgba(0,0,0,.03);}

.Nicole-pyq-txtimg{display:flex!important;justify-content:center!important;align-items:center!important;width:130px!important;aspect-ratio:1!important;background:rgba(0,0,0,.02)!important;border-radius:16px!important;padding:14px!important;font-size:14px!important;font-weight:400!important;color:#222!important;text-align:center!important;word-wrap:break-word!important;white-space:pre-wrap!important;line-height:1.5!important;cursor:pointer!important;overflow:hidden!important;margin-top:4px;border:.5px solid rgba(0,0,0,.03)!important;box-shadow:none!important;}

.Nicole-pyq-ibot{display:flex;justify-content:space-between;align-items:center;margin-top:6px;font-size:11px;color:#999;font-weight:300;}

.Nicole-pyq-iacts{display:flex;gap:16px;}

.Nicole-pyq-btn{display:flex;align-items:center;gap:4px;cursor:pointer;color:#888;transition:color .2s;}

.Nicole-pyq-btn:active{color:#222;}

.Nicole-pyq-btn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.5;}

.Nicole-pyq-ints{background:rgba(0,0,0,.02);border-radius:12px;margin-top:10px;font-size:12px;color:#444;border:.5px solid rgba(0,0,0,.02);}

.Nicole-pyq-likes{padding:8px 12px;display:flex;align-items:center;gap:8px;color:#222;font-weight:500;border:none;}

.Nicole-pyq-likes svg{width:14px;height:14px;fill:currentColor;}

.Nicole-pyq-coms{padding:8px 12px;display:flex;flex-direction:column;gap:6px;border-top:.5px solid rgba(0,0,0,.03);}

.Nicole-pyq-com{cursor:pointer;transition:opacity .2s;font-weight:300;}

.Nicole-pyq-com:active{opacity:.6;}

.Nicole-pyq-com span{font-weight:500;color:#222;}
#nicole-float{position:fixed;bottom:100px;right:20px;z-index:2147483000!important;pointer-events:auto!important;touch-action:none!important;-webkit-user-select:none!important;user-select:none!important;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;}
#nicole-toggle-btn{width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 4px 16px rgba(0,0,0,.15);display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .2s,box-shadow .2s;border:1px solid rgba(0,0,0,.05);}
#nicole-toggle-btn:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(0,0,0,.2);}
#nicole-toggle-btn:active{transform:scale(.95);}
#nicole-toggle-btn svg{width:24px;height:24px;stroke:#333;fill:none;stroke-width:1.5;}
#nicole-phone-panel{position:fixed!important;bottom:160px!important;right:20px!important;left:auto!important;top:auto!important;width:var(--nc-phone-w,360px);height:var(--nc-phone-h,680px);max-height:85vh;display:none;animation:nicole-fade-in .3s ease;background:transparent!important;z-index:2147483001!important;transform:none!important;pointer-events:none!important;touch-action:none!important;-webkit-user-select:none!important;user-select:none!important;}
#nicole-phone-panel.show{display:block;pointer-events:auto!important;}
@keyframes nicole-fade-in{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}

/* ============ 移动端适配 ============ */
@media (max-width:768px){
    #nicole-float{position:fixed !important;left:auto !important;top:auto !important;bottom:100px !important;right:20px !important;width:38px !important;height:38px !important;z-index:2147483000!important;pointer-events:none !important;}
    #nicole-toggle-btn{width:38px;height:38px;pointer-events:auto !important;}
    #nicole-toggle-btn svg{width:18px;height:18px;}
    #nicole-phone-panel{
    position:fixed !important;
    top:8px !important;
    left:50% !important;
    transform:translateX(-50%) !important;
    width:324px !important;
    height:459px !important;
    max-width:none !important;
    max-height:none !important;
    bottom:auto !important;
    right:auto !important;
    border-radius:12px;
    overflow:hidden;
    box-shadow:none;
    background: transparent;
    /* 所有默认隐藏的绝对定位弹窗强制不拦截点击，只在show时恢复 */
    .Nicole-call:not(.show),.Nicole-set:not(.show),.Nicole-pyq-panel:not(.show),.Nicole-sys-app:not(.show),.Nicole-home-screen:not(.show),.Nicole-chatlist-screen:not(.show),.Nicole-txt-zoom:not(.show),.Nicole-mf:not(.show),.Nicole-cen:not(.show),.Nicole-addchar-modal:not(.show){pointer-events:none!important;}
    .Nicole-chat,.Nicole-ft{pointer-events:auto!important;position:relative;z-index:10!important;}
}
    #nicole-phone-panel.show{display:block;}
    /* 面板容器不拦截穿透点击，内部元素恢复交互 */
    #nicole-phone-panel{pointer-events:none!important;}
    #nicole-phone-panel.show{pointer-events:auto!important;}
    #nicole-phone-panel *{pointer-events:auto!important;}
    /* ===== 整体缩放方案：用zoom替代transform:scale，zoom会同时缩放布局和点击区域 ===== */
    .Nicole-stage{width:360px!important;height:510px!important;margin:0!important;max-width:none!important;zoom:0.9!important;transform:none!important;}
    .Nicole-phone{height:100%!important;max-height:100%!important;}
    /* phone-wrap保持原始样式，不覆盖，由stage整体缩放 */
    /* 移动端全面禁用backdrop-filter，避免GPU过载导致滚动卡顿 */
    .Nicole-stage *,.Nicole-au,.Nicole-bub,.Nicole-call,.Nicole-mbox,.Nicole-set,.Nicole-mf,.Nicole-stage,.Nicole-phone-wrap,.Nicole-sticky-note,.Nicole-sticky-tape,.Nicole-dock,.Nicole-sys-app-hd,.Nicole-phone-tabbar,.Nicole-hd,.Nicole-hd-pull,.Nicole-txt-img,.Nicole-tf,.Nicole-link-card,.Nicole-gift-card,.Nicole-loc-card,.Nicole-food-card,.Nicole-cp-qacard,.Nicole-ft,.Nicole-reply-bar,.Nicole-cb,.Nicole-call-inrow,.Nicole-music-share-card{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}
}
@media (max-width:480px){
    #nicole-float{bottom:calc(12px + env(safe-area-inset-bottom,0px));right:10px;z-index:999999!important;}
    #nicole-toggle-btn{width:38px;height:38px;}
    #nicole-toggle-btn svg{width:18px;height:18px;}
}
`;

/* ============ HTML TEMPLATE ============ */
var HTML = `<div class="Nicole-stage"><div class="Nicole-phone-wrap" id="Nc-Phone-Wrapper"><div class="Nicole-phone"><div class="Nicole-home-screen Nicole-jhome"><div class="Nicole-ios-statusbar"><div class="Nicole-jhome-time">12:00</div><div class="Nicole-ios-statusbar-right"><svg viewBox="0 0 24 24"><path d="M12 20h2V10h-2v10zm-4 0h2v-6H8v6zm8-14v14h2V6h-2zM4 20h2v-3H4v3z"/></svg><svg viewBox="0 0 24 24"><path d="M12 3c-4.8 0-9.1 1.9-12.3 5l1.4 1.4C4.1 6.5 7.9 4.8 12 4.8s7.9 1.7 10.9 4.6l1.4-1.4C21.1 4.9 16.8 3 12 3zm0 5.5c-3.2 0-6.2 1.2-8.5 3.3l1.4 1.4c1.9-1.7 4.4-2.7 7.1-2.7s5.2 1 7.1 2.7l1.4-1.4C18.2 9.7 15.2 8.5 12 8.5zm0 5c-1.6 0-3.1.6-4.2 1.6l1.4 1.4c.8-.7 1.8-1 2.8-1s2 .3 2.8 1l1.4-1.4c-1.1-1-2.6-1.6-4.2-1.6zm0 4.5c-.8 0-1.5.7-1.5 1.5S11.2 21 12 21s1.5-.7 1.5-1.5S12.8 18 12 18z"/></svg><div class="Nicole-ios-battery"><div class="Nicole-ios-battery-level"></div></div></div></div><div class="Nicole-mp3-player Nicole-jmp3"><div class="Nicole-mp3-main"><div class="Nicole-mp3-info"><div class="Nicole-mp3-title" id="mp3-title">未在播放</div><div class="Nicole-mp3-artist" id="mp3-artist">点击播放按钮开始</div></div><div class="Nicole-mp3-progress" id="mp3-progress"><div class="Nicole-mp3-bar" id="mp3-bar"></div><div class="Nicole-mp3-dot" id="mp3-dot"></div></div><div class="Nicole-mp3-time"><span id="mp3-cur">0:00</span><span id="mp3-total">0:00</span></div></div><div class="Nicole-mp3-ctrl"><button class="Nicole-mp3-btn" id="mp3-prev"><svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg></button><button class="Nicole-mp3-btn play" id="mp3-play"><svg viewBox="0 0 24 24" id="mp3-play-icon"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg></button><button class="Nicole-mp3-btn" id="mp3-next"><svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg></button><button class="Nicole-mp3-btn Nicole-mp3-danmu Nicole-jmp3-danmu" id="mp3-danmu" title="歌词模块"><svg viewBox="0 0 24 24"><path d="M3 6h18v10H7l-4 4V6z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="10" x2="17" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="13" x2="13" y2="13" stroke="currentColor" stroke-width="1.5"/></svg></button></div></div><div class="Nicole-home-apps"><div class="Nicole-home-app" id="app-couple" title="情侣问答"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div><div class="Nicole-home-app" id="app-memo" title="备忘录"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="13" y2="17"></line></svg></div><div class="Nicole-home-app" id="app-gallery" title="相册"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div><div class="Nicole-home-app" id="app-douyin" title="抖音"><svg viewBox="0 0 24 24"><path d="M9 3v12a3 3 0 1 1-3-3"></path><path d="M9 3c0 3 2 5 5 5v3c-3 0-5-2-5-5"></path><path d="M14 3v5c3 0 5 2 5 5"></path></svg></div><div class="Nicole-home-app" id="app-ins" title="Instagram"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="#333" stroke="none"></circle></svg></div><div class="Nicole-home-app" id="app-weibo" title="微博"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="14" rx="7" ry="4.5"></ellipse><circle cx="10" cy="13.5" r="1.2" fill="#333" stroke="none"></circle><path d="M16 5c1.5 1 2 2.5 1.5 4"></path><path d="M18 3c2 1.5 3 4 1.5 6.5"></path></svg></div></div><div class="Nicole-calendar Nicole-jcal"><div class="Nicole-cal-hd"><div class="Nicole-cal-navbtn Nicole-jcal-prev">‹</div><div class="Nicole-cal-title Nicole-jcal-title" title="点击输入日期">2026年8月</div><input type="date" class="Nicole-cal-dateinput Nicole-jcal-dateinput" style="display:none;"><div class="Nicole-cal-navbtn Nicole-jcal-next">›</div></div><div class="Nicole-cal-weekdays"><div class="Nicole-cal-wd">日</div><div class="Nicole-cal-wd">一</div><div class="Nicole-cal-wd">二</div><div class="Nicole-cal-wd">三</div><div class="Nicole-cal-wd">四</div><div class="Nicole-cal-wd">五</div><div class="Nicole-cal-wd">六</div></div><div class="Nicole-cal-days Nicole-jcal-days"></div><div class="Nicole-cal-foot Nicole-jcal-foot">点击日期设置</div></div><div class="Nicole-dock"><div class="Nicole-dock-icon" id="app-wechat"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div><div class="Nicole-dock-icon Nicole-jdock-collapse" title="收起手机"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" stroke-width="2"/><polyline points="12 17 7 12 12 7" fill="none" stroke-width="2"/></svg></div><div class="Nicole-dock-icon" id="app-phone"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div></div></div><div class="Nicole-chatlist-screen Nicole-jchatlist-screen"><div class="Nicole-chatlist-hd"><span class="back Nicole-jchatlist-back"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></span>聊天列表<span class="add Nicole-jchatlist-add"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span></div><div class="Nicole-chatlist-body Nicole-jchatlist-body"></div></div><div class="Nicole-addchar-modal Nicole-jaddchar-modal"><div class="Nicole-addchar-box"><h4>添加聊天人物</h4><input type="text" class="Nicole-jaddchar-input" placeholder="输入角色名字（如：沈又青）"><div class="Nicole-addchar-btns"><button class="cancel Nicole-jaddchar-cancel">取消</button><button class="ok Nicole-jaddchar-ok">添加</button></div></div></div><div class="Nicole-addchar-modal Nicole-jchatlist-addmenu"><div class="Nicole-addchar-box"><h4>选择操作</h4><div style="display:flex;flex-direction:column;gap:10px;"><button class="ok Nicole-jaddmenu-addchar" style="width:100%;padding:10px;border:none;border-radius:8px;background:#07c160;color:#fff;font-size:14px;cursor:pointer;">添加联系人</button><button class="ok Nicole-jaddmenu-addgroup" style="width:100%;padding:10px;border:none;border-radius:8px;background:#576b95;color:#fff;font-size:14px;cursor:pointer;">创建群聊</button><button class="cancel Nicole-jaddmenu-cancel" style="width:100%;padding:10px;border:none;border-radius:8px;background:#f5f5f5;color:#333;font-size:14px;cursor:pointer;">取消</button></div></div></div><div class="Nicole-addchar-modal Nicole-jaddgroup-modal"><div class="Nicole-addchar-box"><h4>创建群聊</h4><input type="text" class="Nicole-jaddgroup-name" placeholder="群聊名称（如：快乐星球）"><div style="font-size:12px;color:#666;margin:10px 0 6px;text-align:left;">选择群成员（自动包含你和当前角色）</div><div class="Nicole-jaddgroup-members" style="max-height:180px;overflow-y:auto;border:1px solid #eee;border-radius:8px;padding:8px;"></div><div class="Nicole-addchar-btns"><button class="cancel Nicole-jaddgroup-cancel">取消</button><button class="ok Nicole-jaddgroup-ok">创建</button></div></div></div><div class="Nicole-sys-app Nicole-japp-panel"><div class="Nicole-sys-app-hd"><div class="Nicole-japp-back" style="cursor:pointer;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div><span class="Nicole-japp-title" style="flex:1;text-align:center;padding-right:24px;">电话</span></div><div class="Nicole-sys-app-body Nicole-japp-body"><div class="Nicole-phone-app-container"><div class="Nicole-phone-content" id="phone-content"></div><div class="Nicole-phone-tabbar"><div class="Nicole-ptab active" data-target="recents"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>最近通话</div><div class="Nicole-ptab" data-target="contacts"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>联系人</div><div class="Nicole-ptab" data-target="dialpad"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>设置</div></div></div></div></div><div class="Nicole-app-panel Nicole-japp2-panel"><div class="Nicole-app-hd"><div class="Nicole-app-back Nicole-japp2-back" style="cursor:pointer;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div><span class="Nicole-app-title Nicole-japp2-title"></span><div style="width:20px;"></div></div><div class="Nicole-app-body Nicole-japp2-body"></div></div><div class="Nicole-content-layer Nicole-root"><div class="Nicole-bg Nicole-jbg"></div><div class="Nicole-call Nicole-jcall state-out"><div class="Nicole-call-mini-hint"></div><div class="Nicole-call-vbg Nicole-bind-lav-bg"></div><div class="Nicole-call-pip Nicole-bind-rav-bg"></div><div class="Nicole-call-mini-top Nicole-jcall-mini-top"><svg viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg></div><div class="Nicole-call-ct"><div class="Nicole-call-avs"><div class="Nicole-call-av Nicole-jcall-lav Nicole-bind-lav"></div><div class="Nicole-call-av Nicole-jcall-rav Nicole-bind-rav"></div></div><div class="Nicole-call-nm Nicole-jcall-nm Nicole-bind-lnm"></div><div class="Nicole-call-timer Nicole-jcall-timer">00:00</div><div class="Nicole-call-st Nicole-jcall-st">正在呼叫...</div><div class="Nicole-call-bubs Nicole-jcall-bubs"></div><div class="Nicole-call-ft"><div class="Nicole-call-btns btns-in"><div class="Nicole-call-btn hangup Nicole-jcall-reject"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><div class="Nicole-call-btn answer Nicole-jcall-answer"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div></div><div class="Nicole-call-btns btns-out"><div class="Nicole-call-btn cancel Nicole-jcall-cancel"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div></div><div class="Nicole-call-inrow"><div class="Nicole-call-btn hangup mini Nicole-jcall-end" title="挂断"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><input type="text" class="Nicole-call-in Nicole-jcall-in" placeholder="发送实时消息..."><button class="Nicole-call-send Nicole-jcall-send">发送</button></div></div></div></div><div class="Nicole-hd Nicole-jhd"><div class="Nicole-notch"></div><div class="Nicole-hd-back Nicole-jhd-back" title="返回主界面"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></div><div class="Nicole-hd-ph" style="display:none;"></div><div class="Nicole-hd-mid"><div class="Nicole-group-name Nicole-bind-gname"></div><div class="Nicole-ubox Nicole-jpat-l"><div class="Nicole-uav Nicole-bind-lav" title="点击修改拍一拍"></div><div class="Nicole-uname Nicole-bind-lnm" title="点击修改对方备注"></div></div><div class="Nicole-waves"><span class="Nicole-wave"></span><span class="Nicole-wave"></span><span class="Nicole-wave"></span><span class="Nicole-wave"></span><span class="Nicole-wave"></span><span class="Nicole-wave"></span></div><div class="Nicole-ubox Nicole-jpat-r"><div class="Nicole-uav Nicole-bind-rav" title="点击修改拍一拍"></div><div class="Nicole-uname Nicole-bind-rnm" title="点击修改自己备注"></div></div></div><div class="Nicole-icons-rt"><div class="Nicole-icbtn Nicole-jcollapse" title="收起手机" style="cursor:pointer;padding:4px;"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg></div><div class="Nicole-icbtn pyq Nicole-jpyqbtn" title="朋友圈"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div class="Nicole-icbtn Nicole-jset-open" title="设置"><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="19" r="2.5"/></svg></div></div><div class="Nicole-hd-pull Nicole-jhd-toggle"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div><div class="Nicole-chat Nicole-jchat"></div><div class="Nicole-group-setting Nicole-jgroup-setting"><div class="Nicole-group-setting-hd"><div class="Nicole-group-setting-back Nicole-jgroup-setting-back">‹</div><div class="Nicole-group-setting-title">群聊信息</div><div style="width:20px;"></div></div><div class="Nicole-group-setting-body"><div class="Nicole-group-section"><div class="Nicole-group-section-title">群成员</div><div class="Nicole-group-members-list Nicole-jgroup-members"></div><div class="Nicole-group-add-btn Nicole-jgroup-add-member"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>添加成员</div></div><div class="Nicole-group-section"><div class="Nicole-group-info-row"><div class="Nicole-group-info-label">群聊名称</div><div class="Nicole-group-info-value Nicole-jgroup-name-display"></div></div><div class="Nicole-group-info-row"><div class="Nicole-group-info-label">群成员数</div><div class="Nicole-group-info-value Nicole-jgroup-count-display"></div></div></div><button class="Nicole-group-dismiss-btn Nicole-jgroup-dismiss">退出并删除群聊</button></div></div><div class="Nicole-pyq-panel Nicole-jpyqpanel"><div class="Nicole-pyq-hd"><div class="Nicole-pyq-back Nicole-jpyqback" title="返回"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg></div><div class="Nicole-pyq-addbtn Nicole-jpyqadd"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div></div><div class="Nicole-pyq-scroll"><div class="Nicole-pyq-cover Nicole-jpyq-cover" title="点击更换背景"><div class="Nicole-pyq-user"><div class="Nicole-pyq-uname Nicole-bind-rnm"></div><div class="Nicole-pyq-uav Nicole-jpyq-uav" title="点击更换头像"></div></div></div><div class="Nicole-pyq-list Nicole-jpyqlist"></div></div></div><div class="Nicole-txt-zoom Nicole-jtxtzoom"><div class="Nicole-txt-zoom-in Nicole-jtxtzoomin"></div></div>
<div class="Nicole-set Nicole-jset"><div class="Nicole-set-h">视觉控制台<span class="Nicole-set-x Nicole-jset-close">&times;</span></div><div class="Nicole-set-r"><label>左侧名称</label><div class="Nicole-color-wrap"><input type="text" class="Nicole-hex-in Nicole-jset-lnm" placeholder="输入名称" style="width:100px;"></div></div><div class="Nicole-set-r"><label>右侧名称</label><div class="Nicole-color-wrap"><input type="text" class="Nicole-hex-in Nicole-jset-rnm" placeholder="输入名称" style="width:100px;"></div></div><div class="Nicole-set-r"><label>聊天记录</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jclear-chat" style="background:#ff6b6b;color:#fff;border:none;">清空当前聊天</button></div></div><div class="Nicole-set-r"><label>手机宽度</label><div class="Nicole-color-wrap"><input type="number" class="Nicole-hex-in Nicole-jset-phone-w" placeholder="360" style="width:80px;" min="240" max="500"><span style="font-size:11px;color:#999;">px</span></div></div><div class="Nicole-set-r"><label>手机高度</label><div class="Nicole-color-wrap"><input type="number" class="Nicole-hex-in Nicole-jset-phone-h" placeholder="680" style="width:80px;" min="400" max="900"><span style="font-size:11px;color:#999;">px</span></div></div><div class="Nicole-set-r"><label>拉黑拦截控制</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jblk-l" title="右侧拉黑左侧，左侧发出的消息带叹号">右侧拉黑左侧</button><button class="Nicole-bg-btn Nicole-jblk-r" title="左侧拉黑右侧，右侧发出的消息带叹号">左侧拉黑右侧</button></div></div><div class="Nicole-set-r"><label>左侧头像（角色）</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jav-l-upload">上传头像</button><button class="Nicole-bg-btn Nicole-jav-l-clear">恢复默认</button></div></div><div class="Nicole-set-r"><label>右侧头像（我）</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jav-r-upload">上传头像</button><button class="Nicole-bg-btn Nicole-jav-r-clear">恢复默认</button></div></div><div class="Nicole-set-r"><label>主页背景</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jbg-home-upload">上传/更换</button><button class="Nicole-bg-btn Nicole-jbg-home-clear">恢复默认</button></div></div><div class="Nicole-set-r"><label>聊天背景</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jbg-chat-upload">上传/更换</button><button class="Nicole-bg-btn Nicole-jbg-chat-clear">恢复默认</button></div></div><div class="Nicole-set-r"><label>头像形状</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jav-rnd active">圆形</button><button class="Nicole-bg-btn Nicole-jav-sq">方形</button></div></div><div class="Nicole-set-r"><label>质感风格</label><div class="Nicole-color-wrap"><button class="Nicole-bg-btn Nicole-jglass-glass active">毛玻璃</button><button class="Nicole-bg-btn Nicole-jglass-solid">纯实色</button></div></div><div class="Nicole-set-r"><label>手机外壳</label><div class="Nicole-color-wrap"><input type="text" id="Nc-wrap-txt" class="Nicole-hex-in"><input type="color" id="Nc-wrap"></div></div><div class="Nicole-set-r"><label>顶部栏背景</label><div class="Nicole-color-wrap"><input type="text" id="Nc-hdr-txt" class="Nicole-hex-in"><input type="color" id="Nc-hdr"></div></div><div class="Nicole-set-r"><label>顶部下拉键</label><div class="Nicole-color-wrap"><input type="text" id="Nc-pull-txt" class="Nicole-hex-in"><input type="color" id="Nc-pull"></div></div><div class="Nicole-set-r"><label>波浪呼吸条</label><div class="Nicole-color-wrap"><input type="text" id="Nc-wv-txt" class="Nicole-hex-in"><input type="color" id="Nc-wv"></div></div><div class="Nicole-set-r"><label>交互卡片底色</label><div class="Nicole-color-wrap"><input type="text" id="Nc-card-txt" class="Nicole-hex-in"><input type="color" id="Nc-card"></div></div><div class="Nicole-set-r"><label>底部输入区</label><div class="Nicole-color-wrap"><input type="text" id="Nc-ftr-txt" class="Nicole-hex-in"><input type="color" id="Nc-ftr"></div></div><div class="Nicole-set-r"><label>我方气泡</label><div class="Nicole-color-wrap"><input type="text" id="Nc-bub-txt" class="Nicole-hex-in"><input type="color" id="Nc-bub"></div></div><div class="Nicole-set-r"><label>对方气泡</label><div class="Nicole-color-wrap"><input type="text" id="Nc-bubl-txt" class="Nicole-hex-in"><input type="color" id="Nc-bubl"></div></div><div class="Nicole-set-r"><label>气泡文字</label><div class="Nicole-color-wrap"><input type="text" id="Nc-tm-txt" class="Nicole-hex-in"><input type="color" id="Nc-tm"></div></div><div class="Nicole-set-r"><label>交互卡片字</label><div class="Nicole-color-wrap"><input type="text" id="Nc-cdt-txt" class="Nicole-hex-in"><input type="color" id="Nc-cdt"></div></div><div class="Nicole-set-r"><label>交互卡片图标</label><div class="Nicole-color-wrap"><input type="text" id="Nc-cic-txt" class="Nicole-hex-in"><input type="color" id="Nc-cic"></div></div><div class="Nicole-set-r"><label>顶部栏文字</label><div class="Nicole-color-wrap"><input type="text" id="Nc-hdt-txt" class="Nicole-hex-in"><input type="color" id="Nc-hdt"></div></div><div class="Nicole-set-r"><label>顶部栏图标</label><div class="Nicole-color-wrap"><input type="text" id="Nc-hdi-txt" class="Nicole-hex-in"><input type="color" id="Nc-hdi"></div></div><div class="Nicole-set-r"><label>系统提示字</label><div class="Nicole-color-wrap"><input type="text" id="Nc-sys-txt" class="Nicole-hex-in"><input type="color" id="Nc-sys"></div></div><div class="Nicole-set-r"><label>通话左气泡</label><div class="Nicole-color-wrap"><input type="text" id="Nc-cbubl-txt" class="Nicole-hex-in"><input type="color" id="Nc-cbubl"></div></div><div class="Nicole-set-r"><label>通话右气泡</label><div class="Nicole-color-wrap"><input type="text" id="Nc-cbub-txt" class="Nicole-hex-in"><input type="color" id="Nc-cbub"></div></div><div class="Nicole-set-r"><label>通话气泡字</label><div class="Nicole-color-wrap"><input type="text" id="Nc-cbtxt-txt" class="Nicole-hex-in"><input type="color" id="Nc-cbtxt"></div></div></div><div class="Nicole-ft"><div class="Nicole-reply-bar Nicole-jrepbar"><span class="Nicole-reply-txt Nicole-jreptxt"></span><div class="Nicole-reply-close Nicole-jrepclose">×</div></div><div class="Nicole-in-area"><div class="Nicole-lang Nicole-jlang">CN</div><div class="Nicole-plus Nicole-jplus"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div><input type="text" class="Nicole-input Nicole-jinput" placeholder="输入文字发送..."><div class="Nicole-mic Nicole-jmic"><svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg></div><div class="Nicole-send Nicole-jsend"><svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></div></div><div class="Nicole-panel Nicole-jpanel"><div class="Nicole-pi Nicole-jbtn-voice"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div class="Nicole-ptx">语音呼叫</div></div><div class="Nicole-pi Nicole-jbtn-video"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></div><div class="Nicole-ptx">视频呼叫</div></div><div class="Nicole-pi Nicole-jimgbtn"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div><div class="Nicole-ptx">发原图</div></div><div class="Nicole-pi Nicole-jtxtimg"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg></div><div class="Nicole-ptx">发文字图</div></div><div class="Nicole-pi Nicole-jgiftbtn"><div class="Nicole-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg></div><div class="Nicole-ptx">送礼物</div></div><div class="Nicole-pi Nicole-jlinkbtn"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><div class="Nicole-ptx">发链接</div></div><div class="Nicole-pi Nicole-jtf"><div class="Nicole-pic"><svg viewBox="0 0 24 24" class="fl"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg></div><div class="Nicole-ptx">转账</div></div><div class="Nicole-pi Nicole-jemo"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div><div class="Nicole-ptx">表情包</div></div><div class="Nicole-pi Nicole-jmusic"><div class="Nicole-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></div><div class="Nicole-ptx">一起听歌</div></div><div class="Nicole-pi Nicole-jcp"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><div class="Nicole-ptx">情侣空间</div></div><div class="Nicole-pi Nicole-jbtn-loc"><div class="Nicole-pic"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="Nicole-ptx">共享位置</div></div><div class="Nicole-pi Nicole-jbtn-food"><div class="Nicole-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div><div class="Nicole-ptx">点外卖</div></div><div class="Nicole-pi Nicole-jbtn-draw"><div class="Nicole-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></div><div class="Nicole-ptx">手绘便签</div></div></div></div>
<div class="Nicole-mf Nicole-jmsgact"><div class="Nicole-mbox" style="height:auto; padding-bottom:24px;"><div class="Nicole-act-btn Nicole-jact-reply">引用回复</div><div class="Nicole-act-btn Nicole-jact-revoke" style="display:none; color:#222;">撤回消息</div><div class="Nicole-act-btn Nicole-jact-delete" style="color:#ff3b30;">删除消息</div><div class="Nicole-act-space"></div><div class="Nicole-act-btn Nicole-jact-cancel" style="color:#888;">取消</div></div></div><div class="Nicole-cen Nicole-jaddfriendmodal w260"><div class="Nicole-cen-box"><h4>重新添加好友</h4><input type="text" class="Nicole-cen-inp Nicole-jaddgreet" placeholder="打个招呼吧..."><div class="Nicole-cen-btns"><button class="cc Nicole-jaddfcancel">取消</button><button class="ok Nicole-jaddfok">发送申请</button></div></div></div><div class="Nicole-cen Nicole-jtfactmodal w260"><div class="Nicole-cen-box"><h4>转账处理</h4><div style="font-size:13px;color:#888;text-align:center;font-weight:300;">请选择对该笔转账的操作</div><div class="Nicole-cen-btns"><button class="cc Nicole-jtfact-return">退回</button><button class="ok Nicole-jtfact-receive">收款</button></div><div class="Nicole-cen-btns" style="margin-top:-6px;"><button class="cc Nicole-jtfact-cancel" style="width:100%;">取消</button></div></div></div><div class="Nicole-cen Nicole-jlocinputmodal w260"><div class="Nicole-cen-box"><h4>发送位置分享</h4><input type="text" class="Nicole-cen-inp Nicole-jlocin-pos" placeholder="我的位置 (如:朝阳区)"><input type="text" class="Nicole-cen-inp Nicole-jlocin-dist" placeholder="相距距离 (如:12.5 km)"><div class="Nicole-cen-btns"><button class="cc Nicole-jlocincancel">取消</button><button class="ok Nicole-jlocinok">发送</button></div></div></div><div class="Nicole-cen Nicole-jdrawmodal w260"><div class="Nicole-cen-box" style="width:290px; padding:20px;"><h4>手绘涂鸦</h4><canvas class="Nicole-draw-canvas Nicole-jdrawcanvas" width="246" height="246"></canvas><div class="Nicole-draw-tools"><input type="color" class="Nicole-draw-color Nicole-jdrawcolor" value="#222222"><input type="range" class="Nicole-draw-range Nicole-jdrawwidth" min="1" max="20" value="3"><div class="Nicole-draw-btn-icon Nicole-jdraweraser" title="橡皮擦"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L20 9C20.5 9.5 20.5 10.5 20 11L11 20H20V20Z"/></svg></div><div class="Nicole-draw-btn-icon Nicole-jdrawundo" title="撤销"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h10a5 5 0 0 1 5 5v2"/><polyline points="7 6 3 10 7 14"/></svg></div><div class="Nicole-draw-btn-icon Nicole-jdrawclear" title="清空画布"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div></div><div class="Nicole-cen-btns"><button class="cc Nicole-jdrawcancel">取消</button><button class="ok Nicole-jdrawok">发送</button></div></div></div><div class="Nicole-cen Nicole-jgiftmodal w260"><div class="Nicole-cen-box"><h4>送专属礼物</h4><input type="text" class="Nicole-cen-inp Nicole-jgiftdesc" placeholder="礼物名称或描述"><div class="Nicole-tf-grp"><span>¥</span><input type="number" class="Nicole-jgiftpr" placeholder="0.00"></div><input type="text" class="Nicole-cen-inp Nicole-jgiftnote" placeholder="备注留言"><div class="Nicole-cen-btns"><button class="cc Nicole-jgiftcancel">取消</button><button class="ok Nicole-jgiftok">送出</button></div></div></div><div class="Nicole-cen Nicole-jlinkmodal w260"><div class="Nicole-cen-box"><h4>分享外链</h4><input type="text" class="Nicole-cen-inp Nicole-jlinkurl" placeholder="网址URL..."><input type="text" class="Nicole-cen-inp Nicole-jlinktitle" placeholder="分享标题..."><div class="Nicole-cen-btns"><button class="cc Nicole-jlinkcancel">取消</button><button class="ok Nicole-jlinkok">分享</button></div></div></div><div class="Nicole-cen Nicole-jtfmodal"><div class="Nicole-cen-box"><h4>发起转账</h4><div class="Nicole-tf-grp"><span>¥</span><input type="number" class="Nicole-jtfamt" placeholder="0.00"></div><input type="text" class="Nicole-cen-inp Nicole-jtftitle" placeholder="转账说明"><div class="Nicole-cen-btns"><button class="cc Nicole-jtfcancel">取消</button><button class="ok Nicole-jtfok">确认</button></div></div></div><div class="Nicole-cen Nicole-jimgmodal w260"><div class="Nicole-cen-box"><h4>发送原图直链</h4><input type="text" class="Nicole-cen-inp Nicole-jimgurl" placeholder="图片URL直链/AI提示词..."><input type="text" class="Nicole-cen-inp Nicole-jimgdesc" placeholder="图片描述"><div class="Nicole-cen-btns"><button class="cc Nicole-jimgcancel">取消</button><button class="ok Nicole-jimgok">发送直链</button></div></div></div><div class="Nicole-cen Nicole-jtxtimgmodal w260"><div class="Nicole-cen-box"><h4>文字图气泡</h4><textarea class="Nicole-jtxtimgin" rows="3" placeholder="输入气泡中的文字..."></textarea><div class="Nicole-cen-btns"><button class="cc Nicole-jtxtimgcancel">取消</button><button class="ok Nicole-jtxtimgok">发送</button></div></div></div><div class="Nicole-cen Nicole-jfoodmodal w260"><div class="Nicole-cen-box"><h4>高级外卖</h4><input type="text" class="Nicole-cen-inp Nicole-jfoodshop" placeholder="店铺名称 (如: 肯德基)"><input type="text" class="Nicole-cen-inp Nicole-jfooditems" placeholder="外卖内容 (如: 炸鸡套餐)"><input type="text" class="Nicole-cen-inp Nicole-jfoodaddr" placeholder="配送地址"><input type="text" class="Nicole-cen-inp Nicole-jfoodname" placeholder="收件人姓名"><input type="text" class="Nicole-cen-inp Nicole-jfoodphone" placeholder="收件人电话"><div class="Nicole-cen-btns"><button class="cc Nicole-jfoodcancel">取消</button><button class="ok Nicole-jfoodok">下单并发送</button></div></div></div><div class="Nicole-cen Nicole-jvoicemodal w260"><div class="Nicole-cen-box"><h4>语音异常/降级</h4><textarea class="Nicole-jvoicetxt" rows="3" placeholder="麦克风受限，请输入文字..."></textarea><div class="Nicole-cen-btns"><button class="cc Nicole-jvoicecancel">取消</button><button class="ok Nicole-jvoiceok">生成语音条</button></div></div></div><div class="Nicole-cen Nicole-jpatmodal w260"><div class="Nicole-cen-box"><h4>修改拍一拍后缀</h4><div style="font-size:12px;color:#888;text-align:center;font-weight:300;">双击头像时生效</div><input type="text" class="Nicole-cen-inp Nicole-jpatin" placeholder="例如：的脑袋"><div class="Nicole-cen-btns"><button class="cc Nicole-jpatcancel">取消</button><button class="ok Nicole-jpatok">确定</button></div></div></div><div class="Nicole-cen Nicole-jaddemomodal w260"><div class="Nicole-cen-box"><h4>添加自定义表情</h4><input type="text" class="Nicole-cen-inp Nicole-jaddemourl" placeholder="图片URL直链..."><input type="text" class="Nicole-cen-inp Nicole-jaddemotxt" placeholder="说明文字"><div class="Nicole-cen-btns"><button class="cc Nicole-jaddemocancel">取消</button><button class="ok Nicole-jaddemook">保存</button></div></div></div><div class="Nicole-cen Nicole-jviewmodal w260"><div class="Nicole-cen-box"><h4>撤回原文</h4><textarea class="Nicole-cen-inp Nicole-jviewtxt" rows="4" readonly style="background:rgba(255,255,255,.8);"></textarea><div class="Nicole-cen-btns"><button class="ok Nicole-jviewclose" style="width:100%;">关闭</button></div></div></div><div class="Nicole-cen Nicole-jpyqsendmodal w260"><div class="Nicole-cen-box"><h4>发朋友圈</h4><textarea class="Nicole-cen-inp Nicole-jpyqsendtxt" rows="3" placeholder="这一刻的想法..."></textarea><input type="text" class="Nicole-cen-inp Nicole-jpyqsendimg" placeholder="配图URL直链 (可选)"><textarea class="Nicole-cen-inp Nicole-jpyqsendtxtimg" rows="2" placeholder="或者直接发文字图，输入内容..."></textarea><div class="Nicole-cen-btns"><button class="cc Nicole-jpyqsendcancel">取消</button><button class="ok Nicole-jpyqsendok">发表</button></div></div></div><div class="Nicole-cen Nicole-jpyqcommodal w260"><div class="Nicole-cen-box"><h4>评论动态</h4><textarea class="Nicole-cen-inp Nicole-jpyqcomtxt" rows="3" placeholder="说点什么..."></textarea><div class="Nicole-cen-btns"><button class="cc Nicole-jpyqcomcancel">取消</button><button class="ok Nicole-jpyqcomok">评论</button></div></div></div>
<div class="Nicole-mf Nicole-jlocmodal"><div class="Nicole-mbox"><div class="Nicole-mh"><span>位置共享</span><div class="Nicole-mc Nicole-jlocclose">&times;</div></div><div class="Nicole-loc-wrap"><div class="Nicole-cp-top" style="z-index:10;"><div class="Nicole-cp-avs"><div class="Nicole-cp-face Nicole-bind-lav"></div><div class="Nicole-cp-face Nicole-jcpf2 Nicole-bind-rav"></div></div><div class="Nicole-loc-dist">相距 <span id="Nc-loc-dist">未知</span></div></div><div class="Nicole-radar"><div class="Nicole-radar-wave"></div><div class="Nicole-radar-wave w2"></div><div class="Nicole-anchor a1"><div class="Nicole-anchor-av Nicole-bind-lav"></div><div class="Nicole-anchor-tip t1">未获取位置</div></div><div class="Nicole-anchor a2"><div class="Nicole-anchor-av Nicole-bind-rav"></div><div class="Nicole-anchor-tip t2">未获取位置</div></div></div><button class="Nicole-loc-send Nicole-jlocsend">发送当前定位</button></div></div></div><div class="Nicole-mf Nicole-jemomodal"><div class="Nicole-mbox"><div class="Nicole-mh"><span>选择表情与互动</span><div class="Nicole-mc Nicole-jemoclose">&times;</div></div><div class="Nicole-emo-games"><div class="Nicole-emo-gamebtn jemo-poke"><svg viewBox="0 0 24 24"><path d="M11 2a2 2 0 0 0-2 2v5H6a2 2 0 0 0-2 2v2c0 4.4 3.6 8 8 8h3a5 5 0 0 0 5-5v-6a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2z"/></svg>戳一戳</div><div class="Nicole-emo-gamebtn jemo-dice"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/></svg>摇骰子</div><div class="Nicole-emo-gamebtn jemo-rps"><svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>猜拳</div><div class="Nicole-emo-addbtn Nicole-jaddemobtn" title="添加表情"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div></div><div class="Nicole-emo Nicole-jemolist"></div></div></div><div class="Nicole-mf Nicole-jmumodal"><div class="Nicole-mbox"><div class="Nicole-mh"><span>一起听歌</span><div class="Nicole-mc Nicole-jmuclose">&times;</div></div><div class="Nicole-mu"><div class="Nicole-mu-stage"><div class="Nicole-mu-face Nicole-jmuf1 Nicole-bind-lav"></div><div class="Nicole-mu-waves Nicole-jmuwaves"><span class="Nicole-wave"></span><span class="Nicole-wave"></span><span class="Nicole-wave"></span></div><div class="Nicole-mu-face Nicole-jmuf2 Nicole-bind-rav"></div></div><div class="Nicole-mu-time-disp">累计听歌: <span id="Nc-mutime-val">0</span> 分钟</div><div class="Nicole-mu-now Nicole-jmunow" style="text-align:center;font-size:13px;color:#555;font-weight:400;">未在播放</div><div class="Nicole-mu-ctrl"><div class="Nicole-mu-btn Nicole-jmuprev"><svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20" fill="none" stroke="#222" stroke-width="1.5"/><line x1="5" y1="19" x2="5" y2="5" stroke="#222" stroke-width="1.5"/></svg></div><div class="Nicole-mu-btn main Nicole-jmuplay"><svg class="Nicole-jmuicon" viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4" fill="#222"/></svg></div><div class="Nicole-mu-btn Nicole-jmunext"><svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4" fill="none" stroke="#222" stroke-width="1.5"/><line x1="19" y1="5" x2="19" y2="19" stroke="#222" stroke-width="1.5"/></svg></div><div class="Nicole-mu-btn Nicole-jmu-mode" title="播放模式"><svg class="Nicole-jmu-mode-icon" viewBox="0 0 24 24"><path d="M17 1l4 4-4 4" fill="none" stroke="#222" stroke-width="1.5"/><path d="M3 11V9a4 4 0 0 1 4-4h14" fill="none" stroke="#222" stroke-width="1.5"/><path d="M7 23l-4-4 4-4" fill="none" stroke="#222" stroke-width="1.5"/><path d="M21 13v2a4 4 0 0 1-4 4H3" fill="none" stroke="#222" stroke-width="1.5"/></svg></div><div class="Nicole-mu-btn Nicole-jmu-danmu active" title="歌词弹幕"><svg viewBox="0 0 24 24"><path d="M3 6h18v10H7l-4 4V6z" fill="none" stroke="#222" stroke-width="1.5"/><line x1="7" y1="10" x2="17" y2="10" stroke="#222" stroke-width="1.5"/><line x1="7" y1="13" x2="13" y2="13" stroke="#222" stroke-width="1.5"/></svg></div></div><div class="Nicole-mu-playlist-bar"><select class="Nicole-mu-playlist-select Nicole-jmu-playlist-select"></select><button class="Nicole-mu-playlist-add Nicole-jmu-playlist-add" title="新建歌单">+</button><button class="Nicole-mu-playlist-del Nicole-jmu-playlist-del" title="删除歌单">×</button></div><div class="Nicole-mu-inputs"><input type="text" class="Nicole-mu-name Nicole-jmuname" placeholder="歌曲名称"><input type="text" class="Nicole-mu-artist Nicole-jmuartist" placeholder="歌手名"><input type="text" class="Nicole-mu-cover Nicole-jmucover" placeholder="专辑封面URL直链 (可选)"><div class="Nicole-mu-search-row"><input type="text" class="Nicole-mu-inp Nicole-jmuinp" placeholder="单曲直链或网易云ID"><button class="Nicole-mu-search Nicole-jmu-search">搜索</button><button class="Nicole-mu-add Nicole-jmuaddbtn">添加</button></div></div><div class="Nicole-mu-list Nicole-jmulist"></div><button class="Nicole-mu-invbtn Nicole-jmuinv">发送一起听歌邀请</button></div></div></div><div class="Nicole-mf Nicole-jcpmodal"><div class="Nicole-mbox"><div class="Nicole-mh"><span>情侣空间</span><div class="Nicole-mc Nicole-jcpclose">&times;</div></div><div class="Nicole-cp"><div class="Nicole-cp-top"><div class="Nicole-cp-avs"><div class="Nicole-cp-face Nicole-bind-lav"></div><div class="Nicole-cp-face Nicole-jcpf2 Nicole-bind-rav"></div></div><div class="Nicole-cp-id-group"><span class="Nicole-bind-lnm"></span> & <span class="Nicole-bind-rnm"></span></div></div><div class="Nicole-cp-rel Nicole-jcprel"></div><div class="Nicole-cp-sec"><div class="Nicole-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> 个性签名</div><div class="Nicole-sign-mod"><div class="Nicole-sign-hd"><div class="Nicole-cp-face Nicole-bind-lav" style="width:30px;height:30px;border-width:.5px;"></div><div class="Nicole-cp-id-group Nicole-bind-lnm" style="font-size:12px;"></div></div><div class="Nicole-sign-bd Nicole-jcsign"></div></div><div class="Nicole-sign-mod" style="margin-top:12px; background:rgba(255,255,255,.9); border:.5px solid rgba(0,0,0,.03);"><div class="Nicole-sign-hd"><div class="Nicole-cp-face Nicole-bind-rav" style="width:30px;height:30px;margin-left:0;border-width:.5px;"></div><div class="Nicole-cp-id-group Nicole-bind-rnm" style="font-size:12px;"></div><div class="Nicole-signdel Nicole-jsigndel" title="删除个签"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div></div><div class="Nicole-sign-bd Nicole-jusign-disp"></div><div class="Nicole-sign-act"><input type="text" class="Nicole-jusignin" placeholder="输入新签名..."><button class="Nicole-jusignsave">发布更新</button></div></div></div><div class="Nicole-cp-sec"><div class="Nicole-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 想做的小事</div><div class="Nicole-cp-things Nicole-jcpthings"></div><div class="Nicole-cp-addrow"><select class="Nicole-jcpwho"><option value="Me">我</option><option value="You">对方</option></select><input type="text" class="Nicole-jcpthingin" placeholder="添加待办..."><button class="Nicole-jcpthingadd">加</button></div></div><div class="Nicole-cp-sec"><div class="Nicole-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 纪念日</div><div class="Nicole-cp-days Nicole-jcpdays"></div><div class="Nicole-cp-addrow"><input type="text" class="Nicole-jcpdayname" placeholder="事件名称"><input type="date" class="Nicole-jcpdaydate"><button class="Nicole-jcpdayadd">加</button></div></div><div class="Nicole-cp-sec"><div class="Nicole-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 相册与图文</div><div class="Nicole-cp-albums Nicole-jcpalbums"></div><div class="Nicole-cp-addrow"><input type="text" class="Nicole-jcpalbumtxt" placeholder="这一刻的想法..." style="min-width:30px;"><input type="text" class="Nicole-jcpalbumimg" placeholder="图片URL直链(可选)" style="min-width:50px;"><button class="Nicole-jcpalbumadd">上传</button></div></div></div></div></div></div></div></div>

<div id="Nc-Data-1" style="display:none;">$1</div><div id="Nc-Data-2" style="display:none;">$2</div><div id="Nc-Data-3" style="display:none;">$3</div><div id="Nc-Data-4" style="display:none;">$4</div><div id="Nc-Data-5" style="display:none;">$5</div><div id="Nc-Data-6" style="display:none;">$6</div><div id="Nc-Data-7" style="display:none;">$7</div><div id="Nc-Data-8" style="display:none;">$8</div><div id="Nc-Data-9" style="display:none;">$9</div><div id="Nc-Data-10" style="display:none;">$10</div><div id="Nc-Data-11" style="display:none;">$11</div><div id="Nc-Data-12" style="display:none;">$12</div><div id="Nc-Data-13" style="display:none;">$13</div><div id="Nc-Data-14" style="display:none;">$14</div><div id="Nc-Data-15" style="display:none;">$15</div></div>`;
function getTavernChar(){
    try{
        var name='';
        // 只获取名字，头像交给 char-avatar 类的自动填充机制
        if(window.character) name=window.character.name||window.character.char_name||'';
        if(window.currentCharacter&&!name) name=window.currentCharacter.name||'';
        if(!name){
            var sels=['.char-name','#ch_name','.character-name','#character_name','[class*="char-name"]','[class*="charName"]','.chat-header-name','.character_card_name','[data-testid*="char"]'];
            for(var i=0;i<sels.length;i++){
                var el=document.querySelector(sels[i]);
                if(el&&el.textContent&&el.textContent.trim()&&el.textContent.trim().length<30&&el.textContent.trim()!=='SillyTavern'&&el.textContent.trim()!=='Mufy'){
                    name=el.textContent.trim();break;
                }
            }
        }
        console.log('[Nicole] char name:', name);
        return {name:name||'',avatar:''};
    }catch(e){return {name:'',avatar:''};}
}
function getTavernUser(){
    try{
        var name=window.user_name||window.userName||'';
        if(!name){
            var un=document.querySelector('.user-name,#user_name,[class*="user-name"],[class*="userName"]');
            if(un&&un.textContent&&un.textContent.trim()) name=un.textContent.trim();
        }
        console.log('[Nicole] user name:', name);
        return {name:name||'我',avatar:''};
    }catch(e){return {name:'我',avatar:''};}
}

function buildExtension(){
    if(document.getElementById(FLOAT_ID)){console.log('[nicoPhone] 浮动按钮已存在，跳过');return {panel:document.getElementById(PANEL_ID),floatEl:document.getElementById(FLOAT_ID),btn:document.getElementById(TOGGLE_ID)};}
    if(!document.body){console.error('[nicoPhone] document.body不存在');return null;}
    // inject css
    try{
        if(!document.getElementById(CSS_ID)){
            var st=document.createElement('style');
            st.id=CSS_ID;
            st.textContent=CSS;
            (document.head||document.documentElement).appendChild(st);
        }
    }catch(e){console.error('[nicoPhone] CSS注入失败:',e);}
    // float container
    var floatEl=document.createElement('div');
    floatEl.id=FLOAT_ID;
    // toggle button
    var btn=document.createElement('div');
    btn.id=TOGGLE_ID;
    btn.title='Nicole 手机';
    btn.innerHTML='<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>';
    // panel
    var panel=document.createElement('div');
    panel.id=PANEL_ID;
    panel.innerHTML=HTML;
    floatEl.appendChild(panel);
    floatEl.appendChild(btn);
    // 添加到body标签，避免影响html根元素布局
    (document.body||document.documentElement).appendChild(floatEl);

    // 动态计算位置，用left/top而不是bottom/right，避免transform影响
    function positionFloatBtn(){
    if (window.innerWidth <= 768){
        // 移动端：用left/top像素定位，避免html的transform导致bottom/right相对于html而非视口计算
        var btnW=38, btnH=38;
        var left = Math.max(0, window.innerWidth - btnW - 16);
        var top = Math.max(0, window.innerHeight - btnH - 96);
        floatEl.style.cssText='position:fixed!important;left:'+left+'px!important;top:'+top+'px!important;right:auto!important;bottom:auto!important;z-index:2147483000!important;display:block!important;width:'+btnW+'px!important;height:'+btnH+'px!important;';
        // 强制设置面板位置为顶部，避免旧inline style或拖动位置残留
        var panelEl = document.getElementById(PANEL_ID);
        if(panelEl){
            panelEl.style.setProperty('top','8px','important');
            panelEl.style.setProperty('left','50%','important');
            panelEl.style.setProperty('transform','translateX(-50%)','important');
            panelEl.style.setProperty('right','auto','important');
            panelEl.style.setProperty('bottom','auto','important');
        }
        return;
    }
    var btnW=48, btnH=48, left, top;
    try{
        var panel=document.getElementById(PANEL_ID);
        if(panel&&panel.classList.contains('show')) return;
        // 固定在页面右下角，避免覆盖酒馆下拉键等原生控件
        left=window.innerWidth-btnW-20;
        top=window.innerHeight-btnH-100;
        floatEl.style.cssText='position:fixed!important;left:'+left+'px!important;top:'+top+'px!important;z-index:2147483000!important;display:block!important;width:'+btnW+'px!important;height:'+btnH+'px!important;';
        // 确保面板可以接收鼠标事件（修复电脑端无法拖动问题）
        var panelEl=document.getElementById(PANEL_ID);
        if(panelEl){panelEl.style.setProperty('pointer-events','auto','important');}
    }catch(e){console.error('[nicoPhone] 定位失败:',e);}
}
    btn.style.cssText='border-radius:50%!important;background:rgba(255,255,255,.95)!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 4px 16px rgba(0,0,0,.15)!important;cursor:pointer!important;pointer-events:auto!important;position:relative!important;z-index:1!important;';
    positionFloatBtn();
    // 移动端强制设置面板位置为顶部，避免被旧 inline style 或其他规则覆盖
    if(window.innerWidth <= 768){
        panel.style.setProperty('top','8px','important');
        panel.style.setProperty('left','50%','important');
        panel.style.setProperty('transform','translateX(-50%)','important');
        panel.style.setProperty('right','auto','important');
        panel.style.setProperty('bottom','auto','important');
        console.log('[nicoPhone] 移动端面板位置已强制设为顶部');
    }
    window.addEventListener('resize',positionFloatBtn);
    setTimeout(positionFloatBtn,500);
    setTimeout(positionFloatBtn,1500);
    console.log('[nicoPhone] 浮动按钮已创建，位置:',floatEl.getBoundingClientRect());
    // 点击图标：图标消失，手机显示
    btn.addEventListener('click',function(e){
    if(btn._dragged){btn._dragged=false;return;}
    panel.classList.add('show');
    btn.style.display='none'; // 展开时隐藏按钮
    // 强制设置面板可以接收鼠标事件（修复电脑端无法拖动问题）
    panel.style.setProperty('pointer-events','auto','important');

    // 修复：清除容器固定宽高（48x48），让面板完整显示不飘出界面
    floatEl.style.width='auto';
    floatEl.style.height='auto';
    // 强制设置高z-index，确保面板在酒馆聊天框上层
    floatEl.style.setProperty('z-index','2147483000','important');

    // 电脑端修正位置（保持原有逻辑）
    setTimeout(function(){
        if (window.innerWidth <= 768) return;
        try{
            var r=floatEl.getBoundingClientRect();
            var pw=panel.offsetWidth||360, ph=panel.offsetHeight||600;
            var adjLeft=Math.max(0, Math.min(r.left, window.innerWidth-pw));
            var adjTop=Math.max(0, Math.min(r.top, window.innerHeight-ph));
            floatEl.style.left=adjLeft+'px';
            floatEl.style.top=adjTop+'px';
        }catch(e){}
    },50);
});
    // 拖动变量（保留按钮和面板共用）
    var isDragging=false,startX=0,startY=0,origLeft=0,origTop=0,dragTarget=null;
    function startDrag(e,target,skipFilter){
        // 点击交互元素禁止拖拽，防止按钮误触发（顶部栏拖动手柄可跳过）
        if(!skipFilter && e.target.closest('input, textarea, button, select, a, ' +
            '.Nicole-jchat, .Nicole-jpyqpanel, .Nicole-japp-panel, .Nicole-jset, .Nicole-jcall, ' +
            '.Nicole-jpanel, .Nicole-jrepbar, .Nicole-ft, .Nicole-hd-mid, .Nicole-ubox, ' +
            '.Nicole-waves, .Nicole-icons-rt, .Nicole-icbtn, .Nicole-dock-icon, .Nicole-hd-back, ' +
            '.Nicole-home-screen, .Nicole-ios-statusbar, .Nicole-sticky-note, .Nicole-sticky-textarea, .Nicole-sticky-btn')) {
            return;
        }
        isDragging=true;dragTarget=target;
        var t=e.touches?e.touches[0]:e;
        startX=t.clientX;startY=t.clientY;
        // 移动端拖动面板时，用面板的真实位置作为起点
        var isMobilePanel = (window.innerWidth <= 768 && target === panel);
        var rect = isMobilePanel ? panel.getBoundingClientRect() : floatEl.getBoundingClientRect();
        origLeft=rect.left;origTop=rect.top;
        _dragMoved=false;
        if(!e.touches)e.preventDefault();
    }
    var _dragMoved=false;
    // ===== 完全重写 moveDrag，解决面板拖飞出界问题 =====
    function moveDrag(e){
    if(!isDragging)return;
    var t=e.touches?e.touches[0]:e;
    var dx=t.clientX-startX,dy=t.clientY-startY;
    if(Math.abs(dx)>1||Math.abs(dy)>1){
        if(dragTarget)dragTarget._dragged=true;
        _dragMoved=true;
        var newLeft=origLeft+dx, newTop=origTop+dy;
        // 移动端拖动面板时，直接操作面板位置（面板是position:fixed，不跟随floatEl）
        var isMobilePanelDrag = (window.innerWidth <= 768 && dragTarget === panel);
        var targetEl = isMobilePanelDrag ? panel : floatEl;
        var rect = targetEl.getBoundingClientRect();
        var elW = rect.width;
        var elH = rect.height;
        // 强制边界：不允许任何部分飞出屏幕
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - elW));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - elH));
        // 统一用setProperty+important，覆盖positionFloatBtn设置的cssText !important
        targetEl.style.setProperty('left',newLeft+'px','important');
        targetEl.style.setProperty('top',newTop+'px','important');
        targetEl.style.setProperty('right','auto','important');
        targetEl.style.setProperty('bottom','auto','important');
        if(isMobilePanelDrag){
            targetEl.style.setProperty('transform','none','important');
        }
    }
}
    function endDrag(){
        isDragging=false;dragTarget=null;
        // 绝不重置位置，让面板停留在最后一次拖拽的位置
        // 如果点击按钮时没有拖动，位置保持不变，解决“跳回”问题
    }
    // 按钮拖拽（保留，两边都能拖）
    btn.addEventListener('mousedown',function(e){startDrag(e,btn);});
    btn.addEventListener('touchstart',function(e){startDrag(e,btn);},{passive:true});
    // ===== 面板拖拽（电脑端和移动端都启用，顶部栏作为拖动手柄） =====
    function tryPanelDrag(e){
        var target = e.target;
        // 顶部栏作为拖动手柄（只排除明确的交互按钮/输入框）
        var hd = target.closest('.Nicole-hd');
        if(hd && !target.closest('input, textarea, button, select, a, .Nicole-icbtn, .Nicole-hd-back, .Nicole-icons-rt')){
            startDrag(e, panel, true);
            return;
        }
        // 其他区域：只排除明确的交互容器
        if (target.closest('input, textarea, button, select, a, ' +
            '.Nicole-jchat, .Nicole-jpyqpanel, .Nicole-japp-panel, .Nicole-jset, .Nicole-jcall, ' +
            '.Nicole-jpanel, .Nicole-ft, .Nicole-home-screen, .Nicole-dock, ' +
            '.Nicole-chatlist-screen, .Nicole-mf, .Nicole-cen')) {
            return;
        }
        startDrag(e, panel, true);
    }
    panel.addEventListener('mousedown',function(e){
        // 只排除明确的交互元素，其他区域都可以拖动
        if(e.target.closest('input, textarea, select, button, a')) return;
        startDrag(e, panel, true);
    });
    // 移动端触摸面板：启用拖拽（通过顶部栏或空白区域）
    panel.addEventListener('touchstart',function(e){
        if(e.target.closest('input, textarea, select, button, a')) return;
        startDrag(e, panel, true);
    },{passive:true});
    // 全局鼠标/触屏移动事件
    document.addEventListener('mousemove',moveDrag);
    document.addEventListener('mouseup',endDrag);
    document.addEventListener('touchmove',moveDrag,{passive:true});
    document.addEventListener('touchend',endDrag);
    return {floatEl:floatEl, panel:panel, btn:btn};
}
/* ============ CORE LOGIC (adapted from original) ============ */
function initPhone(scope, charInfo, userInfo){
    var Q=function(s){return scope.querySelector(s);};
    var QA=function(s){return scope.querySelectorAll(s);};

    // ===== 初始化：强制重置所有弹窗/界面状态，避免旧状态残留遮挡 =====
    try{
        QA('.Nicole-call').forEach(function(el){el.classList.remove('show','minimized','active','video','state-in','state-out');});
        QA('.Nicole-set').forEach(function(el){el.classList.remove('show');});
        QA('.Nicole-pyq-panel').forEach(function(el){el.classList.remove('show');});
        QA('.Nicole-sys-app').forEach(function(el){el.classList.remove('show');});
        QA('.Nicole-mf').forEach(function(el){el.classList.remove('show');el.style.display='';});
        QA('.Nicole-cen').forEach(function(el){el.classList.remove('show');el.style.display='';});
        QA('.Nicole-txt-zoom').forEach(function(el){el.classList.remove('show');});
        QA('.Nicole-addchar-modal').forEach(function(el){el.classList.remove('show');});
        // 重置通话拖拽位置
        var callEl=Q('.Nicole-jcall');
        if(callEl){callEl.style.transform='';callEl.style.left='';callEl.style.top='';}
    }catch(e){console.log('[Nicole] reset UI state error:',e);}

    var rawLAv=charInfo.avatar||'', rawLName=charInfo.name||'角色';
    var rawRAv=userInfo.avatar||'', rawRName=userInfo.name||'我';

    var NcStore={
        get:function(k){try{return localStorage.getItem(k);}catch(e){return null;}},
        set:function(k,v){try{localStorage.setItem(k,v);}catch(e){}}
    };

    function resolveAvatar(rawUrl,isChar){
        if(!rawUrl) return '';
        if(rawUrl.startsWith('http')||rawUrl.startsWith('data:')) return rawUrl;
        try{
            var abs=new URL(rawUrl,window.location.origin).href;
            if(abs) return abs;
        }catch(e){}
        try{
            if(isChar){
                var cImg=document.querySelector('#avatar,.char-avatar img,.avatar img,img.avatar,.character-avatar img');
                if(cImg&&cImg.src) return cImg.src;
            }else{
                var uImg=document.querySelector('#user_avatar,.user-avatar img,.user-icon img,.user-avatar,.user-avatar-icon img');
                if(uImg&&uImg.src) return uImg.src;
            }
        }catch(e){}
        return rawUrl;
    }

    finalLName=rawLName||'Unknown';
    finalRName=rawRName||'Unknown';
    finalLAv=resolveAvatar(rawLAv,true)||'';
    finalRAv=resolveAvatar(rawRAv,false)||'';
    safeLAv=finalLAv?finalLAv.replace(/"/g,'&quot;').replace(/'/g,'%27'):'';
    safeRAv=finalRAv?finalRAv.replace(/"/g,'&quot;').replace(/'/g,'%27'):'';

    // 先设置名字（如果有）
    QA('.Nicole-bind-lnm').forEach(function(el){el.textContent=finalLName;});
    QA('.Nicole-bind-rnm').forEach(function(el){el.textContent=finalRName;});
    // 从页面真实角色头像复制（不依赖酒馆自动填充，因为浮动容器不在聊天区）
    function syncAvatarsFromPage(){
        try{
            var floatEl=document.getElementById(FLOAT_ID);
            function inFloat(el){return floatEl&&floatEl.contains(el);}
            function extractBg(el){try{var bg=window.getComputedStyle(el).backgroundImage;var bm=bg.match(/url\(["']?([^"')]+)["']?\)/);if(bm&&bm[1]&&bm[1].length>10&&bm[1].indexOf('data:image/gif')===-1)return bm[1];}catch(e){}return '';}
            // 手动上传的头像优先
            var mAvL='',mAvR='';
            try{mAvL=localStorage.getItem('Nc-av-left')||'';mAvR=localStorage.getItem('Nc-av-right')||'';}catch(e){}
            var bestChar='',bestUser='';
            // ===== 第一优先：从酒馆特定DOM精准获取角色卡头像 =====
            var charSels=['#avatar_img','#avatar img','.char-avatar img','.avatar.avatar_char img','#char-avatar img','.character-avatar img','.avatar_char img'];
            for(var ci=0;ci<charSels.length;ci++){
                var cEl=document.querySelector(charSels[ci]);
                if(cEl&&!inFloat(cEl)&&cEl.src&&cEl.src.length>10&&cEl.src.indexOf('data:image/gif')===-1&&cEl.src.indexOf('svg')===-1){bestChar=cEl.src;break;}
            }
            if(!bestChar){
                var charBgSels=['#avatar','.char-avatar','.avatar.avatar_char','#char-avatar','.character-avatar','.avatar_char'];
                for(var cbi=0;cbi<charBgSels.length;cbi++){
                    var cbEl=document.querySelector(charBgSels[cbi]);
                    if(cbEl&&!inFloat(cbEl)){var bgUrl=extractBg(cbEl);if(bgUrl){bestChar=bgUrl;break;}}
                }
            }
            // ===== 第一优先：从酒馆用户消息精准获取用户面具头像 =====
            var userMsg=document.querySelector('.mes[is_user="true"] .avatar, .mes[is_user="True"] .avatar, .user_mes .avatar, .mes.right .avatar, .right_mes .avatar');
            if(userMsg&&!inFloat(userMsg)){
                var uBg=extractBg(userMsg);
                if(uBg)bestUser=uBg;
                else{
                    var uImg=userMsg.querySelector('img');
                    if(uImg&&uImg.src&&uImg.src.length>10&&uImg.src.indexOf('data:image/gif')===-1)bestUser=uImg.src;
                }
            }
            if(!bestUser){
                var userAvatarSels=['#user_avatar img','.user-avatar img','.user_icon img','.avatar.avatar_user img','.persona-avatar img','#persona-avatar img'];
                for(var ui=0;ui<userAvatarSels.length;ui++){
                    var uEl=document.querySelector(userAvatarSels[ui]);
                    if(uEl&&!inFloat(uEl)&&uEl.src&&uEl.src.length>10&&uEl.src.indexOf('data:image/gif')===-1&&uEl.src.indexOf('svg')===-1){bestUser=uEl.src;break;}
                }
            }
            // ===== 第二优先（兜底）：全页扫描，仅在精准获取失败时才执行 =====
            if(!bestChar||!bestUser){
                var allImgs=document.querySelectorAll('img');
                var bestCharArea=0,bestUserArea=0;
                for(var i=0;i<allImgs.length;i++){
                    var img=allImgs[i];
                    if(inFloat(img))continue;
                    var src=img.src||'';
                    if(!src||src.indexOf('data:image/gif')===0||src.indexOf('svg')!==-1)continue;
                    var w=img.naturalWidth||img.width||0,h=img.naturalHeight||img.height||0;
                    if(w<40||h<40)continue;
                    var area=w*h,rect=img.getBoundingClientRect();
                    if(!bestChar&&rect.top<window.innerHeight*0.6&&area>bestCharArea){bestChar=src;bestCharArea=area;}
                    if(!bestUser&&rect.top>window.innerHeight*0.3&&area>bestUserArea){bestUser=src;bestUserArea=area;}
                }
                if(!bestChar||!bestUser){
                    var allEls=document.querySelectorAll('[class*="avatar"],[id*="avatar"],[class*="Avatar"],[id*="Avatar"]');
                    for(var j=0;j<allEls.length;j++){
                        var el=allEls[j];
                        if(inFloat(el))continue;
                        var bgUrl2=extractBg(el);
                        if(bgUrl2){
                            var r2=el.getBoundingClientRect(),a2=(el.offsetWidth||40)*(el.offsetHeight||40);
                            if(!bestChar&&r2.top<window.innerHeight*0.6&&a2>bestCharArea){bestChar=bgUrl2;bestCharArea=a2;}
                            if(!bestUser&&r2.top>window.innerHeight*0.3&&a2>bestUserArea){bestUser=bgUrl2;bestUserArea=a2;}
                        }
                    }
                }
            }
            // 应用头像（手动上传优先）
            if(bestChar&&!mAvL){
                safeLAv=bestChar.replace(/'/g,'%27');
                QA('.Nicole-bind-lav, .Nicole-bind-lav-bg').forEach(function(el){el.style.backgroundImage="url('"+safeLAv+"')";});
            }
            if(bestUser&&!mAvR){
                safeRAv=bestUser.replace(/'/g,'%27');
                QA('.Nicole-bind-rav, .Nicole-bind-rav-bg').forEach(function(el){el.style.backgroundImage="url('"+safeRAv+"')";});
            }
            // 找角色名
            if(!finalLName||finalLName==='角色'||finalLName==='Unknown'){
                var nameSels=['.char-name','#ch_name','.character-name','#character_name','[class*="char-name"]','[class*="charName"]','.chat-header-name','.character_card_name','[data-testid*="char"]','.profile_name','.char_profile_name'];
                for(var k=0;k<nameSels.length;k++){
                    var nel=document.querySelector(nameSels[k]);
                    if(nel&&nel.textContent&&nel.textContent.trim()&&nel.textContent.trim().length<30&&nel.textContent.trim()!=='SillyTavern'&&nel.textContent.trim()!=='Mufy'){
                        finalLName=nel.textContent.trim();
                        QA('.Nicole-bind-lnm').forEach(function(el){el.textContent=finalLName;});
                        break;
                    }
                }
            }
            console.log('[Nicole] syncFromPage: charAv='+(bestChar||'none').substring(0,50)+' userAv='+(bestUser||'none').substring(0,50)+' name='+finalLName);
        }catch(e){console.log('[Nicole] syncAvatars error:',e);}
    }
    // 立即同步 + 延迟同步 + 持续同步
    syncAvatarsFromPage();
    setTimeout(syncAvatarsFromPage,500);
    setTimeout(syncAvatarsFromPage,1500);
    if(!window.NcAvatarSyncTimer){
        window.NcAvatarSyncTimer=setInterval(syncAvatarsFromPage,30000);
    }

    var finalCPat='的肩膀', finalUPat='的脑袋';
    var pendingReply='';
    var actx=null;
    function getCtx(){if(!actx){try{actx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}return actx;}
    function playSwoosh(){
        var c=getCtx();if(!c)return;
        try{if(c.state==='suspended')c.resume();var o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(600,c.currentTime);o.frequency.exponentialRampToValueAtTime(1200,c.currentTime+0.1);g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(0.2,c.currentTime+0.05);g.gain.linearRampToValueAtTime(0,c.currentTime+0.1);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+0.1);}catch(e){}
    }
    var customRingUrl='https://audio.fukit.cn/autoupload/f/hMNqtPtx-G5PCe5Tdk4NxqNdx9J-4ccugcpyhybV9Yo/20260526/XyjZ/4b534499b26185b288e0fe1650638afa.mp3';
    var callRingMp3=null,ringRetryTimer=null,ringCtx=null,ringOsc=null,ringGain=null,ringInterval=null;
    try{callRingMp3=new Audio();callRingMp3.src=customRingUrl;callRingMp3.loop=true;callRingMp3.volume=0.8;callRingMp3.preload='auto';callRingMp3.crossOrigin='anonymous';}catch(e){}
    // Web Audio API 兜底铃声（振荡器模拟电话铃声）
    function startWebAudioRing(){
        try{
            if(!ringCtx){ringCtx=new (window.AudioContext||window.webkitAudioContext)();}
            if(ringCtx.state==='suspended')ringCtx.resume();
            stopWebAudioRing();
            var pattern=0;
            ringInterval=setInterval(function(){
                try{
                    if(ringOsc){try{ringOsc.stop();}catch(e){}}
                    ringOsc=ringCtx.createOscillator();
                    ringGain=ringCtx.createGain();
                    ringOsc.type='sine';
                    // 交替频率模拟电话铃声：嘟-嘟-嘟
                    ringOsc.frequency.setValueAtTime(pattern%2===0?620:480,ringCtx.currentTime);
                    ringGain.gain.setValueAtTime(0,ringCtx.currentTime);
                    ringGain.gain.linearRampToValueAtTime(0.3,ringCtx.currentTime+0.02);
                    ringGain.gain.linearRampToValueAtTime(0,ringCtx.currentTime+0.4);
                    ringOsc.connect(ringGain);ringGain.connect(ringCtx.destination);
                    ringOsc.start(ringCtx.currentTime);
                    ringOsc.stop(ringCtx.currentTime+0.45);
                    pattern++;
                }catch(e){}
            },500);
        }catch(e){}
    }
    function stopWebAudioRing(){
        if(ringInterval){clearInterval(ringInterval);ringInterval=null;}
        if(ringOsc){try{ringOsc.stop();}catch(e){}ringOsc=null;}
        if(ringGain){try{ringGain.disconnect();}catch(e){}ringGain=null;}
    }
    function playRing(){
        // 先强制解锁音频
        unlockAudio();
        if(!callRingMp3){try{callRingMp3=new Audio();callRingMp3.src=customRingUrl;callRingMp3.loop=true;callRingMp3.volume=0.8;callRingMp3.crossOrigin='anonymous';}catch(e){}}
        // 先启动Web Audio兜底（确保一定有声音）
        startWebAudioRing();
        // 再尝试HTMLAudioElement播放用户的mp3
        try{
            callRingMp3.currentTime=0;
            var p=callRingMp3.play();
            if(p&&typeof p.catch==='function'){
                p.then(function(){
                    // HTMLAudio播放成功，停止Web Audio兜底
                    stopWebAudioRing();
                }).catch(function(){
                    // HTMLAudio播放失败，继续用Web Audio兜底
                    console.log('[nicoPhone] 铃声mp3播放失败，使用Web Audio兜底');
                });
            }
        }catch(e){console.log('[nicoPhone] 铃声播放异常，使用Web Audio兜底',e);}
    }
    function stopRing(){if(callRingMp3){callRingMp3.pause();callRingMp3.currentTime=0;}if(ringRetryTimer){clearTimeout(ringRetryTimer);ringRetryTimer=null;}stopWebAudioRing();}
    // 用户交互解锁音频（浏览器自动播放策略）- 只在未解锁时执行，避免每次点击都暂停正在播放的音乐
    var audioUnlocked=false;
    var muAudioUnlocked=false;
    function unlockAudio(){
        try{
            // 解锁HTMLAudioElement（铃声）
            if(!audioUnlocked&&callRingMp3){callRingMp3.muted=true;callRingMp3.play().then(function(){callRingMp3.pause();callRingMp3.currentTime=0;callRingMp3.muted=false;audioUnlocked=true;}).catch(function(){});}
            // 解锁Web Audio API
            if(!ringCtx){try{ringCtx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}
            if(ringCtx&&ringCtx.state==='suspended'){ringCtx.resume().then(function(){audioUnlocked=true;}).catch(function(){});}
            // 解锁音乐播放器 - 如果正在播放，只取消静音并标记已解锁，绝不重新play中断播放
            if(!muAudioUnlocked&&typeof muAudio!=='undefined'&&muAudio){
                if(muAudio.paused){
                    muAudio.muted=true;
                    muAudio.play().then(function(){muAudio.pause();muAudio.muted=false;muAudioUnlocked=true;}).catch(function(){muAudio.muted=false;});
                }else{
                    // 正在播放，只标记已解锁，不中断播放
                    muAudioUnlocked=true;
                    audioUnlocked=true;
                }
            }
        }catch(e){}
    }
    document.addEventListener('click',unlockAudio);
    document.addEventListener('touchstart',unlockAudio);
    document.addEventListener('keydown',unlockAudio);
    document.addEventListener('scroll',unlockAudio);

    function appendCmd(cmd){
        var inputEl=document.querySelector('#send_textarea')||document.querySelector('.commentInput')||document.querySelector('textarea');
        if(!inputEl)return;
        try{
            var setter=Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set;
            var cur=inputEl.value||'';var nv=cur?(cur+'\n'+cmd):cmd;
            if(setter){setter.call(inputEl,nv);}else{inputEl.value=nv;}
            inputEl.dispatchEvent(new Event('input',{bubbles:true}));
        }catch(e){inputEl.value=(inputEl.value||'')+'\n'+cmd;}
    }
    // ===== 输入框粘贴格式自动转换 =====
    function setupPasteConverter(){
        var inputEl=document.querySelector('#send_textarea')||document.querySelector('.commentInput')||document.querySelector('textarea');
        if(!inputEl){setTimeout(setupPasteConverter,1000);return;}
        inputEl.addEventListener('paste',function(e){
            var pastedText=(e.clipboardData||window.clipboardData).getData('text');
            if(!pastedText)return;
            e.preventDefault();
            var converted=convertPasteFormat(pastedText);
            // 插入到光标位置
            var start=inputEl.selectionStart||0,end=inputEl.selectionEnd||0;
            inputEl.value=inputEl.value.substring(0,start)+converted+inputEl.value.substring(end);
            inputEl.selectionStart=inputEl.selectionEnd=start+converted.length;
            inputEl.dispatchEvent(new Event('input',{bubbles:true}));
        });
    }
    setupPasteConverter();

    function convertPasteFormat(text){
        // 格式1: $[语音:3"|内容] → [我语音:3"|内容]
        // 格式1: $[表情:url] → [我表情:url]
        // 格式1: $[红包:金额|备注] → [我红包:金额|备注]
        // 格式1: $[转账:金额|说明] → [我转账:金额|说明]
        // 格式1: $[电话:语音] → [我电话:语音]
        // 格式1: $[朋友圈:内容] → [我朋友圈:内容]
        // 格式1: $[拍一拍:肩膀] → [我拍一拍:肩膀]
        // 格式1: $[其他] → [我:其他]（纯文本）
        text=text.replace(/\$\[([^\]]+)\]/g,function(m,p1){
            var type=p1.split(':')[0].split('：')[0];
            var knownTypes=['语音','表情','图片','红包','转账','文字图','文图','定位','收款','退回','退款','电话','朋友圈','拍一拍','拉黑','取消拉黑','加好友','系统','撤回'];
            if(knownTypes.indexOf(type)>=0){
                var fixedP1=p1;
                if(type==='文图') fixedP1='文字图'+p1.substring(2);
                return '[我'+fixedP1+']';
            }
            return '[我:'+p1+']';
        });
        // 格式2: 我 | 222 → [我:222]（纯文本）
        text=text.replace(/^我\s*\|\s*(.+)$/gm,'[我:$1]');
        // 格式3: 角色名 | 内容 → [角色名:内容]
        text=text.replace(/^([^\[\n|]+?)\s*\|\s*(.+)$/gm,function(m,name,content){
            name=name.trim();
            if(name && name!=='我') return '['+name+':'+content+']';
            return m;
        });
        return text;
    }
    setupPasteConverter();

    function getRealImgUrl(url){if(url&&url.startsWith('local-draw-')){return NcStore.get('Nc-'+url)||url;}return url;}

    var homeScreen=Q('.Nicole-jhome');
    if(homeScreen) homeScreen.classList.add('active');
    var appPanel=Q('.Nicole-japp-panel');
    var phoneContent=Q('#phone-content');
    var phoneContacts=[{id:'1',name:finalLName,phone:'13800138000'},{id:'2',name:finalRName+' (我)',phone:'13900139000'}];
    var phoneHistory=[];

    var ncClockEl=Q('.Nicole-jhome-time');
    if(ncClockEl){setInterval(function(){var d=new Date();ncClockEl.textContent=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');},20000);}

    var stickyTxt=Q('.Nicole-jsticky-txt'),stickyBtn=Q('.Nicole-jsticky-save');
    if(stickyTxt&&stickyBtn){
        var savedSticky=NcStore.get('Nc-sticky-note');
        if(savedSticky)stickyTxt.value=savedSticky;
        stickyBtn.addEventListener('click',function(){var val=stickyTxt.value;NcStore.set('Nc-sticky-note',val);playSwoosh();appendCmd('$[更新便签:'+val+']');renderSysMsg('主界面便签已更新并同步');stickyTxt.blur();});
    }

    // ===== 日历组件（黑白灰高级简洁）=====
    var calCurDate=new Date();
    var calSelected=null;
    function renderCalendar(){
        try{
            var year=calCurDate.getFullYear();
            var month=calCurDate.getMonth();
            var titleEl=Q('.Nicole-jcal-title');
            if(titleEl)titleEl.textContent=year+'年'+(month+1)+'月';
            var firstDay=new Date(year,month,1).getDay();
            var daysInMonth=new Date(year,month+1,0).getDate();
            var today=new Date();
            var html='';
            for(var ci=0;ci<firstDay;ci++){html+='<div class="Nicole-cal-day empty"></div>';}
            for(var cd=1;cd<=daysInMonth;cd++){
                var cIsToday=(today.getFullYear()===year&&today.getMonth()===month&&today.getDate()===cd);
                var cIsSel=(calSelected&&calSelected.getFullYear()===year&&calSelected.getMonth()===month&&calSelected.getDate()===cd);
                html+='<div class="Nicole-cal-day'+(cIsToday?' today':'')+(cIsSel?' selected':'')+'" data-day="'+cd+'">'+cd+'</div>';
            }
            var daysEl=Q('.Nicole-jcal-days');
            if(daysEl)daysEl.innerHTML=html;
            QA('.Nicole-cal-day:not(.empty)').forEach(function(el){
                el.addEventListener('click',function(){
                    var day=parseInt(this.getAttribute('data-day'));
                    calSelected=new Date(year,month,day);
                    var saved=calSelected.getFullYear()+'-'+String(calSelected.getMonth()+1).padStart(2,'0')+'-'+String(calSelected.getDate()).padStart(2,'0');
                    NcStore.set('Nc-cal-selected',saved);
                    var footEl=Q('.Nicole-jcal-foot');
                    if(footEl)footEl.textContent='已设: '+saved;
                    renderCalendar();
                });
            });
        }catch(e){console.log('[Nicole] calendar render error:',e);}
    }
    var calPrev=Q('.Nicole-jcal-prev'),calNext=Q('.Nicole-jcal-next'),calTitle=Q('.Nicole-jcal-title'),calDateInput=Q('.Nicole-jcal-dateinput');
    if(calPrev)calPrev.addEventListener('click',function(){calCurDate.setMonth(calCurDate.getMonth()-1);renderCalendar();});
    if(calNext)calNext.addEventListener('click',function(){calCurDate.setMonth(calCurDate.getMonth()+1);renderCalendar();});
    // 点击标题切换为日期输入框
    if(calTitle&&calDateInput){
        calTitle.addEventListener('click',function(){
            calTitle.style.display='none';
            calDateInput.style.display='block';
            var y=calCurDate.getFullYear(),m=String(calCurDate.getMonth()+1).padStart(2,'0'),d=String(calCurDate.getDate()).padStart(2,'0');
            calDateInput.value=y+'-'+m+'-'+d;
            setTimeout(function(){calDateInput.focus();calDateInput.showPicker&&calDateInput.showPicker();},50);
        });
        function applyDateInput(){
            var val=calDateInput.value;
            if(val){
                var parts=val.split('-');
                var y=parseInt(parts[0]),m=parseInt(parts[1])-1,d=parseInt(parts[2]);
                calCurDate=new Date(y,m,1);
                calSelected=new Date(y,m,d);
                NcStore.set('Nc-cal-selected',val);
                var cfootEl=Q('.Nicole-jcal-foot');
                if(cfootEl)cfootEl.textContent='已设: '+val;
                renderCalendar();
            }
            calDateInput.style.display='none';
            calTitle.style.display='';
        }
        calDateInput.addEventListener('change',applyDateInput);
        calDateInput.addEventListener('blur',function(){setTimeout(function(){if(calDateInput.style.display!=='none'){calDateInput.style.display='none';calTitle.style.display='';}},150);});
        calDateInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();applyDateInput();}});
    }
    var savedCal=NcStore.get('Nc-cal-selected');
    if(savedCal){try{var cparts=savedCal.split('-');calSelected=new Date(parseInt(cparts[0]),parseInt(cparts[1])-1,parseInt(cparts[2]));var cfootEl=Q('.Nicole-jcal-foot');if(cfootEl)cfootEl.textContent='已设: '+savedCal;}catch(e){}}
    renderCalendar();

    Q('.Nicole-jhd-back').addEventListener('click',function(){
        var cls=Q('.Nicole-jchatlist-screen');
        if(cls){renderChatListScreen();cls.classList.add('show');}
    });
    Q('#app-wechat').addEventListener('click',function(){if(homeScreen)homeScreen.classList.remove('active');renderChatListScreen();var cls=Q('.Nicole-jchatlist-screen');if(cls)cls.classList.add('show');});
    Q('.Nicole-japp-back').addEventListener('click',function(){appPanel.classList.remove('show');});
    Q('#app-phone').addEventListener('click',function(){appPanel.classList.add('show');renderPhoneTab('recents');});
    // ===== 主桌面四个App =====
    var app2Panel=Q('.Nicole-japp2-panel'),app2Title=Q('.Nicole-japp2-title'),app2Body=Q('.Nicole-japp2-body');
    Q('.Nicole-japp2-back').addEventListener('click',function(){app2Panel.classList.remove('show');stopDyDanmaku();});
    function openApp(type){
        app2Panel.classList.add('show');
        if(type==='gallery'){app2Title.textContent='相册';renderGalleryApp();}
        else if(type==='douyin'){app2Title.textContent='抖音';renderDouyinApp();}
        else if(type==='ins'){app2Title.textContent='Instagram';renderInsApp();}
        else if(type==='weibo'){app2Title.textContent='微博';renderWeiboApp();}
        else if(type==='couple'){app2Title.textContent='情侣问答';renderCoupleApp();}
        else if(type==='memo'){app2Title.textContent='备忘录';renderMemoApp();}
    }
    Q('#app-gallery').addEventListener('click',function(){playSwoosh();openApp('gallery');});
    Q('#app-douyin').addEventListener('click',function(){playSwoosh();openApp('douyin');});
    Q('#app-ins').addEventListener('click',function(){playSwoosh();openApp('ins');});
    Q('#app-weibo').addEventListener('click',function(){playSwoosh();openApp('weibo');});
    Q('#app-couple').addEventListener('click',function(){playSwoosh();openApp('couple');});
    Q('#app-memo').addEventListener('click',function(){playSwoosh();openApp('memo');});

    // ===== 音乐搜索播放核心引擎 (多引擎兜底搜索+真实Audio播放) =====
    var MUSIC_API='https://music-api.gdstudio.xyz/api.php';
    var muAudio=new Audio();muAudio.loop=false;muAudio.volume=0.6;
    // 带超时的fetch辅助函数
    function muFetch(url,timeout){var c=new AbortController();var tm=setTimeout(function(){c.abort();},timeout||8000);return fetch(url,{signal:c.signal}).then(function(r){clearTimeout(tm);return r;}).catch(function(e){clearTimeout(tm);throw e;});}
    function muCheckUrl(url){return new Promise(function(res){if(!url)return res(false);var t=new Audio();t.muted=true;t.crossOrigin='anonymous';var tm=setTimeout(function(){res(false);},2000);t.oncanplay=function(){clearTimeout(tm);res(t.duration>2);};t.onerror=function(){clearTimeout(tm);res(false);};t.src=url;});}
    // 搜索关键词清洗：去掉括号/特殊字符，提高命中率
    function muCleanQuery(q){return q.replace(/\([^)]*\)/g,'').replace(/\[.*?\]/g,'').replace(/[^\w\u4e00-\u9fa5\s.-]/g,'').trim();}
    // 搜索结果缓存（内存）
    var muSearchCache={};
    // 并行搜索所有引擎，取第一个成功的结果
    async function muResolve(query){
        var cleanQ=muCleanQuery(query);
        if(!cleanQ)cleanQ=query;
        var cacheKey=cleanQ.toLowerCase();
        if(muSearchCache[cacheKey])return muSearchCache[cacheKey];
        var engines=[
            {name:'网易云',fn:function(){return muSearchGD('netease',cleanQ);}},
            {name:'QQ音乐',fn:function(){return muSearchGD('tencent',cleanQ);}},
            {name:'酷狗',fn:function(){return muSearchGD('kugou',cleanQ);}},
            {name:'酷我',fn:function(){return muSearchGD('kuwo',cleanQ);}},
            {name:'Joox',fn:function(){return muSearchGD('joox',cleanQ);}},
            {name:'Qijieya',fn:function(){return muSearchQj(cleanQ);}}
        ];
        return new Promise(function(resolve){
            var done=false,finished=0;
            engines.forEach(function(eng){
                eng.fn().then(function(hit){
                    if(!done&&hit){done=true;muSearchCache[cacheKey]=hit;resolve(hit);}
                }).catch(function(){}).finally(function(){
                    finished++;
                    if(finished===engines.length&&!done)resolve(null);
                });
            });
            // 10秒总超时保护
            setTimeout(function(){if(!done){done=true;resolve(null);}},10000);
        });
    }
    async function muSearchGD(source,query){
        try{
            var sr=await muFetch(MUSIC_API+'?types=search&count=8&source='+source+'&name='+encodeURIComponent(query)).then(function(r){return r.json();});
            if(!sr||!sr.length)return null;
            for(var i=0;i<sr.length;i++){
                var item=sr[i],finalUrl='';
                if(source==='netease'){
                    try{
                        var rr=await muFetch('https://v.iarc.top/?type=url&id='+item.id,6000);
                        if(rr.ok){
                            var ct=rr.headers.get('content-type')||'';
                            if(rr.url&&rr.url!=='https://v.iarc.top/?type=url='+item.id&&!ct.includes('json')){finalUrl=rr.url;}
                            else{var jr=await rr.json();finalUrl=(Array.isArray(jr)&&jr[0])?jr[0].url:(jr.url||(jr.data&&jr.data.url));}
                        }
                    }catch(e){}
                    if(finalUrl&&finalUrl.indexOf('http://')===0)finalUrl=finalUrl.replace('http://','https://');
                }else{
                    try{
                        var ur=await muFetch(MUSIC_API+'?types=url&source='+source+'&id='+item.id+'&br=320',6000).then(function(r){return r.json();});
                        if(ur&&ur.url)finalUrl=ur.url;
                    }catch(e){}
                }
                if(finalUrl&&await muCheckUrl(finalUrl))return {url:finalUrl,name:item.name,artist:item.artist||item.author||'',source:source,id:item.id};
            }
        }catch(e){}return null;
    }
    async function muSearchQj(query){
        try{
            var sr=await muFetch('https://api.qijieya.cn/meting/?server=netease&type=search&name='+encodeURIComponent(query)).then(function(r){return r.json();});
            if(!sr||!sr.length)return null;
            for(var i=0;i<sr.length;i++){
                if(sr[i].url&&await muCheckUrl(sr[i].url))return {url:sr[i].url,name:sr[i].name,artist:sr[i].artist||sr[i].author||'',source:'qijieya',id:sr[i].id||sr[i].lrc_id};
            }
        }catch(e){}return null;
    }

    // ===== MP3播放器逻辑 (iOS通知栏风格，歌曲从聊天一起听同步) =====
    var mp3Songs=[{title:'未在播放',artist:'聊天界面一起听歌后自动同步',duration:1,cover:''}];
    var mp3Idx=0,mp3Playing=false,mp3Timer=null,mp3Cur=0,mp3LastSynced='';
    function mp3Fmt(s){s=Math.floor(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
    function mp3UpdateUI(){
        var s=mp3Songs[mp3Idx];
        Q('#mp3-title').textContent=s.title;
        Q('#mp3-artist').textContent=s.artist;
        Q('#mp3-total').textContent=mp3Fmt(s.duration);
        Q('#mp3-cur').textContent=mp3Fmt(mp3Cur);
        var pct=s.duration>1?(mp3Cur/s.duration)*100:0;
        Q('#mp3-bar').style.width=pct+'%';
        Q('#mp3-dot').style.left=pct+'%';
        var player=Q('.Nicole-mp3-player');
        if(player)player.classList.toggle('playing',mp3Playing);
        var icon=Q('#mp3-play-icon');
        if(icon){icon.innerHTML=mp3Playing?'<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>':'<polygon points="6 4 20 12 6 20 6 4"></polygon>';}
    }
    function mp3Play(){
        var s=mp3Songs[mp3Idx];
        if(s.duration<=1&&!s.url)return;
        if(s.url&&muAudio.src!==s.url){muAudio.src=s.url;}
        if(!s.url&&s.title&&s.title!=='未在播放'){
            mp3SearchAndPlay(s.title+(s.artist&&s.artist!=='未知歌手'?' '+s.artist:''));
            return;
        }
        muAudio.play().catch(function(){});
        mp3Playing=true;mp3UpdateUI();
        // 启动歌词弹幕
        if(s.title&&s.title!=='未在播放'){fetchDanmuLyrics(s.title,s.artist);startDanmuTimer();}
    }
    function mp3Pause(){muAudio.pause();mp3Playing=false;stopDanmuTimer();mp3UpdateUI();}
    function mp3Toggle(){if(mp3Playing){mp3Pause();}else{mp3Play();}}
    function mp3Next(){if(mp3Songs.length<=1){muAudio.currentTime=0;mp3UpdateUI();return;}mp3Idx=(mp3Idx+1)%mp3Songs.length;if(mp3Playing){mp3Play();}else{mp3UpdateUI();}}
    function mp3Prev(){if(mp3Songs.length<=1){muAudio.currentTime=0;mp3UpdateUI();return;}mp3Idx=(mp3Idx-1+mp3Songs.length)%mp3Songs.length;if(mp3Playing){mp3Play();}else{mp3UpdateUI();}}
    async function mp3SearchAndPlay(query){
        var titleEl=Q('#mp3-title');if(titleEl)titleEl.textContent='搜索中...';
        var hit=await muResolve(query);
        if(hit){
            mp3Songs=[{title:hit.name,artist:hit.artist||'未知歌手',duration:240,cover:'',url:hit.url}];
            mp3Idx=0;muAudio.src=hit.url;muAudio.play().catch(function(){});mp3Playing=true;
            // 启动歌词弹幕
            fetchDanmuLyrics(hit.name,hit.artist);startDanmuTimer();
        }else{
            if(titleEl)titleEl.textContent='未找到音源';
            setTimeout(function(){mp3UpdateUI();},1500);
        }
        mp3UpdateUI();
    }
    muAudio.addEventListener('timeupdate',function(){
        if(!muAudio.duration)return;
        mp3Cur=muAudio.currentTime;
        var pct=(muAudio.currentTime/muAudio.duration)*100;
        Q('#mp3-bar').style.width=pct+'%';
        Q('#mp3-dot').style.left=pct+'%';
        Q('#mp3-cur').textContent=mp3Fmt(muAudio.currentTime);
        Q('#mp3-total').textContent=mp3Fmt(muAudio.duration);
    });
    muAudio.addEventListener('play',function(){mp3Playing=true;mp3UpdateUI();
        // 播放时显示歌词模块
        if(danmuEnabled&&lyricModule){lyricModule.classList.remove('hidden');updateLyricModule();}
    });
    muAudio.addEventListener('pause',function(){mp3Playing=false;mp3UpdateUI();});
    muAudio.addEventListener('ended',function(){mp3Next();});
    function mp3SyncFromChat(){
        try{
            var nameEl=Q('.Nicole-jmuname'),artistEl=Q('.Nicole-jmuartist'),coverEl=Q('.Nicole-jmucover'),urlEl=Q('.Nicole-jmuinp');
            var name=nameEl?nameEl.value.trim():'',artist=artistEl?artistEl.value.trim():'',cover=coverEl?coverEl.value.trim():'';
            var url=urlEl?urlEl.value.trim():'';
            // 只在歌名变化时才同步，避免干扰顶部播放器的独立播放
            if(name&&name!==mp3LastSynced){
                mp3LastSynced=name;
                mp3Songs=[{title:name,artist:artist||'未知歌手',duration:240,cover:cover,url:url}];
                mp3Idx=0;mp3Cur=0;
                var playIcon=Q('.Nicole-jmuicon');
                var isPlaying=playIcon&&(playIcon.innerHTML.indexOf('pause')>-1||playIcon.innerHTML.indexOf('rect')>-1);
                if(isPlaying){
                    // 一起听在播放，同步播放并启动弹幕
                    if(url){muAudio.src=url;muAudio.play().catch(function(){});}
                    else{mp3SearchAndPlay(name+(artist?' '+artist:''));}
                    fetchDanmuLyrics(name,artist);startDanmuTimer();
                }
                // 一起听没播放时，不要暂停顶部播放器，让它独立播放
            }
        }catch(e){}
    }
    Q('#mp3-play').addEventListener('click',function(){mp3Toggle();});
    Q('#mp3-next').addEventListener('click',function(){mp3Next();});
    Q('#mp3-prev').addEventListener('click',function(){mp3Prev();});
    // 主桌面播放器弹幕开关 - 单击显示/隐藏歌词模块，双击打开设置
    var mp3DanmuClickTimer=null;
    Q('#mp3-danmu').addEventListener('click',function(){
        if(mp3DanmuClickTimer){clearTimeout(mp3DanmuClickTimer);mp3DanmuClickTimer=null;toggleDanmuPanel();return;}
        mp3DanmuClickTimer=setTimeout(function(){
            mp3DanmuClickTimer=null;
            danmuEnabled=!danmuEnabled;
            NcStore.set('Nc-mu-danmu',danmuEnabled?'1':'0');
            toggleDanmuBtn();
            if(lyricModule)lyricModule.classList.toggle('hidden',!danmuEnabled);
            if(danmuContainer)danmuContainer.classList.toggle('hidden',!danmuEnabled);
            if(danmuEnabled&&!muAudio.paused){startDanmuTimer();updateLyricModule();}else{stopDanmuTimer();}
            renderSysMsg('歌词模块: '+(danmuEnabled?'显示':'隐藏')+' (双击打开设置)');
        },250);
    });
    Q('#mp3-progress').addEventListener('click',function(e){
        if(!muAudio.duration)return;
        var rect=this.getBoundingClientRect();
        var pct=(e.clientX-rect.left)/rect.width;
        muAudio.currentTime=muAudio.duration*pct;
    });
    // 点击歌名/歌手名搜索
    Q('#mp3-title').addEventListener('click',function(){
        var q=prompt('输入歌曲名（可加歌手名）：',mp3Songs[mp3Idx].title==='未在播放'?'':mp3Songs[mp3Idx].title);
        if(q&&q.trim()){mp3LastSynced=q.trim();mp3SearchAndPlay(q.trim());}
    });
    Q('#mp3-artist').addEventListener('click',function(){
        var q=prompt('输入歌曲名（可加歌手名）：',mp3Songs[mp3Idx].title==='未在播放'?'':mp3Songs[mp3Idx].title);
        if(q&&q.trim()){mp3LastSynced=q.trim();mp3SearchAndPlay(q.trim());}
    });
    Q('#mp3-title').style.cursor='pointer';
    Q('#mp3-artist').style.cursor='pointer';
    setInterval(mp3SyncFromChat,5000);
    mp3UpdateUI();

    // ===== 抖音App =====
    var dyDanmakuTimer=null,dyVideos=[],dyCurIdx=0;
    function stopDyDanmaku(){if(dyDanmakuTimer){clearInterval(dyDanmakuTimer);dyDanmakuTimer=null;}}
    function getCharInfo(){
        var name='未知角色',desc='',worldInfo='',personality='',scenario='',firstMes='';
        try{if(window.character&&window.character.name)name=window.character.name;}catch(e){}
        try{if(window.character&&window.character.description)desc=window.character.description.substring(0,800);}catch(e){}
        try{if(window.character&&window.character.personality)personality=window.character.personality.substring(0,500);}catch(e){}
        try{if(window.character&&window.character.scenario)scenario=window.character.scenario.substring(0,500);}catch(e){}
        try{if(window.character&&window.character.first_mes)firstMes=window.character.first_mes.substring(0,300);}catch(e){}
        try{
            if(window.character){
                var wi=window.character.world_info||window.character.worldInfo||window.character.character_book||'';
                if(wi&&typeof wi==='string')worldInfo=wi.substring(0,1000);
                else if(wi&&wi.entries){try{worldInfo=JSON.stringify(wi.entries).substring(0,1000);}catch(e){}}
            }
        }catch(e){}
        if(!name||name==='未知角色'){var ne=document.querySelector('.char-name,#ch_name,.character-name');if(ne&&ne.textContent)name=ne.textContent.trim();}
        return {name:name,desc:desc,worldInfo:worldInfo,personality:personality,scenario:scenario,firstMes:firstMes};
    }
    function getStoryContext(){
        try{
            var msgs=document.querySelectorAll('#chat .mes, .chat-message, [class*="message"]');
            var arr=[];
            for(var i=Math.max(0,msgs.length-8);i<msgs.length;i++){
                var t=msgs[i].textContent||'';
                if(t&&t.trim().length>0&&t.trim().length<300)arr.push(t.trim().substring(0,150));
            }
            return arr.join('\n');
        }catch(e){return '';}
    }
    function randUsername(){
        var adjs=['迷路的','吃瓜的','熬夜的','摸鱼的','社恐的','话痨的','佛系的','暴躁的','温柔的','神秘的','摆烂的','卷王'];
        var nouns=['小猫','小狗','兔子','狐狸','熊猫','企鹅','海豚','松鼠','刺猬','考拉','水獭','羊驼'];
        return adjs[Math.floor(Math.random()*adjs.length)]+nouns[Math.floor(Math.random()*nouns.length)]+Math.floor(Math.random()*999);
    }
    function renderDouyinApp(){
        stopDyDanmaku();var charInfo=getCharInfo();var avatarUrl=safeLAv||'';
        var html='<div class="Nicole-dy-feed" id="dy-feed">';
        html+='<div class="Nicole-dy-topbar"><span class="Nicole-dy-topbar-title">抖音</span><div class="Nicole-dy-refresh" id="dy-refresh">刷新</div></div>';
        html+='<div class="Nicole-dy-video-nav prev" id="dy-prev"></div><div class="Nicole-dy-video-nav next" id="dy-next"></div>';
        html+='<div class="Nicole-dy-video"><div class="Nicole-dy-video-placeholder"><div class="Nicole-dy-text-img" id="dy-text-img">点击「刷新」生成随机剧情相关内容</div></div><div class="Nicole-dy-video-overlay"></div></div>';
        html+='<div class="Nicole-dy-video-indicator" id="dy-indicator"></div>';
        html+='<div class="Nicole-dy-danmaku" id="dy-danmaku"></div>';
        html+='<div class="Nicole-dy-right-bar">';
        html+='<div class="Nicole-dy-action" id="dy-like"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg><span id="dy-like-count">0</span></div>';
        html+='<div class="Nicole-dy-action" id="dy-comment-btn"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><span id="dy-comment-count">0</span></div>';
        html+='<div class="Nicole-dy-action"><svg viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg><span id="dy-share-count">0</span></div>';
        html+='</div>';
        html+='<div class="Nicole-dy-bottom-info"><div class="Nicole-dy-author" id="dy-author">@'+randUsername()+'</div>';
        html+='<div class="Nicole-dy-desc" id="dy-desc">点击「刷新」随机生成剧情相关抖音视频（不少于5条），点击视频左右两侧切换</div>';
        html+='<div class="Nicole-dy-music"><svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg><span id="dy-music">原声 - '+charInfo.name+'</span></div></div>';
        html+='<div class="Nicole-dy-comment-panel" id="dy-comment-panel"><div class="Nicole-dy-comment-hd"><span id="dy-comment-title">评论</span><div class="Nicole-dy-comment-close" id="dy-comment-close">×</div></div><div class="Nicole-dy-comment-list" id="dy-comment-list"></div></div>';
        html+='</div>';
        app2Body.innerHTML=html;
        Q('#dy-refresh').addEventListener('click',function(){dyGenerateContent();});
        Q('#dy-like').addEventListener('click',function(){this.classList.toggle('liked');var c=Q('#dy-like-count');c.textContent=parseInt(c.textContent||0)+(this.classList.contains('liked')?1:-1);});
        Q('#dy-comment-btn').addEventListener('click',function(){dyShowComments();});
        Q('#dy-comment-close').addEventListener('click',function(){Q('#dy-comment-panel').classList.remove('show');});
        Q('#dy-prev').addEventListener('click',function(){if(dyCurIdx>0){dyCurIdx--;dyShowVideo(dyCurIdx);}});
        Q('#dy-next').addEventListener('click',function(){if(dyCurIdx<dyVideos.length-1){dyCurIdx++;dyShowVideo(dyCurIdx);}});
        dyRenderIndicator();if(dyVideos.length>0){dyShowVideo(0);}
    }
    function dyRenderIndicator(){var ind=Q('#dy-indicator');if(!ind)return;var html='';for(var i=0;i<Math.max(dyVideos.length,1);i++){html+='<div class="Nicole-dy-video-dot'+(i===dyCurIdx?' active':'')+'"></div>';}ind.innerHTML=html;}
    function dyShowVideo(idx){
        if(!dyVideos[idx])return;dyCurIdx=idx;var v=dyVideos[idx];
        if(Q('#dy-text-img'))Q('#dy-text-img').textContent=v.desc||'暂无内容';
        if(Q('#dy-author'))Q('#dy-author').textContent='@'+(v.author||randUsername());
        if(Q('#dy-desc'))Q('#dy-desc').textContent=v.desc||'';
        if(Q('#dy-music'))Q('#dy-music').textContent=v.music||'原声';
        if(Q('#dy-like-count'))Q('#dy-like-count').textContent=v.likes||0;
        if(Q('#dy-comment-count'))Q('#dy-comment-count').textContent=v.comments?v.comments.length:0;
        if(Q('#dy-share-count'))Q('#dy-share-count').textContent=v.shares||0;
        dyRenderIndicator();stopDyDanmaku();if(v.danmaku&&v.danmaku.length>0){dyStartDanmaku(v.danmaku);}
    }
    function dyStartDanmaku(list){
        var container=Q('#dy-danmaku');if(!container)return;container.innerHTML='';var idx=0;
        dyDanmakuTimer=setInterval(function(){
            if(!Q('#dy-danmaku')){stopDyDanmaku();return;}
            var text=list[idx%list.length];idx++;
            var item=document.createElement('div');item.className='Nicole-dy-danmaku-item';item.textContent=text;
            item.style.top=(Math.random()*45+5)+'%';item.style.animationDuration=(Math.random()*4+6)+'s';item.style.animationName='dy-danmaku-scroll';
            container.appendChild(item);setTimeout(function(){if(item.parentNode)item.parentNode.removeChild(item);},11000);
        },2200);
    }
    function dyShowComments(){
        var v=dyVideos[dyCurIdx];var panel=Q('#dy-comment-panel'),list=Q('#dy-comment-list'),title=Q('#dy-comment-title');
        if(!panel||!list)return;
        if(!v||!v.comments||v.comments.length===0){list.innerHTML='<div class="Nicole-app-empty">暂无评论</div>';}
        else{
            var html='';
            v.comments.forEach(function(c){html+='<div class="Nicole-dy-comment-item"><div class="Nicole-dy-comment-body"><div class="Nicole-dy-comment-user">'+(c.user||randUsername())+'</div><div class="Nicole-dy-comment-text">'+(c.text||'')+'</div><div class="Nicole-dy-comment-time">刚刚</div></div></div>';});
            list.innerHTML=html;
        }
        title.textContent='评论 ('+(v&&v.comments?v.comments.length:0)+')';panel.classList.add('show');
    }
    function dyGenerateContent(){
        var charInfo=getCharInfo();var apiCfg=null;
        try{var saved=NcStore.get('Nc-api-config');if(saved)apiCfg=JSON.parse(saved);}catch(e){}
        if(!apiCfg||!apiCfg.url||!apiCfg.key){Q('#dy-desc').textContent='请先在「电话-设置」中配置API地址和密钥';return;}
        Q('#dy-desc').textContent='正在随机生成剧情相关抖音内容（5条）...';stopDyDanmaku();
        var prompt='你是抖音内容创作者。根据以下当前剧情上下文，随机生成5条抖音短视频内容，内容要和当前剧情/角色/场景相关，但风格随机、视角随机，可以是剧情片段、场景描写、角色独白、幕后花絮等。\n当前剧情上下文：\n'+(getStoryContext()||'暂无剧情')+'\n\n严格输出JSON数组，每条含：[{"desc":"视频文案，50字内","music":"BGM名","likes":点赞数,"shares":分享数,"danmaku":["弹幕1","弹幕2","弹幕3","弹幕4","弹幕5"],"comments":[{"user":"随机用户名","text":"评论文本"}]},...共5条]\n弹幕和评论要像真实观众反应，用户名随机。只输出JSON数组。';
        var body=JSON.stringify({model:apiCfg.model||'gpt-4o-mini',messages:[{role:'user',content:prompt}],temperature:0.85,max_tokens:2000});
        fetch(apiCfg.url.replace(/\/+$/,'')+'/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiCfg.key},body:body})
            .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
            .then(function(res){
                var content=res.choices&&res.choices[0]&&res.choices[0].message?res.choices[0].message.content:'';
                var arrMatch=content.match(/\[[\s\S]*\]/);
                if(arrMatch){try{var arr=JSON.parse(arrMatch[0]);if(Array.isArray(arr)&&arr.length>0){dyVideos=arr.slice(0,Math.max(arr.length,5));dyCurIdx=0;dyShowVideo(0);if(arr.length<5)Q('#dy-desc').textContent='仅生成'+arr.length+'条，建议重试';}else{Q('#dy-desc').textContent='生成为空，请重试';}}catch(e){Q('#dy-desc').textContent='解析失败，请重试';}}
                else{Q('#dy-desc').textContent='格式异常，请重试';}
            })
            .catch(function(e){Q('#dy-desc').textContent='API失败: '+e.message;});
    }

    // ===== 通用App API调用 =====
    function appApiCall(prompt,maxTokens,onSuccess,onError){
        var apiCfg=null;try{var saved=NcStore.get('Nc-api-config');if(saved)apiCfg=JSON.parse(saved);}catch(e){}
        if(!apiCfg||!apiCfg.url||!apiCfg.key){onError('请先在「电话-设置」配置API');return;}
        var body=JSON.stringify({model:apiCfg.model||'gpt-4o-mini',messages:[{role:'user',content:prompt}],temperature:0.8,max_tokens:maxTokens||1500});
        fetch(apiCfg.url.replace(/\/+$/,'')+'/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiCfg.key},body:body})
            .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
            .then(function(res){
                var content=res.choices&&res.choices[0]&&res.choices[0].message?res.choices[0].message.content:'';
                var m=content.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
                if(m){try{onSuccess(JSON.parse(m[0]));}catch(e){onError('解析失败');}}else{onError('格式异常');}
            })
            .catch(function(e){onError('API失败: '+e.message);});
    }

    // ===== 相册App =====
    var galleryPhotos=[];
    function renderGalleryApp(){
        var charInfo=getCharInfo();
        var html='<div class="Nicole-app-refreshbar"><span class="Nicole-app-refreshbar-title" id="gallery-title">相册</span><div style="display:flex;gap:8px;"><button class="Nicole-app-refreshbtn" id="gallery-upload" style="background:#f2f2f2;color:#333;padding:6px 10px;font-size:16px;line-height:1;">+</button><button class="Nicole-app-refreshbtn" id="gallery-refresh">刷新</button></div></div>';
        html+='<div style="padding:12px;">';
        if(galleryPhotos.length===0){
            html+='<div class="Nicole-app-empty">相册为空<br>点击「+」上传图片，或「刷新」随机生成剧情相关文字图<button id="gallery-gen">立即生成</button></div>';
        }else{
            html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;">';
            galleryPhotos.forEach(function(p){
                if(p.url&&p.url.startsWith('data:')){
                    html+='<div style="aspect-ratio:1;background-image:url(\''+p.url+'\');background-size:cover;background-position:center;"></div>';
                }else{
                    var colors=['linear-gradient(135deg,#667eea,#764ba2)','linear-gradient(135deg,#f093fb,#f5576c)','linear-gradient(135deg,#4facfe,#00f2fe)','linear-gradient(135deg,#43e97b,#38f9d7)','linear-gradient(135deg,#fa709a,#fee140)','linear-gradient(135deg,#30cfd0,#330867)'];
                    var bg=colors[Math.abs((p.title||'').length)%colors.length];
                    html+='<div style="aspect-ratio:1;background:'+bg+';display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;color:#fff;font-size:11px;line-height:1.4;font-weight:500;word-break:break-word;text-shadow:0 1px 3px rgba(0,0,0,.3);">'+(p.title||'')+'</div>';
                }
            });
            html+='</div>';
        }
        html+='</div>';app2Body.innerHTML=html;
        var rf=Q('#gallery-refresh'),gn=Q('#gallery-gen'),up=Q('#gallery-upload');
        if(rf)rf.addEventListener('click',function(){galleryGenerate();});
        if(gn)gn.addEventListener('click',function(){galleryGenerate();});
        if(up)up.addEventListener('click',function(){
            var fi=document.createElement('input');fi.type='file';fi.accept='image/*';
            fi.onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(re){galleryPhotos.unshift({url:re.target.result,title:'上传图片'});renderGalleryApp();};r.readAsDataURL(f);};fi.click();
        });
    }
    function galleryGenerate(){
        var charInfo=getCharInfo();Q('#gallery-title').textContent='生成中...';
        var prompt='根据以下当前剧情上下文，随机列出6张和剧情/角色/场景相关的画面描述，风格随机，可以是场景截图、角色瞬间、物品特写、氛围画面等。\n当前剧情上下文：\n'+(getStoryContext()||'暂无剧情')+'\n\n输出JSON数组：[{"title":"画面描述，15字以内"}]\n只输出JSON数组。';
        appApiCall(prompt,800,function(data){
            if(Array.isArray(data)){
                galleryPhotos=data.map(function(d){return {title:d.title||'剧情画面'};});
                renderGalleryApp();
            }else{Q('#gallery-title').textContent='生成失败';}
        },function(err){Q('#gallery-title').textContent=err;});
    }

    // ===== Instagram App =====
    var insPosts=[];
    function renderInsApp(){
        var charInfo=getCharInfo();
        var html='<div class="Nicole-app-refreshbar"><span class="Nicole-app-refreshbar-title" id="ins-title">Instagram</span><button class="Nicole-app-refreshbtn" id="ins-refresh">刷新</button></div>';
        if(insPosts.length===0){
            html+='<div class="Nicole-app-empty">暂无动态<br>点击「刷新」随机生成剧情相关ins帖子<button id="ins-gen">立即生成</button></div>';
        }else{
            insPosts.forEach(function(p){
                var colors=['linear-gradient(135deg,#667eea,#764ba2)','linear-gradient(135deg,#f093fb,#f5576c)','linear-gradient(135deg,#4facfe,#00f2fe)','linear-gradient(135deg,#43e97b,#38f9d7)','linear-gradient(135deg,#fa709a,#fee140)'];
                var bg=colors[Math.abs((p.desc||'').length)%colors.length];
                html+='<div style="background:#fff;margin-bottom:10px;">';
                html+='<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;"><div style="width:28px;height:28px;border-radius:50%;background:'+bg+';display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;">'+(p.user||randUsername()).charAt(0)+'</div><div style="font-size:12px;font-weight:600;color:#222;">'+(p.user||randUsername())+'</div></div>';
                html+='<div style="aspect-ratio:1;background:'+bg+';display:flex;align-items:center;justify-content:center;padding:20px;text-align:center;color:#fff;font-size:14px;line-height:1.6;font-weight:500;text-shadow:0 1px 3px rgba(0,0,0,.3);word-break:break-word;">'+(p.imgText||p.desc||'')+'</div>';
                html+='<div style="padding:10px 12px;"><div style="display:flex;gap:14px;margin-bottom:8px;font-size:13px;color:#333;"><span>♡ '+(p.likes||0)+'</span><span>💬 '+(p.comments||0)+'</span></div>';
                html+='<div style="font-size:13px;color:#333;line-height:1.5;">'+(p.desc||'')+'</div></div></div>';
            });
        }
        app2Body.innerHTML=html;
        var rf=Q('#ins-refresh'),gn=Q('#ins-gen');
        if(rf)rf.addEventListener('click',function(){insGenerate();});
        if(gn)gn.addEventListener('click',function(){insGenerate();});
    }
    function insGenerate(){
        var charInfo=getCharInfo();Q('#ins-title').textContent='生成中...';
        var prompt='根据以下当前剧情上下文，随机生成5条ins风格动态帖子，内容和剧情/角色/场景相关，风格随机，用户名随机。\n当前剧情上下文：\n'+(getStoryContext()||'暂无剧情')+'\n\n输出JSON数组：[{"user":"随机用户名","desc":"帖子文案，30字内","imgText":"图片中的文字描述，15字内","likes":点赞数,"comments":评论数}]\n只输出JSON数组。';
        appApiCall(prompt,1200,function(data){
            if(Array.isArray(data)){
                insPosts=data.map(function(d){return {user:d.user||randUsername(),desc:d.desc||'',imgText:d.imgText||d.desc||'',likes:d.likes||Math.floor(Math.random()*5000),comments:d.comments||Math.floor(Math.random()*200)};});
                renderInsApp();
            }else{Q('#ins-title').textContent='生成失败';}
        },function(err){Q('#ins-title').textContent=err;});
    }

    // ===== 微博App =====
    var weiboPosts=[];
    function renderWeiboApp(){
        var charInfo=getCharInfo();
        var html='<div class="Nicole-app-refreshbar"><span class="Nicole-app-refreshbar-title" id="weibo-title">微博</span><button class="Nicole-app-refreshbtn" id="weibo-refresh">刷新</button></div>';
        html+='<div style="padding:10px 12px;">';
        if(weiboPosts.length===0){
            html+='<div class="Nicole-app-empty">暂无微博<br>点击「刷新」随机生成剧情相关微博<button id="weibo-gen">立即生成</button></div>';
        }else{
            weiboPosts.forEach(function(p){
                var uname=p.user||randUsername();
                html+='<div style="background:#fff;border-radius:12px;padding:14px;margin-bottom:10px;box-shadow:0 1px 4px rgba(0,0,0,.04);">';
                html+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">';
                html+='<div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:600;">'+uname.charAt(0)+'</div>';
                html+='<div><div style="font-size:13px;font-weight:600;color:#222;">'+uname+'</div><div style="font-size:11px;color:#999;">'+(p.time||'刚刚')+'</div></div></div>';
                html+='<div style="font-size:13px;color:#333;line-height:1.6;margin-bottom:10px;">'+(p.text||'')+'</div>';
                html+='<div style="display:flex;justify-content:space-around;font-size:11px;color:#999;padding-top:8px;border-top:.5px solid #f0f0f0;">';
                html+='<span>转发 '+(p.reposts||0)+'</span><span>评论 '+(p.comments||0)+'</span><span>赞 '+(p.likes||0)+'</span>';
                html+='</div></div>';
            });
        }
        html+='</div>';app2Body.innerHTML=html;
        var rf=Q('#weibo-refresh'),gn=Q('#weibo-gen');
        if(rf)rf.addEventListener('click',function(){weiboGenerate();});
        if(gn)gn.addEventListener('click',function(){weiboGenerate();});
    }
    function weiboGenerate(){
        var charInfo=getCharInfo();Q('#weibo-title').textContent='生成中...';
        var prompt='根据以下当前剧情上下文，随机生成5条微博风格动态，内容和剧情/角色/场景相关，风格随机，用户名随机，可以是吐槽、爆料、感想、新闻等。\n当前剧情上下文：\n'+(getStoryContext()||'暂无剧情')+'\n\n输出JSON数组：[{"user":"随机用户名","text":"微博正文，80字内","reposts":转发数,"comments":评论数,"likes":点赞数}]\n只输出JSON数组。';
        appApiCall(prompt,1200,function(data){
            if(Array.isArray(data)){
                weiboPosts=data.map(function(d){return {user:d.user||randUsername(),text:d.text||'',reposts:d.reposts||Math.floor(Math.random()*500),comments:d.comments||Math.floor(Math.random()*200),likes:d.likes||Math.floor(Math.random()*5000),time:['刚刚','5分钟前','1小时前','2小时前','昨天'][Math.floor(Math.random()*5)]};});
                renderWeiboApp();
            }else{Q('#weibo-title').textContent='生成失败';}
        },function(err){Q('#weibo-title').textContent=err;});
    }

    // ===== 情侣问答App =====
    var coupleQuestions=[];
    function renderCoupleApp(){
        var charInfo=getCharInfo();
        var html='<div class="Nicole-app-refreshbar"><span class="Nicole-app-refreshbar-title" id="couple-title">情侣问答</span><button class="Nicole-app-refreshbtn" id="couple-refresh">刷新</button></div>';
        html+='<div class="Nicole-couple-list" id="couple-list">';
        if(coupleQuestions.length===0){
            html+='<div class="Nicole-app-empty">暂无题目<br>点击「刷新」生成15道关于你和'+charInfo.name+'的情侣问答<button id="couple-gen">立即生成</button></div>';
        }else{
            coupleQuestions.forEach(function(q,i){
                html+='<div class="Nicole-couple-card">';
                html+='<div class="Nicole-couple-q"><span class="Nicole-couple-qnum">'+(i+1)+'</span>'+(q.question||'')+'</div>';
                html+='<textarea class="Nicole-couple-input" id="couple-in-'+i+'" rows="2" placeholder="写下你的答案..."></textarea>';
                html+='<button class="Nicole-couple-btn" id="couple-btn-'+i+'">显示'+charInfo.name+'的答案</button>';
                html+='<div class="Nicole-couple-answer" id="couple-ans-'+i+'"><div class="Nicole-couple-answer-label">'+charInfo.name+'的答案</div><div class="Nicole-couple-answer-text">'+(q.answer||'')+'</div></div>';
                html+='</div>';
            });
        }
        html+='</div>';
        app2Body.innerHTML=html;
        var rf=Q('#couple-refresh'),gn=Q('#couple-gen');
        if(rf)rf.addEventListener('click',function(){coupleGenerate();});
        if(gn)gn.addEventListener('click',function(){coupleGenerate();});
        coupleQuestions.forEach(function(q,i){
            var btn=Q('#couple-btn-'+i);
            if(btn)btn.addEventListener('click',function(){
                var ans=Q('#couple-ans-'+i);
                if(ans){ans.classList.toggle('show');this.textContent=ans.classList.contains('show')?'隐藏答案':'显示'+charInfo.name+'的答案';this.classList.toggle('revealed',ans.classList.contains('show'));}
            });
        });
    }
    function coupleGenerate(){
        var charInfo=getCharInfo();Q('#couple-title').textContent='生成中...';
        var userName='我';
        try{userName=window.user_name||window.userName||'我';}catch(e){}
        var prompt='你是情侣问答游戏出题人。根据以下角色完整信息，生成15道关于该角色和用户之间的情侣问答题，题目要有趣、走心、有梗，涵盖性格、喜好、回忆、假设、亲密互动等方面。每道题都要给出角色会给出的答案。\n\n角色名：'+charInfo.name+'\n角色描述：'+(charInfo.desc||'无')+'\n角色性格：'+(charInfo.personality||'无')+'\n场景设定：'+(charInfo.scenario||'无')+'\n世界书：'+(charInfo.worldInfo||'无')+'\n开场白：'+(charInfo.firstMes||'无')+'\n用户：'+userName+'\n\n严格输出JSON数组，共15项：[{"question":"问题文本","answer":"角色会给出的答案文本"}]\n答案要符合角色人设和语气。只输出JSON数组。';
        appApiCall(prompt,2500,function(data){
            if(Array.isArray(data)&&data.length>0){
                coupleQuestions=data.slice(0,15);
                while(coupleQuestions.length<15){coupleQuestions.push({question:'补充问题',answer:'补充答案'});}
                renderCoupleApp();
            }else{Q('#couple-title').textContent='生成失败';}
        },function(err){Q('#couple-title').textContent=err;});
    }

    // ===== 备忘录App (iOS风格) =====
    var memoList=[],memoView='list';
    function renderMemoApp(){
        memoView='list';
        var charInfo=getCharInfo();
        var html='<div class="Nicole-app-refreshbar"><span class="Nicole-app-refreshbar-title" id="memo-title">备忘录</span><button class="Nicole-app-refreshbtn" id="memo-refresh">刷新</button></div>';
        html+='<div class="Nicole-memo-list" id="memo-list">';
        if(memoList.length===0){
            html+='<div class="Nicole-app-empty">暂无备忘录<br>点击「刷新」生成'+charInfo.name+'的备忘录<button id="memo-gen">立即生成</button></div>';
        }else{
            memoList.forEach(function(m,i){
                html+='<div class="Nicole-memo-item '+(m.type==='voice'?'voice':'')+'" data-idx="'+i+'">';
                html+='<div class="Nicole-memo-item-title">'+(m.title||'无标题')+'</div>';
                html+='<div class="Nicole-memo-item-preview">'+(m.preview||(m.type==='voice'?'语音备忘录':m.content||''))+'</div>';
                html+='<div class="Nicole-memo-item-date">'+(m.date||'今天')+'</div>';
                html+='</div>';
            });
        }
        html+='</div>';
        app2Body.innerHTML=html;
        var rf=Q('#memo-refresh'),gn=Q('#memo-gen');
        if(rf)rf.addEventListener('click',function(){memoGenerate();});
        if(gn)gn.addEventListener('click',function(){memoGenerate();});
        QA('.Nicole-memo-item').forEach(function(el){
            el.addEventListener('click',function(){var idx=parseInt(this.getAttribute('data-idx'));renderMemoDetail(idx);});
        });
    }
    function renderMemoDetail(idx){
        if(!memoList[idx])return;
        memoView='detail';
        var m=memoList[idx];
        var html='<div class="Nicole-app-refreshbar"><span class="Nicole-memo-back" id="memo-back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>备忘录</span><div style="width:60px;"></div></div>';
        html+='<div class="Nicole-memo-detail">';
        html+='<div class="Nicole-memo-detail-title">'+(m.title||'无标题')+'</div>';
        html+='<div class="Nicole-memo-detail-date">'+(m.date||'今天')+(m.type==='voice'?' · 语音备忘录':'')+'</div>';
        if(m.type==='voice'){
            html+='<div class="Nicole-memo-voice-player"><div class="Nicole-memo-voice-play" id="memo-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg></div><div class="Nicole-memo-voice-wave">';
            for(var w=0;w<20;w++){html+='<div class="Nicole-memo-voice-bar" style="height:'+(20+Math.random()*80)+'%"></div>';}
            html+='</div><div class="Nicole-memo-voice-time">'+(m.duration||'0:32')+'</div></div>';
        }
        html+='<div class="Nicole-memo-detail-body">'+(m.content||'')+'</div>';
        html+='</div>';
        app2Body.innerHTML=html;
        var bk=Q('#memo-back');
        if(bk)bk.addEventListener('click',function(){renderMemoApp();});
        var pl=Q('#memo-play');
        if(pl)pl.addEventListener('click',function(){this.classList.toggle('playing');var bars=QA('.Nicole-memo-voice-bar');bars.forEach(function(b){b.style.animationPlayState=b.style.animationPlayState==='paused'?'running':'paused';});});
    }
    function memoGenerate(){
        var charInfo=getCharInfo();Q('#memo-title').textContent='生成中...';
        var prompt='你是角色'+charInfo.name+'。根据以下角色完整信息，生成这个角色的备忘录内容，不少于6条，包括文本备忘录和语音备忘录。内容要符合角色人设，可以是待办、想法、回忆、提醒、秘密、碎碎念等。\n\n角色名：'+charInfo.name+'\n角色描述：'+(charInfo.desc||'无')+'\n角色性格：'+(charInfo.personality||'无')+'\n场景设定：'+(charInfo.scenario||'无')+'\n世界书：'+(charInfo.worldInfo||'无')+'\n开场白：'+(charInfo.firstMes||'无')+'\n\n严格输出JSON数组，每项含：[{"type":"text或voice","title":"备忘录标题","content":"备忘录正文内容","date":"日期如 今天/昨天/8月20日","preview":"列表预览文字20字内","duration":"语音时长如0:32，仅voice类型需要"}]\n至少6条，其中至少2条语音备忘录。只输出JSON数组。';
        appApiCall(prompt,2000,function(data){
            if(Array.isArray(data)&&data.length>0){
                memoList=data.slice(0,Math.max(data.length,6));
                renderMemoApp();
            }else{Q('#memo-title').textContent='生成失败';}
        },function(err){Q('#memo-title').textContent=err;});
    }

    QA('.Nicole-ptab').forEach(function(tab){tab.addEventListener('click',function(){QA('.Nicole-ptab').forEach(function(t){t.classList.remove('active');});this.classList.add('active');renderPhoneTab(this.getAttribute('data-target'));});});

    function renderPhoneTab(tabType){
        phoneContent.innerHTML='';
        if(tabType==='recents'){
            if(phoneHistory.length===0){phoneContent.innerHTML='<div style="text-align:center;padding-top:100px;color:#aaa;font-size:14px;">暂无通话记录</div>';}
            else{var html='';phoneHistory.forEach(function(h){html+='<div class="Nicole-list-item"><div><div class="Nicole-item-title" style="color:'+(h.type==='out'?'#222':'#555')+';">'+h.name+'</div><div class="Nicole-item-sub">手机 - '+h.time+'</div></div><div class="Nicole-item-arrow"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div></div>';});phoneContent.innerHTML=html;}
        }else if(tabType==='contacts'){
            var cHtml='';phoneContacts.forEach(function(c,i){cHtml+='<div class="Nicole-list-item j-contact" data-idx="'+i+'"><div class="Nicole-item-title">'+c.name+'</div></div>';});phoneContent.innerHTML=cHtml;
            QA('.j-contact').forEach(function(el){el.addEventListener('click',function(){var idx=parseInt(this.getAttribute('data-idx'));renderContactDetail(phoneContacts[idx],idx);});});
        }else if(tabType==='dialpad'){
            var savedApi=NcStore.get('Nc-api-config');
            var apiCfg=savedApi?JSON.parse(savedApi):{url:'',key:'',model:''};
            var aHtml='<div style="padding:20px 16px 10px;">';
            aHtml+='<div style="font-size:16px;font-weight:600;color:#222;margin-bottom:20px;text-align:center;letter-spacing:.5px;">API 连接设置</div>';
            aHtml+='<div class="Nicole-api-section"><label class="Nicole-api-label">API 地址 (Base URL)</label>';
            aHtml+='<input type="text" class="Nicole-api-input" id="api-url" value="'+apiCfg.url.replace(/"/g,'&quot;')+'" placeholder="https://api.openai.com/v1"></div>';
            aHtml+='<div class="Nicole-api-section"><label class="Nicole-api-label">API 密钥 (API Key)</label>';
            aHtml+='<input type="password" class="Nicole-api-input" id="api-key" value="'+apiCfg.key.replace(/"/g,'&quot;')+'" placeholder="sk-..."></div>';
            aHtml+='<div class="Nicole-api-section"><label class="Nicole-api-label">模型名称 (Model)</label>';
            aHtml+='<div style="display:flex;gap:6px;"><select class="Nicole-api-input" id="api-model" style="flex:1;"><option value="'+apiCfg.model.replace(/"/g,'&quot;')+'">'+apiCfg.model.replace(/"/g,'&quot;')+'</option></select><button class="Nicole-api-btn" id="api-fetch-models" style="padding:6px 10px;font-size:11px;white-space:nowrap;" title="从API拉取可用模型列表">拉取模型</button></div></div>';
            aHtml+='<div class="Nicole-api-status" id="api-status" style="color:#bbb;">'+(apiCfg.url?'已保存配置，点击测试连接':'未配置')+'</div>';
            aHtml+='<div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="Nicole-api-btn test" id="api-test">测试连接</button><button class="Nicole-api-btn" id="api-balance" style="background:#2196f3;">查看余额</button><button class="Nicole-api-btn save" id="api-save">保存设置</button></div>';
            aHtml+='</div>';
            phoneContent.innerHTML=aHtml;
            Q('#api-save').addEventListener('click',function(){
                var cfg={url:Q('#api-url').value.trim(),key:Q('#api-key').value.trim(),model:Q('#api-model').value.trim()};
                NcStore.set('Nc-api-config',JSON.stringify(cfg));
                var st=Q('#api-status');st.textContent='设置已保存 ✓';st.style.color='#4caf50';
                playSwoosh();
            });
            // 拉取模型列表
            Q('#api-fetch-models').addEventListener('click',function(){
                var url=Q('#api-url').value.trim();
                var key=Q('#api-key').value.trim();
                var st=Q('#api-status');
                var modelSelect=Q('#api-model');
                if(!url){st.textContent='请先填写API地址';st.style.color='#ff6b6b';return;}
                if(!url.startsWith('http'))url='https://'+url;
                st.textContent='正在拉取模型列表...';st.style.color='#999';
                var baseUrl=url.replace(/\/+$/,'');
                var endpoints=['/models','/v1/models'];
                var tryIdx=0;
                function tryFetchModels(){
                    if(tryIdx>=endpoints.length){
                        st.textContent='拉取失败: 无法获取模型列表，请检查地址或CORS设置';st.style.color='#ff6b6b';return;
                    }
                    var fetchUrl=baseUrl+endpoints[tryIdx];
                    tryIdx++;
                    fetch(fetchUrl,{
                        method:'GET',
                        headers:key?{'Authorization':'Bearer '+key,'Content-Type':'application/json'}:{'Content-Type':'application/json'}
                    }).then(function(r){
                        if(!r.ok){if(r.status===404){tryFetchModels();}else{st.textContent='拉取失败: HTTP '+r.status;st.style.color='#ff6b6b';}return;}
                        return r.json();
                    }).then(function(data){
                        if(!data)return;
                        var models=[];
                        if(Array.isArray(data)){models=data.map(function(m){return typeof m==='string'?m:m.id;});}
                        else if(data.data&&Array.isArray(data.data)){models=data.data.map(function(m){return m.id;});}
                        else if(data.models&&Array.isArray(data.models)){models=data.models.map(function(m){return typeof m==='string'?m:m.id;});}
                        if(models.length===0){st.textContent='未找到模型列表数据';st.style.color='#ff9800';return;}
                        // 填充下拉框
                        var currentVal=modelSelect.value;
                        modelSelect.innerHTML='';
                        models.sort().forEach(function(m){
                            var opt=document.createElement('option');
                            opt.value=m;opt.textContent=m;
                            if(m===currentVal)opt.selected=true;
                            modelSelect.appendChild(opt);
                        });
                        st.textContent='已拉取 '+models.length+' 个模型 ✓';st.style.color='#4caf50';
                        playSwoosh();
                    }).catch(function(e){
                        var errMsg=e.message||'';
                        if(errMsg.indexOf('Failed to fetch')>=0||errMsg.indexOf('CORS')>=0){
                            st.innerHTML='<span style="color:#ff9800;">⚠ CORS限制: 浏览器阻止了跨域请求</span><br><span style="font-size:11px;color:#999;">请在API服务端启用CORS，或使用代理服务器</span>';
                            st.style.color='#ff9800';
                        }else{
                            tryFetchModels();
                        }
                    });
                }
                tryFetchModels();
            });
            // 查看API余额
            Q('#api-balance').addEventListener('click',function(){
                var url=Q('#api-url').value.trim();
                var key=Q('#api-key').value.trim();
                var st=Q('#api-status');
                if(!url){st.textContent='请先填写API地址';st.style.color='#ff6b6b';return;}
                if(!url.startsWith('http'))url='https://'+url;
                st.textContent='正在查询余额...';st.style.color='#999';
                var baseUrl=url.replace(/\/+$/,'');
                // 尝试多个常见的余额查询端点
                var endpoints=[
                    '/dashboard/billing/credit_grants',
                    '/v1/dashboard/billing/credit_grants',
                    '/v1/users/me/usage',
                    '/v1/balance',
                    '/api/balance'
                ];
                var tryIdx=0;
                function tryFetchBalance(){
                    if(tryIdx>=endpoints.length){
                        st.innerHTML='<span style="color:#ff9800;">⚠ 无法查询余额</span><br><span style="font-size:11px;color:#999;">该API可能不支持余额查询端点，或CORS限制</span>';
                        st.style.color='#ff9800';return;
                    }
                    var fetchUrl=baseUrl+endpoints[tryIdx];
                    tryIdx++;
                    fetch(fetchUrl,{
                        method:'GET',
                        headers:key?{'Authorization':'Bearer '+key,'Content-Type':'application/json'}:{'Content-Type':'application/json'}
                    }).then(function(r){
                        if(!r.ok){if(r.status===404){tryFetchBalance();}else if(r.status===401){st.textContent='API密钥无效 (401)';st.style.color='#ff6b6b';}else{st.textContent='查询失败: HTTP '+r.status;st.style.color='#ff6b6b';}return;}
                        return r.json();
                    }).then(function(data){
                        if(!data)return;
                        // 解析多种余额格式
                        var balance='',total='',used='',expiry='';
                        if(data.total_available!==undefined){balance='$'+data.total_available;}
                        if(data.total_granted!==undefined){total='$'+data.total_granted;}
                        if(data.total_used!==undefined){used='$'+data.total_used;}
                        if(data.grants&&data.grants.data){
                            var grant=data.grants.data[0];
                            if(grant){if(grant.total_granted!==undefined)total='$'+grant.total_granted;if(grant.total_used!==undefined)used='$'+grant.total_used;if(grant.expires_at)expiry=new Date(grant.expires_at*1000).toLocaleDateString();}
                        }
                        if(data.balance!==undefined){balance=typeof data.balance==='number'?'$'+data.balance:data.balance;}
                        if(data.credits!==undefined){balance=data.credits+' credits';}
                        if(data.data&&data.data.attributes){var attr=data.data.attributes;if(attr.user_balance!==undefined)balance=attr.user_balance;}
                        var html='<span style="color:#4caf50;">✓ 余额查询成功</span><br>';
                        if(balance)html+='<span style="font-size:13px;">可用余额: <b>'+balance+'</b></span><br>';
                        if(total)html+='<span style="font-size:11px;color:#999;">总额度: '+total+'</span><br>';
                        if(used)html+='<span style="font-size:11px;color:#999;">已使用: '+used+'</span><br>';
                        if(expiry)html+='<span style="font-size:11px;color:#999;">到期时间: '+expiry+'</span>';
                        if(!balance&&!total&&!used){html='<span style="color:#ff9800;">⚠ 未找到余额数据</span><br><span style="font-size:11px;color:#999;">API返回了数据但格式不兼容</span>';}
                        st.innerHTML=html;st.style.color='#4caf50';
                        playSwoosh();
                    }).catch(function(e){
                        var errMsg=e.message||'';
                        if(errMsg.indexOf('Failed to fetch')>=0||errMsg.indexOf('CORS')>=0){
                            st.innerHTML='<span style="color:#ff9800;">⚠ CORS限制</span><br><span style="font-size:11px;color:#999;">浏览器阻止了跨域请求，请使用代理服务器</span>';
                            st.style.color='#ff9800';
                        }else{
                            tryFetchBalance();
                        }
                    });
                }
                tryFetchBalance();
            });
            Q('#api-test').addEventListener('click',function(){
                var url=Q('#api-url').value.trim();
                var key=Q('#api-key').value.trim();
                var model=Q('#api-model').value.trim();
                var st=Q('#api-status');
                if(!url){st.textContent='请先填写API地址';st.style.color='#ff6b6b';return;}
                st.textContent='正在测试连接...';st.style.color='#999';
                // 自动补全https
                if(!url.startsWith('http'))url='https://'+url;
                // 保存当前配置
                var cfg={url:url,key:key,model:model};
                NcStore.set('Nc-api-config',JSON.stringify(cfg));
                // 多端点尝试：/models, /v1/models, /chat/completions
                var endpoints=['/models','/v1/models'];
                var tryIdx=0;
                function tryNextEndpoint(){
                    if(tryIdx>=endpoints.length){
                        st.textContent='连接失败: 所有端点均无响应，请检查地址或CORS设置';st.style.color='#ff6b6b';return;
                    }
                    var testUrl=url.replace(/\/+$/,'')+endpoints[tryIdx];
                    tryIdx++;
                    fetch(testUrl,{
                        method:'GET',
                        headers:key?{'Authorization':'Bearer '+key,'Content-Type':'application/json'}:{'Content-Type':'application/json'},
                        mode:'cors'
                    }).then(function(r){
                        if(r.ok){
                            st.textContent='连接成功 ✓ (端点: '+endpoints[tryIdx-1]+')';st.style.color='#4caf50';
                        }else if(r.status===401){
                            st.textContent='API密钥无效 (401)';st.style.color='#ff6b6b';
                        }else if(r.status===404){
                            tryNextEndpoint(); // 端点不存在，尝试下一个
                        }else{
                            st.textContent='连接失败: HTTP '+r.status;st.style.color='#ff6b6b';
                        }
                    }).catch(function(e){
                        // CORS错误或网络错误 - 浏览器安全限制
                        var errMsg = e.message || '';
                        var isCors = errMsg.indexOf('Failed to fetch')>=0 || 
                                     errMsg.indexOf('CORS')>=0 || 
                                     errMsg.indexOf('cross-origin')>=0 ||
                                     errMsg.indexOf('NetworkError')>=0;
                        if(isCors || tryIdx>=endpoints.length){
                            st.innerHTML='<span style="color:#ff9800;">⚠ 浏览器CORS限制</span><br><span style="font-size:11px;color:#999;">跨域请求被浏览器安全策略阻止。<br>解决方案：<br>1. 在API服务端启用CORS（Access-Control-Allow-Origin）<br>2. 或使用SillyTavern的代理服务器（推荐）<br>3. 或使用支持CORS的API网关</span>';
                            st.style.color='#ff9800';
                        }else{
                            tryNextEndpoint();
                        }
                    });
                }
                tryNextEndpoint();
            });
        }
    }
    function renderContactDetail(contact,idx){
        var avLtr=contact.name.charAt(0).toUpperCase();
        var html='<div class="Nicole-contact-detail"><div class="Nicole-c-av-wrap"><div class="Nicole-c-av">'+avLtr+'</div></div><div class="Nicole-c-input-grp"><label>姓名</label><input type="text" class="Nicole-c-input" id="c-edit-name" value="'+contact.name+'"></div><div class="Nicole-c-input-grp"><label>手机号</label><input type="text" class="Nicole-c-input" id="c-edit-phone" value="'+contact.phone+'"></div><div class="Nicole-c-btns"><button class="Nicole-c-btn save j-c-save">保存</button><button class="Nicole-c-btn call j-c-call">呼叫</button></div></div>';
        phoneContent.innerHTML=html;
        Q('.j-c-save').addEventListener('click',function(){var nn=Q('#c-edit-name').value.trim();var np=Q('#c-edit-phone').value.trim();if(nn&&np){phoneContacts[idx].name=nn;phoneContacts[idx].phone=np;playSwoosh();renderPhoneTab('contacts');}});
        Q('.j-c-call').addEventListener('click',function(){triggerCall(contact.name,contact.phone);});
    }
    function triggerCall(name,num){
        phoneHistory.unshift({name:name,phone:num,time:nowTime(),type:'out'});
        appPanel.classList.remove('show');homeScreen.classList.remove('active');
        openCallUI('voice','out');appendCmd(isBlkRight?'$[呼叫失败，拒收]':'[我电话:语音]');
    }

    Q('.Nicole-jhd-toggle').addEventListener('click',function(){Q('.Nicole-jhd').classList.toggle('collapsed');Q('.Nicole-jchat').classList.toggle('collapsed');});
    Q('.Nicole-jset-open').addEventListener('click',function(){
        var hd=Q('.Nicole-hd');
        if(hd&&hd.classList.contains('group-mode')){
            // 群聊：打开群聊设置面板
            openGroupSetting();
        }else{
            // 私聊：打开原设置
            Q('.Nicole-jset').classList.add('show');
        }
    });
    Q('.Nicole-jset-close').addEventListener('click',function(){Q('.Nicole-jset').classList.remove('show');});
    // 群聊设置面板
    function openGroupSetting(){
        var groups=JSON.parse(localStorage.getItem('Nc-group-list')||'[]');
        var group=groups.find(function(g){return g.id===finalLName;});
        if(!group)return;
        // 渲染群成员列表
        var memberBox=Q('.Nicole-jgroup-members');
        if(memberBox){
            memberBox.innerHTML=group.members.map(function(m,idx){
                var isMe=m==='我';
                var role=isMe?'群主':(idx===0?'管理员':'成员');
                return '<div class="Nicole-group-member-item"><div class="Nicole-group-member-av" style="background:'+(isMe?'#07c160':'#576b95')+';">'+m.charAt(0)+'</div><div class="Nicole-group-member-name">'+m+'<span class="Nicole-group-member-role">'+role+'</span></div>'+(isMe?'':'<button class="Nicole-group-kick-btn" data-name="'+m+'">踢人</button>')+'</div>';
            }).join('');
        }
        // 显示群信息
        var nameDisp=Q('.Nicole-jgroup-name-display');
        if(nameDisp)nameDisp.textContent=group.name;
        var countDisp=Q('.Nicole-jgroup-count-display');
        if(countDisp)countDisp.textContent=group.members.length+'人';
        // 显示面板
        var panel=Q('.Nicole-jgroup-setting');
        if(panel)panel.classList.add('show');
    }
    // 群聊设置返回按钮
    var groupBackBtn=Q('.Nicole-jgroup-setting-back');
    if(groupBackBtn)groupBackBtn.addEventListener('click',function(){var p=Q('.Nicole-jgroup-setting');if(p)p.classList.remove('show');});
    // 踢人
    document.addEventListener('click',function(e){
        if(e.target&&e.target.classList&&e.target.classList.contains('Nicole-group-kick-btn')){
            var name=e.target.getAttribute('data-name');
            if(confirm('确定将「'+name+'」移出群聊？')){
                var groups=JSON.parse(localStorage.getItem('Nc-group-list')||'[]');
                var group=groups.find(function(g){return g.id===finalLName;});
                if(group){
                    group.members=group.members.filter(function(m){return m!==name;});
                    localStorage.setItem('Nc-group-list',JSON.stringify(groups));
                    openGroupSetting();
                    renderSysMsg('已将「'+name+'」移出群聊');
                }
            }
        }
    });
    // 添加成员
    var groupAddBtn=Q('.Nicole-jgroup-add-member');
    if(groupAddBtn)groupAddBtn.addEventListener('click',function(){
        var list=JSON.parse(localStorage.getItem('Nc-chat-list')||'[]');
        var groups=JSON.parse(localStorage.getItem('Nc-group-list')||'[]');
        var group=groups.find(function(g){return g.id===finalLName;});
        if(!group)return;
        // 过滤已在群里的成员
        var available=list.filter(function(n){return group.members.indexOf(n)===-1;});
        if(available.length===0){renderSysMsg('所有联系人都已在群聊中');return;}
        // 简单的选择弹窗
        var name=prompt('选择要添加的联系人（输入名字）：\n\n可选：'+available.join('、'));
        if(name&&name.trim()&&available.indexOf(name.trim())!==-1){
            group.members.push(name.trim());
            localStorage.setItem('Nc-group-list',JSON.stringify(groups));
            openGroupSetting();
            renderSysMsg('已添加「'+name.trim()+'」到群聊');
        }else if(name&&name.trim()){
            renderSysMsg('该联系人不在列表中或已在群聊');
        }
    });
    // 退出并删除群聊
    var groupDismissBtn=Q('.Nicole-jgroup-dismiss');
    if(groupDismissBtn)groupDismissBtn.addEventListener('click',function(){
        if(confirm('确定退出并删除该群聊？聊天记录将被清除。')){
            var groups=JSON.parse(localStorage.getItem('Nc-group-list')||'[]');
            groups=groups.filter(function(g){return g.id!==finalLName;});
            localStorage.setItem('Nc-group-list',JSON.stringify(groups));
            localStorage.removeItem('Nc-chat-'+finalLName);
            Q('.Nicole-jgroup-setting').classList.remove('show');
            var hd=Q('.Nicole-hd');
            if(hd)hd.classList.remove('group-mode');
            finalLName='';currentCharName='';
            Q('.Nicole-jchat').innerHTML='';
            renderSysMsg('已退出并删除群聊');
        }
    });
    // 手机宽高调节
    var panelEl2=document.getElementById(PANEL_ID);
    var setW=Q('.Nicole-jset-phone-w'),setH=Q('.Nicole-jset-phone-h');
    var savedW=NcStore.get('Nc-phone-w'),savedH=NcStore.get('Nc-phone-h');
    if(savedW&&panelEl2){panelEl2.style.setProperty('--nc-phone-w',savedW+'px','important');if(setW)setW.value=parseInt(savedW);}
    if(savedH&&panelEl2){panelEl2.style.setProperty('--nc-phone-h',savedH+'px','important');if(setH)setH.value=parseInt(savedH);}
    if(setW){setW.addEventListener('change',function(){var w=parseInt(this.value)||360;if(w<240)w=240;if(w>500)w=500;NcStore.set('Nc-phone-w',w);if(panelEl2)panelEl2.style.setProperty('--nc-phone-w',w+'px','important');});}
    if(setH){setH.addEventListener('change',function(){var h=parseInt(this.value)||680;if(h<400)h=400;if(h>900)h=900;NcStore.set('Nc-phone-h',h);if(panelEl2)panelEl2.style.setProperty('--nc-phone-h',h+'px','important');});}
    // 聊天列表
    Q('.Nicole-jchatlist-back').addEventListener('click',function(){var cls=Q('.Nicole-jchatlist-screen');if(cls)cls.classList.remove('show');if(homeScreen)homeScreen.classList.add('active');});
    Q('.Nicole-jchatlist-add').addEventListener('click',function(){Q('.Nicole-jchatlist-addmenu').classList.add('show');});
    Q('.Nicole-jaddmenu-addchar').addEventListener('click',function(){Q('.Nicole-jchatlist-addmenu').classList.remove('show');Q('.Nicole-jaddchar-modal').classList.add('show');Q('.Nicole-jaddchar-input').value=finalLName||'';});
    Q('.Nicole-jaddmenu-addgroup').addEventListener('click',function(){
        Q('.Nicole-jchatlist-addmenu').classList.remove('show');
        Q('.Nicole-jaddgroup-modal').classList.add('show');
        Q('.Nicole-jaddgroup-name').value='';
        // 渲染当前聊天列表的联系人勾选框
        var list=JSON.parse(localStorage.getItem('Nc-chat-list')||'[]');
        var memberBox=Q('.Nicole-jaddgroup-members');
        if(memberBox){
            if(list.length===0){
                memberBox.innerHTML='<div style="text-align:center;color:#999;padding:20px;font-size:12px;">暂无联系人，请先添加联系人</div>';
            }else{
                memberBox.innerHTML=list.map(function(name){
                    return '<label style="display:flex;align-items:center;gap:8px;padding:6px 4px;cursor:pointer;border-bottom:1px solid #f5f5f5;"><input type="checkbox" class="Nicole-jaddgroup-check" value="'+name+'" style="width:16px;height:16px;"><span style="font-size:13px;color:#333;">'+name+'</span></label>';
                }).join('');
            }
        }
    });
    Q('.Nicole-jaddmenu-cancel').addEventListener('click',function(){Q('.Nicole-jchatlist-addmenu').classList.remove('show');});
    Q('.Nicole-jaddchar-cancel').addEventListener('click',function(){Q('.Nicole-jaddchar-modal').classList.remove('show');});
    Q('.Nicole-jaddchar-ok').addEventListener('click',function(){
        var name=Q('.Nicole-jaddchar-input').value.trim();
        if(name){
            var list=JSON.parse(localStorage.getItem('Nc-chat-list')||'[]');
            if(list.indexOf(name)===-1){list.unshift(name);localStorage.setItem('Nc-chat-list',JSON.stringify(list));}
            Q('.Nicole-jaddchar-modal').classList.remove('show');
            // 自动切换到该角色并进入聊天
            if(finalLName) saveChatForChar(finalLName);
            finalLName=name;currentCharName=name;ncManualChar=true;
            loadChatForChar(name);
            // 私聊模式：移除group-mode类
            var hd=Q('.Nicole-hd');
            if(hd)hd.classList.remove('group-mode');
            scope.querySelectorAll('.Nicole-bind-lnm').forEach(function(el){el.textContent=name;});
            var cls3=Q('.Nicole-jchatlist-screen');
            if(cls3)cls3.classList.remove('show');
            if(homeScreen) homeScreen.classList.remove('active');
            Q('.Nicole-jaddchar-input').value='';
        }
    });
    // 创建群聊确认
    Q('.Nicole-jaddgroup-cancel').addEventListener('click',function(){Q('.Nicole-jaddgroup-modal').classList.remove('show');});
    Q('.Nicole-jaddgroup-ok').addEventListener('click',function(){
        var gname=Q('.Nicole-jaddgroup-name').value.trim();
        if(!gname){renderSysMsg('请输入群聊名称');return;}
        // 从勾选框获取群成员
        var checks=document.querySelectorAll('.Nicole-jaddgroup-check:checked');
        var memberList=[];
        checks.forEach(function(c){memberList.push(c.value);});
        var groups=JSON.parse(localStorage.getItem('Nc-group-list')||'[]');
        var gid='group_'+Date.now();
        // 自动添加当前角色和用户
        if(finalLName&&memberList.indexOf(finalLName)===-1)memberList.unshift(finalLName);
        if(memberList.indexOf('我')===-1)memberList.push('我');
        groups.unshift({id:gid,name:gname,members:memberList,avatar:'',lastMsg:'群聊已创建',time:new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})});
        localStorage.setItem('Nc-group-list',JSON.stringify(groups));
        Q('.Nicole-jaddgroup-modal').classList.remove('show');
        renderChatListScreen();
        renderSysMsg('群聊「'+gname+'」创建成功，共'+memberList.length+'人');
    });
    // 收起手机
    var collapseBtn=Q('.Nicole-jcollapse');
if(collapseBtn){
    collapseBtn.addEventListener('click',function(){
        var p=document.getElementById(PANEL_ID);
        var b=document.getElementById(TOGGLE_ID);
        var f=document.getElementById(FLOAT_ID);
        if(p)p.classList.remove('show');
        if(b){
            b.style.display='flex';
            b.style.opacity='1';
            b.style.visibility='visible';
        }
        // 修复：收起后恢复容器尺寸并重新定位按钮
        if(f){
            if(window.innerWidth > 768){
                f.style.width='48px';
                f.style.height='48px';
            }
            setTimeout(function(){
                try{ window.dispatchEvent(new Event('resize')); }catch(e){}
            },50);
        }
        console.log('[Nicole] 收起手机，图标恢复');
    });
}
    // 主桌面dock收起手机图标
    var dockCollapseBtn=Q('.Nicole-jdock-collapse');
    if(dockCollapseBtn){
        dockCollapseBtn.addEventListener('click',function(){
            var p=document.getElementById(PANEL_ID);
            var b=document.getElementById(TOGGLE_ID);
            var f=document.getElementById(FLOAT_ID);
            if(p)p.classList.remove('show');
            if(b){
                b.style.display='flex';
                b.style.opacity='1';
                b.style.visibility='visible';
            }
            if(f){
                if(window.innerWidth > 768){
                    f.style.width='48px';
                    f.style.height='48px';
                }
                setTimeout(function(){
                    try{ window.dispatchEvent(new Event('resize')); }catch(e){}
                },50);
            }
            console.log('[Nicole] 主桌面收起手机，图标恢复');
        });
    }
    // 清空当前聊天记录
    var clearChatBtn=Q('.Nicole-jclear-chat');
    if(clearChatBtn){clearChatBtn.addEventListener('click',function(){if(!confirm('确定清空当前聊天记录？'))return;var panel=document.getElementById(PANEL_ID);if(panel){var cb=panel.querySelector('.Nicole-jchat');if(cb)cb.innerHTML='';}var cname=currentCharName||finalLName||'';if(cname){try{var key='Nc-chat-'+cname;localStorage.removeItem(key);}catch(e){}}});}

    var root=Q('.Nicole-root');
    var mainStage=Q('.Nicole-stage');
    var colorMap=[{id:'Nc-wrap',v:'--wrap-bg'},{id:'Nc-hdr',v:'--hdr-bg'},{id:'Nc-pull',v:'--pull-bg'},{id:'Nc-wv',v:'--wv-bg'},{id:'Nc-card',v:'--card-bg'},{id:'Nc-ftr',v:'--ftr-bg'},{id:'Nc-bub',v:'--bub-r'},{id:'Nc-bubl',v:'--bub-l'},{id:'Nc-tm',v:'--txt-main'},{id:'Nc-cdt',v:'--card-txt'},{id:'Nc-cic',v:'--card-ic'},{id:'Nc-hdt',v:'--hdr-txt'},{id:'Nc-hdi',v:'--hdr-ic'},{id:'Nc-sys',v:'--sys-txt'},{id:'Nc-cbubl',v:'--call-bub-l'},{id:'Nc-cbub',v:'--call-bub-r'},{id:'Nc-cbtxt',v:'--call-bub-txt'}];
    colorMap.forEach(function(c){
        try{
            if(!mainStage)return;
            var picker=mainStage.querySelector('[id="'+c.id+'"]');
            var txtInp=mainStage.querySelector('[id="'+c.id+'-txt"]');
            if(picker&&txtInp){
                var savedColor=NcStore.get(c.id);
                if(savedColor){mainStage.style.setProperty(c.v,savedColor,'important');picker.value=(savedColor.length===7)?savedColor:'#ffffff';txtInp.value=savedColor;}
                picker.addEventListener('input',function(){var newColor=this.value;mainStage.style.setProperty(c.v,newColor,'important');txtInp.value=newColor;NcStore.set(c.id,newColor);});
                picker.addEventListener('change',function(){var newColor=this.value;mainStage.style.setProperty(c.v,newColor,'important');NcStore.set(c.id,newColor);});
                txtInp.addEventListener('input',function(){var newColor=this.value.trim();if(/^#[0-9A-Fa-f]{6}$/.test(newColor)){mainStage.style.setProperty(c.v,newColor,'important');picker.value=newColor;}});
                txtInp.addEventListener('change',function(){var newColor=this.value.trim();if(/^#[0-9A-Fa-f]{6}$/.test(newColor)){mainStage.style.setProperty(c.v,newColor,'important');picker.value=newColor;NcStore.set(c.id,newColor);}else{this.value=NcStore.get(c.id)||'#ffffff';}});
            }
        }catch(e){}
    });

    var btnRnd=Q('.Nicole-jav-rnd'),btnSq=Q('.Nicole-jav-sq');
    if(NcStore.get('Nc-av-shape')==='sq'){root.classList.add('av-sq');if(btnRnd)btnRnd.classList.remove('active');if(btnSq)btnSq.classList.add('active');}
    // 加载分开的背景和头像
    var savedHomeBg=NcStore.get('Nc-bg-home');if(savedHomeBg){Q('.Nicole-jhome').style.backgroundImage='url(\''+savedHomeBg.replace(/'/g,'%27')+'\')';}
    var savedChatBg=NcStore.get('Nc-bg-chat');if(savedChatBg){Q('.Nicole-jbg').style.backgroundImage='url(\''+savedChatBg.replace(/'/g,'%27')+'\')';}
    var savedAvL=NcStore.get('Nc-av-left');if(savedAvL){safeLAv=savedAvL.replace(/'/g,'%27');finalLAv=savedAvL;QA('.Nicole-bind-lav,.Nicole-bind-lav-bg').forEach(function(el){el.style.backgroundImage='url(\''+safeLAv+'\')';});}
    var savedAvR=NcStore.get('Nc-av-right');if(savedAvR){safeRAv=savedAvR.replace(/'/g,'%27');finalRAv=savedAvR;QA('.Nicole-bind-rav,.Nicole-bind-rav-bg').forEach(function(el){el.style.backgroundImage='url(\''+safeRAv+'\')';});}
    if(btnRnd&&btnSq){btnRnd.addEventListener('click',function(){root.classList.remove('av-sq');btnRnd.classList.add('active');btnSq.classList.remove('active');NcStore.set('Nc-av-shape','rnd');});btnSq.addEventListener('click',function(){root.classList.add('av-sq');btnSq.classList.add('active');btnRnd.classList.remove('active');NcStore.set('Nc-av-shape','sq');});}

    var btnGlass=Q('.Nicole-jglass-glass'),btnSolid=Q('.Nicole-jglass-solid');
    if(NcStore.get('Nc-glass-mode')==='solid'){root.classList.add('solid-mode');if(btnGlass)btnGlass.classList.remove('active');if(btnSolid)btnSolid.classList.add('active');}
    if(btnGlass&&btnSolid){btnGlass.addEventListener('click',function(){root.classList.remove('solid-mode');btnGlass.classList.add('active');btnSolid.classList.remove('active');NcStore.set('Nc-glass-mode','glass');});btnSolid.addEventListener('click',function(){root.classList.add('solid-mode');btnSolid.classList.add('active');btnGlass.classList.remove('active');NcStore.set('Nc-glass-mode','solid');});}

    var bgUpload=Q('.Nicole-jbg-upload'),bgClear=Q('.Nicole-jbg-clear');
    if(bgUpload){bgUpload.addEventListener('click',function(){var fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.onchange=function(e){var f=e.target.files[0];if(!f)return;var reader=new FileReader();reader.onload=function(re){var b64=re.target.result;NcStore.set('Nc-bg-img',b64);var sfB64=b64.replace(/"/g,'&quot;').replace(/'/g,'%27');QA('.Nicole-jbg,.Nicole-jhome').forEach(function(el){el.style.backgroundImage='url(\''+sfB64+'\')';});if(!Q('.Nicole-jcall').classList.contains('video')){QA('.Nicole-call-vbg').forEach(function(el){el.style.backgroundImage='url(\''+sfB64+'\')';});};};reader.readAsDataURL(f);};fileInp.click();});}
    // 左侧头像上传
    var avLUp=Q('.Nicole-jav-l-upload');
    if(avLUp){avLUp.addEventListener('click',function(){var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(re){var b64=re.target.result;NcStore.set('Nc-av-left',b64);safeLAv=b64.replace(/'/g,'%27');finalLAv=b64;QA('.Nicole-bind-lav,.Nicole-bind-lav-bg').forEach(function(el){el.style.backgroundImage='url(\''+safeLAv+'\')';});};r.readAsDataURL(f);};fi.click();});}
    var avLClr=Q('.Nicole-jav-l-clear');
    if(avLClr){avLClr.addEventListener('click',function(){NcStore.set('Nc-av-left','');safeLAv='';finalLAv='';QA('.Nicole-bind-lav,.Nicole-bind-lav-bg').forEach(function(el){el.style.backgroundImage='';});});}
    // 右侧头像上传
    var avRUp=Q('.Nicole-jav-r-upload');
    if(avRUp){avRUp.addEventListener('click',function(){var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(re){var b64=re.target.result;NcStore.set('Nc-av-right',b64);safeRAv=b64.replace(/'/g,'%27');finalRAv=b64;QA('.Nicole-bind-rav,.Nicole-bind-rav-bg').forEach(function(el){el.style.backgroundImage='url(\''+safeRAv+'\')';});};r.readAsDataURL(f);};fi.click();});}
    var avRClr=Q('.Nicole-jav-r-clear');
    if(avRClr){avRClr.addEventListener('click',function(){NcStore.set('Nc-av-right','');safeRAv='';finalRAv='';QA('.Nicole-bind-rav,.Nicole-bind-rav-bg').forEach(function(el){el.style.backgroundImage='';});});}
    // 主页背景
    var bgHomeUp=Q('.Nicole-jbg-home-upload');
    if(bgHomeUp){bgHomeUp.addEventListener('click',function(){var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(re){var b64=re.target.result;NcStore.set('Nc-bg-home',b64);var sf=b64.replace(/'/g,'%27');Q('.Nicole-jhome').style.backgroundImage='url(\''+sf+'\')';};r.readAsDataURL(f);};fi.click();});}
    var bgHomeClr=Q('.Nicole-jbg-home-clear');
    if(bgHomeClr){bgHomeClr.addEventListener('click',function(){NcStore.set('Nc-bg-home','');Q('.Nicole-jhome').style.backgroundImage='';});}
    // 聊天背景
    var bgChatUp=Q('.Nicole-jbg-chat-upload');
    if(bgChatUp){bgChatUp.addEventListener('click',function(){var fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(re){var b64=re.target.result;NcStore.set('Nc-bg-chat',b64);var sf=b64.replace(/'/g,'%27');Q('.Nicole-jbg').style.backgroundImage='url(\''+sf+'\')';};r.readAsDataURL(f);};fi.click();});}
    var bgChatClr=Q('.Nicole-jbg-chat-clear');
    if(bgChatClr){bgChatClr.addEventListener('click',function(){NcStore.set('Nc-bg-chat','');Q('.Nicole-jbg').style.backgroundImage='';});}
    if(bgClear){bgClear.addEventListener('click',function(){NcStore.set('Nc-bg-img','none');QA('.Nicole-jbg,.Nicole-jhome').forEach(function(el){el.style.backgroundImage='none';});if(!Q('.Nicole-jcall').classList.contains('video')){QA('.Nicole-call-vbg').forEach(function(el){el.style.backgroundImage='none';});};});}

    var setLnm=Q('.Nicole-jset-lnm'),setRnm=Q('.Nicole-jset-rnm');
    if(setLnm){setLnm.value=finalLName;setLnm.addEventListener('input',function(){finalLName=this.value||'Unknown';ncManualChar=true;QA('.Nicole-bind-lnm').forEach(function(el){el.textContent=finalLName;});});}
    if(setRnm){setRnm.value=finalRName;setRnm.addEventListener('input',function(){finalRName=this.value||'Unknown';QA('.Nicole-bind-rnm').forEach(function(el){el.textContent=finalRName;});});}

    var isBlkRight=false,isBlkLeft=false;window.NcIsBlkRight=function(){return isBlkRight;};window.NcIsBlkLeft=function(){return isBlkLeft;};
    Q('.Nicole-jblk-l').addEventListener('click',function(){isBlkLeft=!isBlkLeft;this.classList.toggle('active',isBlkLeft);renderSysMsg(isBlkLeft?'已被 '+finalLName+' 拉入黑名单':'已将 '+finalRName+' 移出黑名单');});
    Q('.Nicole-jblk-r').addEventListener('click',function(){isBlkRight=!isBlkRight;this.classList.toggle('active',isBlkRight);renderSysMsg(isBlkRight?'已将 '+finalLName+' 加入黑名单':'已将 '+finalLName+' 移出黑名单');});

    Q('.Nicole-jaddfcancel').addEventListener('click',function(){Q('.Nicole-jaddfriendmodal').classList.remove('show');});
    Q('.Nicole-jaddfok').addEventListener('click',function(){var greet=Q('.Nicole-jaddgreet').value.trim()||'你好，我想重新添加你为好友。';playSwoosh();renderSysMsg('已发送好友请求验证');appendCmd('$[发送好友请求:'+greet+']');Q('.Nicole-jaddfriendmodal').classList.remove('show');Q('.Nicole-jaddgreet').value='';});

    QA('.Nicole-uname').forEach(function(el){
        el.setAttribute('contenteditable','true');
        el.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();this.blur();}});
        el.addEventListener('blur',function(){var isL=this.closest('.Nicole-jpat-l');var nV=this.textContent.trim();if(isL&&nV&&nV!==finalLName){finalLName=nV;ncManualChar=true;appendCmd('$['+finalRName+' 修改了 '+finalLName+' 的备注:'+nV+']');renderSysMsg(finalRName+' 将 '+finalLName+' 备注修改为 "'+nV+'"');}else if(!isL&&nV&&nV!==finalRName){finalRName=nV;appendCmd('$['+finalRName+' 修改了自己的名字:'+nV+']');renderSysMsg(finalRName+' 将自己的名字修改为 "'+nV+'"');}});
    });

    var langBtn=Q('.Nicole-jlang');var langMap=[{l:'zh-CN',t:'CN'},{l:'en-US',t:'US'}];var langIdx=0;langBtn.addEventListener('click',function(){langIdx=(langIdx+1)%langMap.length;langBtn.textContent=langMap[langIdx].t;});

    var chatBox=Q('.Nicole-jchat');var callBubsBox=Q('.Nicole-jcall-bubs');
    function nowTime(){var d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
    function renderSysMsg(text){var m=document.createElement('div');m.className='Nicole-sys-msg';m.innerHTML=text;chatBox.appendChild(m);setTimeout(function(){chatBox.scrollTop=chatBox.scrollHeight;},60);}
    function renderRight(inner,isRaw,hasErr){
        var row=document.createElement('div');row.className='Nicole-row right'+(hasErr?' has-err':'');
        var body=isRaw?inner:'<div class="Nicole-bub">'+inner+'</div>';
        var avStyle=safeRAv?' style="background-image:url(\''+safeRAv+'\')"':'';
        row.innerHTML='<div class="Nicole-rav Nicole-bind-rav"'+avStyle+'></div><div class="Nicole-ct">'+body+'<div class="Nicole-meta">'+nowTime()+' <span class="Nicole-tick">✓✓</span></div></div><div class="Nicole-err-icon Nicole-jerr" title="消息被拒收">!</div>';
        chatBox.appendChild(row);setTimeout(function(){chatBox.scrollTop=chatBox.scrollHeight;},60);
        if(hasErr){setTimeout(function(){renderSysMsg('对方开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。<span class="Nicole-view-rev">发送朋友验证</span>');},150);}
    }

    var curPatTarget='left';
    Q('.Nicole-jpat-l').addEventListener('click',function(e){if(e.target.classList.contains('Nicole-uav')){curPatTarget='left';Q('.Nicole-jpatin').value=finalCPat;Q('.Nicole-jpatmodal').classList.add('show');}});
    Q('.Nicole-jpat-r').addEventListener('click',function(e){if(e.target.classList.contains('Nicole-uav')){curPatTarget='right';Q('.Nicole-jpatin').value=finalUPat;Q('.Nicole-jpatmodal').classList.add('show');}});
    Q('.Nicole-jpatcancel').addEventListener('click',function(){Q('.Nicole-jpatmodal').classList.remove('show');});
    Q('.Nicole-jpatok').addEventListener('click',function(){var p=Q('.Nicole-jpatin').value.trim()||'的肩膀';if(curPatTarget==='left'){finalCPat=p;appendCmd('$['+finalLName+' 的拍一拍后缀设为:'+p+']');}else{finalUPat=p;appendCmd('$['+finalRName+' 的拍一拍后缀设为:'+p+']');}Q('.Nicole-jpatmodal').classList.remove('show');});

    function playAudioNode(bub){if(bub.classList.contains('playing'))return;bub.classList.add('playing');bub.classList.add('open');setTimeout(function(){bub.classList.remove('playing');},2000);}
    function showReplyBar(txt){pendingReply=txt;Q('.Nicole-jreptxt').textContent=txt;Q('.Nicole-jrepbar').classList.add('show');}
    Q('.Nicole-jrepclose').addEventListener('click',function(){pendingReply='';Q('.Nicole-jrepbar').classList.remove('show');});

    var zoom=Q('.Nicole-jtxtzoom'),zoomIn=Q('.Nicole-jtxtzoomin');
    var lastClickTime=0,lastClickTarget=null,targetRevokeRow=null,targetRevokeText='',targetBubNode=null;window.targetTfNode=null;

    chatBox.addEventListener('click',function(e){
        var isErr=e.target.closest('.Nicole-jerr');
        if(isErr){e.stopPropagation();Q('.Nicole-jaddfriendmodal').classList.add('show');return;}
        var pureTf=e.target.closest('.Nicole-j-pure-tf');
        if(pureTf&&!pureTf.classList.contains('got')&&!pureTf.classList.contains('returned')){window.targetTfNode=pureTf;Q('.Nicole-jtfactmodal').classList.add('show');return;}
        var isLav=e.target.closest('.Nicole-lav')||e.target.closest('.Nicole-bind-lav');
        var isRav=e.target.closest('.Nicole-rav')||e.target.closest('.Nicole-bind-rav');
        var isViewRev=e.target.closest('.Nicole-view-rev');
        var auTxtNode=e.target.closest('.Nicole-au-txt');if(auTxtNode){e.stopPropagation();return;}
        var txt=e.target.closest('.Nicole-txt-img');var gift=e.target.closest('.Nicole-gift-card,.Nicole-food-card');var cp=e.target.closest('.Nicole-cp-qacard');var mu=e.target.closest('.Nicole-mu-invite-card,.Nicole-music-share-card');var loc=e.target.closest('.Nicole-loc-card');var auBub=e.target.closest('.Nicole-au');var bub=e.target.closest('.Nicole-bub,.Nicole-img,.Nicole-au,.Nicole-tf,.Nicole-link-card,.Nicole-loc-card,.Nicole-food-card,.Nicole-interact-item');var now=Date.now();
        if(isViewRev){e.stopPropagation();Q('.Nicole-jviewtxt').value=isViewRev.getAttribute('data-txt')||'';Q('.Nicole-jviewmodal').classList.add('show');return;}
        if(auBub){if(lastClickTarget===auBub&&(now-lastClickTime<300)){targetRevokeRow=auBub.closest('.Nicole-row');targetRevokeText=auBub.getAttribute('data-txt')||'[语音]';targetBubNode=auBub;Q('.Nicole-jact-revoke').style.display=(targetRevokeRow&&targetRevokeRow.classList.contains('right'))?'block':'none';Q('.Nicole-jmsgact').classList.add('show');clearTimeout(auBub.playTimer);lastClickTime=0;}else{lastClickTime=now;lastClickTarget=auBub;auBub.playTimer=setTimeout(function(){playAudioNode(auBub);},300);}return;}
        if(bub&&!isLav&&!isRav&&!txt&&!gift&&!cp&&!mu&&!loc&&!pureTf){targetRevokeRow=bub.closest('.Nicole-row');targetRevokeText=bub.innerText||'[复杂内容]';targetBubNode=bub;Q('.Nicole-jact-revoke').style.display=(targetRevokeRow&&targetRevokeRow.classList.contains('right'))?'block':'none';Q('.Nicole-jmsgact').classList.add('show');return;}
        if(isLav||isRav){if(now-lastClickTime<300&&lastClickTarget===e.target){if(isLav){renderSysMsg(finalRName+' 拍了拍 '+finalLName+' '+finalCPat);appendCmd('[我拍一拍:'+finalCPat+']');}else{renderSysMsg(finalRName+' 拍了拍自己 '+finalUPat);appendCmd('[我拍一拍:'+finalUPat+']');}lastClickTime=0;return;}}
        lastClickTime=now;lastClickTarget=(isLav||isRav)?e.target:bub;
        if(txt){zoomIn.innerHTML=txt.innerHTML;zoomIn.className='Nicole-txt-zoom-in txt-img-zoom';zoom.classList.add('show');}else if(gift){zoomIn.innerHTML=gift.innerHTML;zoomIn.className='Nicole-txt-zoom-in gift-zoom';zoom.classList.add('show');}else if(cp){Q('.Nicole-jcpmodal').classList.add('show');}else if(mu){Q('.Nicole-jmumodal').classList.add('show');}else if(loc){Q('.Nicole-jlocmodal').classList.add('show');}
    });

    Q('.Nicole-jact-cancel').addEventListener('click',function(){Q('.Nicole-jmsgact').classList.remove('show');});
    Q('.Nicole-jact-delete').addEventListener('click',function(){if(targetRevokeRow&&confirm('删除这条消息？')){targetRevokeRow.remove();if(finalLName)saveChatForChar(finalLName);}Q('.Nicole-jmsgact').classList.remove('show');});
    Q('.Nicole-jact-reply').addEventListener('click',function(){showReplyBar(targetRevokeText.substring(0,30));Q('.Nicole-jmsgact').classList.remove('show');});
    Q('.Nicole-jtfact-cancel').addEventListener('click',function(){Q('.Nicole-jtfactmodal').classList.remove('show');});
    Q('.Nicole-jtfact-receive').addEventListener('click',function(){if(window.targetTfNode){window.targetTfNode.classList.add('got');window.targetTfNode.querySelector('.Nicole-tf-t').textContent='已收款';var amt=window.targetTfNode.getAttribute('data-amt')||'0.00';appendCmd(isBlkRight?'$[发送失败]':'[我收款:'+amt+']');playSwoosh();}Q('.Nicole-jtfactmodal').classList.remove('show');});
    Q('.Nicole-jtfact-return').addEventListener('click',function(){if(window.targetTfNode){window.targetTfNode.classList.add('returned');window.targetTfNode.querySelector('.Nicole-tf-t').textContent='已退回';var amt=window.targetTfNode.getAttribute('data-amt')||'0.00';appendCmd(isBlkRight?'$[发送失败]':'[我退回:'+amt+']');playSwoosh();}Q('.Nicole-jtfactmodal').classList.remove('show');});
    Q('.Nicole-jact-revoke').addEventListener('click',function(){if(targetRevokeRow&&targetRevokeRow.classList.contains('right')){var m=document.createElement('div');m.className='Nicole-sys-msg';m.innerHTML=finalRName+' 撤回了一条消息 <span class="Nicole-view-rev" data-txt="'+targetRevokeText.replace(/"/g,'&quot;')+'">重新编辑</span>';targetRevokeRow.parentNode.replaceChild(m,targetRevokeRow);appendCmd('$[撤回:'+finalRName+'|'+targetRevokeText+']');}Q('.Nicole-jmsgact').classList.remove('show');});
    Q('.Nicole-jtxtzoom').addEventListener('click',function(e){if(e.target===this)this.classList.remove('show');});
    Q('.Nicole-jviewclose').addEventListener('click',function(){Q('.Nicole-jviewmodal').classList.remove('show');});

    // ===== DRAW =====
    var drawCanvas=Q('.Nicole-jdrawcanvas'),drawCtx=drawCanvas.getContext('2d');var isDrawing=false,lastX=0,lastY=0,isEraser=false;var drawHistory=[];
    function saveDrawState(){drawHistory.push(drawCanvas.toDataURL());if(drawHistory.length>20)drawHistory.shift();}
    function resetDrawBoard(){drawCtx.globalCompositeOperation='source-over';drawCtx.fillStyle='#ffffff';drawCtx.fillRect(0,0,drawCanvas.width,drawCanvas.height);drawHistory=[];}
    Q('.Nicole-jbtn-draw').addEventListener('click',function(){openModal('.Nicole-jdrawmodal');setTimeout(resetDrawBoard,50);});
    function getDrawPos(e){var r=drawCanvas.getBoundingClientRect();var cx=e.touches?e.touches[0].clientX:e.clientX;var cy=e.touches?e.touches[0].clientY:e.clientY;return{x:cx-r.left,y:cy-r.top};}
    function startDraw(e){e.preventDefault();isDrawing=true;saveDrawState();var p=getDrawPos(e);lastX=p.x;lastY=p.y;}
    function runDraw(e){if(!isDrawing)return;e.preventDefault();var p=getDrawPos(e);drawCtx.beginPath();drawCtx.moveTo(lastX,lastY);drawCtx.lineTo(p.x,p.y);drawCtx.globalCompositeOperation=isEraser?'destination-out':'source-over';drawCtx.strokeStyle=Q('.Nicole-jdrawcolor').value;drawCtx.lineWidth=Q('.Nicole-jdrawwidth').value;if(isEraser){drawCtx.lineWidth=Math.max(10,Q('.Nicole-jdrawwidth').value*2);}drawCtx.lineCap='round';drawCtx.lineJoin='round';drawCtx.stroke();lastX=p.x;lastY=p.y;}
    function stopDraw(e){e.preventDefault();isDrawing=false;}
    drawCanvas.addEventListener('mousedown',startDraw);drawCanvas.addEventListener('mousemove',runDraw);drawCanvas.addEventListener('mouseup',stopDraw);drawCanvas.addEventListener('mouseout',stopDraw);drawCanvas.addEventListener('touchstart',startDraw,{passive:false});drawCanvas.addEventListener('touchmove',runDraw,{passive:false});drawCanvas.addEventListener('touchend',stopDraw,{passive:false});
    Q('.Nicole-jdrawclear').addEventListener('click',resetDrawBoard);
    Q('.Nicole-jdrawundo').addEventListener('click',function(){if(drawHistory.length>0){var img=new Image();img.src=drawHistory.pop();img.onload=function(){drawCtx.globalCompositeOperation='source-over';drawCtx.clearRect(0,0,drawCanvas.width,drawCanvas.height);drawCtx.drawImage(img,0,0);};}else{resetDrawBoard();}});
    Q('.Nicole-jdraweraser').addEventListener('click',function(){isEraser=!isEraser;this.style.background=isEraser?'#eeeeee':'';this.style.color=isEraser?'#333':'';});
    Q('.Nicole-jdrawcancel').addEventListener('click',function(){Q('.Nicole-jdrawmodal').classList.remove('show');});
    Q('.Nicole-jdrawok').addEventListener('click',function(){drawCtx.globalCompositeOperation='source-over';var b64=drawCanvas.toDataURL('image/jpeg',0.6);var shortId='local-draw-'+Date.now();try{NcStore.set('Nc-'+shortId,b64);}catch(e){}renderRight('<img src="'+b64+'" class="Nicole-img" alt="手绘涂鸦">',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我表情:'+shortId+']');Q('.Nicole-jdrawmodal').classList.remove('show');});

    // ===== CALL =====
    var callIntv=null,callSec=0,callState='none';
    function formatTime(sec){var m=String(Math.floor(sec/60)).padStart(2,'0');var s=String(sec%60).padStart(2,'0');return m+':'+s;}
    function openCallUI(type,state){
        // 页面初始化保护：刷新后8秒内阻止历史消息触发电来电界面
        if(state==='in'&&ncIsInitializing()){console.log('[nicoPhone] 初始化期间阻止来电界面弹出');return;}
        var c=Q('.Nicole-jcall');c.className='Nicole-call Nicole-jcall show state-'+state+(type==='video'?' video':'');c.style.transform='none';
        if(type==='video'){Q('.Nicole-call-vbg').style.backgroundImage='url(\''+safeRAv+'\')';Q('.Nicole-bind-rav-bg').style.backgroundImage='url(\''+safeLAv+'\')';}
        else{var savedBg=NcStore.get('Nc-bg-img');var defaultBg=window.getComputedStyle(Q('.Nicole-jbg')).backgroundImage;if(savedBg&&savedBg!=='none'){Q('.Nicole-call-vbg').style.backgroundImage='url(\''+savedBg.replace(/'/g,'%27')+'\')';}else if(defaultBg&&defaultBg!=='none'){Q('.Nicole-call-vbg').style.backgroundImage=defaultBg;}else{Q('.Nicole-call-vbg').style.backgroundImage='';}}
        callSec=0;callState=state;clearInterval(callIntv);
        // 来电时播放铃声
        if(state==='in'){try{playRing();}catch(e){}}
        // 清空之前的通话气泡
        try{var callBubs=document.querySelector('.Nicole-jcall-bubs');if(callBubs)callBubs.innerHTML='';}catch(e){}
        var panel=Q('.Nicole-jpanel');var plusBtn=Q('.Nicole-jplus');if(panel)panel.classList.remove('show');if(plusBtn)plusBtn.classList.remove('on');
    }
    function setActiveCall(forceType){
        if(callState==='active')return;callState='active';stopRing();
        var c=Q('.Nicole-jcall');c.classList.remove('state-in','state-out','minimized');c.classList.add('active','show');
        if(forceType==='video'){c.classList.add('video');Q('.Nicole-call-vbg').style.backgroundImage='url(\''+safeRAv+'\')';Q('.Nicole-bind-rav-bg').style.backgroundImage='url(\''+safeLAv+'\')';}
        Q('.Nicole-jcall-timer').textContent='00:00';callSec=0;clearInterval(callIntv);callIntv=setInterval(function(){callSec++;Q('.Nicole-jcall-timer').textContent=formatTime(callSec);},1000);
    }
    function closeCall(){stopRing();clearInterval(callIntv);Q('.Nicole-jcall').classList.remove('show','active','state-in','state-out','video','minimized');callState='none';}
    function addCallBubble(dir,text,doType,callType){
        var box=document.querySelector('.Nicole-jcall-bubs');if(!box)return;
        // 过滤文本：解码HTML实体、移除HTML标签、模板变量、多余空格
        try{
            if(text){
                text=String(text);
                // 解码HTML实体
                text=text.replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
                // 移除HTML标签
                text=text.replace(/<[^>]+>/g,'');
                // 移除+dur+模板变量（带或不带单引号）
                text=text.replace(/'?\+dur\+'?/g,'');
                // 合并空格
                text=text.replace(/\s+/g,' ').trim();
                if(!text) return;
            }
        }catch(e){}
        // 去重：如果和最后一条气泡内容、方向、类型都相同，跳过
        try{
            var lastBub=box.querySelector('.Nicole-cb-wrap:last-child .Nicole-cb');
            if(lastBub&&lastBub.textContent===text&&box.lastElementChild&&box.lastElementChild.className.indexOf(dir)>=0){
                var lastClass=lastBub.className;
                if((callType==='video'&&lastClass.indexOf('cb-video')>=0)||(callType!=='video'&&lastClass.indexOf('cb-voice')>=0)){
                    return;
                }
            }
        }catch(e){}
        var wrap=document.createElement('div');wrap.className='Nicole-cb-wrap '+dir;var bub=document.createElement('div');bub.className='Nicole-cb'+(callType==='video'?' cb-video':' cb-voice');wrap.appendChild(bub);box.appendChild(wrap);
        if(doType){var i=0;var timer=setInterval(function(){if(i<text.length){bub.innerHTML+=text.charAt(i);i++;box.scrollTop=box.scrollHeight;}else{clearInterval(timer);}},60);}else{bub.innerHTML=text;setTimeout(function(){box.scrollTop=box.scrollHeight;},50);}
    }
    window.NcAddCallBubble=addCallBubble;
    Q('.Nicole-jbtn-voice').addEventListener('click',function(){openCallUI('voice','out');appendCmd(isBlkRight?'$[呼叫失败，拒收]':'[我电话:语音]');});
    Q('.Nicole-jbtn-video').addEventListener('click',function(){openCallUI('video','out');appendCmd(isBlkRight?'$[呼叫失败，拒收]':'[我电话:视频]');});
    Q('.Nicole-jcall-cancel').addEventListener('click',function(e){e.stopPropagation();closeCall();appendCmd('$[挂断通话]');});
    Q('.Nicole-jcall-answer').addEventListener('click',function(e){e.stopPropagation();setActiveCall();appendCmd('$[接听通话]');});
    Q('.Nicole-jcall-reject').addEventListener('click',function(e){e.stopPropagation();closeCall();renderRight('<div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:18px;display:flex;align-items:center;justify-content:center;color:#666;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><span style="font-size:13px;color:#333;">已拒绝</span></div>',false,false);appendCmd('$[拒绝通话]');});
    Q('.Nicole-jcall-end').addEventListener('click',function(e){e.stopPropagation();var dur=formatTime(callSec);closeCall();appendCmd('$[挂断通话:'+dur+']');});
    Q('.Nicole-jcall-send').addEventListener('click',function(e){e.stopPropagation();var t=Q('.Nicole-jcall-in').value.trim();if(t){var isVid=Q('.Nicole-jcall').classList.contains('video');addCallBubble('right',t,false);playSwoosh();appendCmd('[我电话:'+t+']');Q('.Nicole-jcall-in').value='';}});

    var callDragItem=Q('.Nicole-jcall');var cDragging=false,cStartX=0,cStartY=0,cInitX=0,cInitY=0,cxOff=0,cyOff=0,cCurrX=0,cCurrY=0,cDragMoved=false;
    function cDragStart(e){if(!callDragItem.classList.contains('minimized'))return;cStartX=e.type==='touchstart'?e.touches[0].clientX:e.clientX;cStartY=e.type==='touchstart'?e.touches[0].clientY:e.clientY;cInitX=cStartX-cxOff;cInitY=cStartY-cyOff;cDragging=true;cDragMoved=false;}
    function cDrag(e){if(!cDragging)return;var cx=e.type==='touchmove'?e.touches[0].clientX:e.clientX;var cy=e.type==='touchmove'?e.touches[0].clientY:e.clientY;if(Math.abs(cx-cStartX)>5||Math.abs(cy-cStartY)>5)cDragMoved=true;if(cDragMoved)e.preventDefault();cCurrX=cx-cInitX;cCurrY=cy-cInitY;cxOff=cCurrX;cyOff=cCurrY;callDragItem.style.transform='translate3d('+cCurrX+'px,'+cCurrY+'px,0)';}
    function cDragEnd(){cInitX=cCurrX;cInitY=cCurrY;cDragging=false;}
    callDragItem.addEventListener('touchstart',cDragStart,{passive:false});document.addEventListener('touchmove',cDrag,{passive:false});document.addEventListener('touchend',cDragEnd);
    callDragItem.addEventListener('mousedown',cDragStart);document.addEventListener('mousemove',cDrag);document.addEventListener('mouseup',cDragEnd);
    callDragItem.addEventListener('click',function(e){if(this.classList.contains('minimized')&&!cDragMoved){this.classList.remove('minimized');cxOff=0;cyOff=0;this.style.transform='none';}});
    Q('.Nicole-jcall-mini-top').addEventListener('click',function(e){e.stopPropagation();Q('.Nicole-jcall').classList.add('minimized');});

    // ===== EMOJI =====
    var baseEmojiArr=[{i:'https://tuchuang.org.cn/imgs/2026/03/26/8abc1e15982dce90.png',t:'宝宝我惹你了吗？'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/28482bc17ee1902a.png',t:'兄弟，我长得太帅被人打了'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/c8edbc471b99ec2d.png',t:'分享位置，床上'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/108aa5ff7f102a0f.png',t:'听说你要洗澡'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/14bc30cf3153af0f.png',t:'不乘，打屁屁咯'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/f28c9fdf5230efc0.png',t:'你也很为我着迷吧？'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/603a9d2dd3ba1db1.png',t:'偶哭叻，你满意了吧？'},{i:'https://tuchuang.org.cn/imgs/2026/03/29/56d88bd75de484f0.png',t:'电你，在心跳吗？'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/a2350084ec1eb9e1.jpg',t:'淦他妈的，我要吃软饭'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/9638432efdd2a0dc.png',t:'哞哞哒[么么哒]'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/ecc00661053e774d.png',t:'吐舌'},{i:'https://tuchuang.org.cn/imgs/2026/03/26/1a553718ed2b2347.png',t:'这个世界有问题'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/d38af7021b9631f1.png',t:'让我喊出我爱你'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/b68c231476fd9735.png',t:'一张古早叼花漫画图'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/29907ae552edde90.png',t:'一张抽象的人物图'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/a082ed0adae88380.png',t:'一张抽象龙图拿着杯子'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/ca976c11387dc5e8.png',t:'一张龙图鄙夷的表情'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/422696afc246a494.png',t:'一只猴子苍蝇搓手'},{i:'https://tuchuang.org.cn/imgs/2026/03/27/c21b68dbdf340f36.png',t:'一张搞怪龙图'},{i:'https://tuchuang.org.cn/imgs/2026/03/28/f369ba2676f4283c.png',t:'沸羊羊耍帅'},{i:'https://tuchuang.org.cn/imgs/2026/03/28/be2862ca6b4b0c3a.png',t:'一个抽象的简笔画'},{i:'https://tuchuang.org.cn/imgs/2026/03/28/e7362ce1784f5c46.png',t:'我要去找上帝告状'},{i:'https://pic1.imgdb.cn/item/6a4cab64531aaa3c3f265491.jpg',t:'简笔画龙图'},{i:'https://pic1.imgdb.cn/item/6a4caf33531aaa3c3f26590d.jpg',t:'出来亲嘴'}];
    var customEmoStr=NcStore.get('Nc-custom-emos');var customEmoArr=customEmoStr?JSON.parse(customEmoStr):[];
    function renderEmoList(){var all=customEmoArr.concat(baseEmojiArr);var html=all.map(function(x){return '<div class="Nicole-emo-card" data-url="'+x.i+'" data-txt="'+x.t+'"><img class="Nicole-emo-img" src="'+x.i+'"><div class="Nicole-emo-t">'+x.t+'</div></div>';}).join('');Q('.Nicole-jemolist').innerHTML=html;QA('.Nicole-emo-card').forEach(function(c){c.addEventListener('click',function(){renderRight('<img src="'+this.getAttribute('data-url')+'" class="Nicole-img" alt="'+this.getAttribute('data-txt')+'">',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我表情:'+this.getAttribute('data-txt')+'|'+this.getAttribute('data-url')+']');Q('.Nicole-jemomodal').classList.remove('show');});});}
    renderEmoList();
    Q('.Nicole-jaddemobtn').addEventListener('click',function(){Q('.Nicole-jaddemomodal').classList.add('show');Q('.Nicole-jemomodal').classList.remove('show');});
    Q('.Nicole-jaddemocancel').addEventListener('click',function(){Q('.Nicole-jaddemomodal').classList.remove('show');Q('.Nicole-jemomodal').classList.add('show');});
    Q('.Nicole-jaddemook').addEventListener('click',function(){var u=Q('.Nicole-jaddemourl').value.trim(),t=Q('.Nicole-jaddemotxt').value.trim()||'自定义表情';if(u){customEmoArr.unshift({i:u,t:t});NcStore.set('Nc-custom-emos',JSON.stringify(customEmoArr));renderEmoList();Q('.Nicole-jaddemourl').value='';Q('.Nicole-jaddemotxt').value='';}Q('.Nicole-jaddemomodal').classList.remove('show');Q('.Nicole-jemomodal').classList.add('show');});
    Q('.jemo-poke').addEventListener('click',function(){var ic='<div class="Nicole-interact-item Nicole-anim-poke"><svg viewBox="0 0 24 24"><path d="M11 2a2 2 0 0 0-2 2v5H6a2 2 0 0 0-2 2v2c0 4.4 3.6 8 8 8h3a5 5 0 0 0 5-5v-6a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2z"/></svg></div>';renderRight(ic,true,isBlkRight);appendCmd(isBlkRight?'$[发送失败]':'[我拍一拍:戳了戳]');playSwoosh();Q('.Nicole-jemomodal').classList.remove('show');});
    Q('.jemo-dice').addEventListener('click',function(){var pt=Math.floor(Math.random()*6)+1;var dots='';if(pt===1)dots='<circle cx="12" cy="12" r="1.5"/>';else if(pt===2)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/>';else if(pt===3)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/>';else if(pt===4)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/>';else if(pt===5)dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/>';else dots='<circle cx="8.5" cy="7" r="1.5"/><circle cx="15.5" cy="7" r="1.5"/><circle cx="8.5" cy="12" r="1.5"/><circle cx="15.5" cy="12" r="1.5"/><circle cx="8.5" cy="17" r="1.5"/><circle cx="15.5" cy="17" r="1.5"/>';var ic='<div class="Nicole-interact-item Nicole-anim-dice"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>'+dots+'</svg></div>';renderRight(ic,true,isBlkRight);appendCmd(isBlkRight?'$[发送失败]':'[我摇骰子:'+pt+'点]');playSwoosh();Q('.Nicole-jemomodal').classList.remove('show');});
    Q('.jemo-rps').addEventListener('click',function(){var arr=['剪刀','石头','布'];var res=arr[Math.floor(Math.random()*3)];var qSvg='';if(res==='剪刀')qSvg='<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>';else if(res==='石头')qSvg='<svg viewBox="0 0 24 24"><path d="M10 15v-5a2 2 0 0 1 4 0v5"/><path d="M14 15v-4a2 2 0 0 1 4 0v4"/><path d="M6 15v-3a2 2 0 0 1 4 0v3"/><path d="M18 15v-2a2 2 0 0 1 4 0v3c0 4-3 7-7 7H9c-4 0-7-3-7-7v-3a2 2 0 0 1 4 0v4"/></svg>';else qSvg='<svg viewBox="0 0 24 24"><path d="M10 15V4a2 2 0 0 1 4 0v11"/><path d="M14 15V5a2 2 0 0 1 4 0v10"/><path d="M6 15V6a2 2 0 0 1 4 0v9"/><path d="M18 15v-2a2 2 0 0 1 4 0v3c0 4-3 7-7 7H9c-4 0-7-3-7-7V9a2 2 0 0 1 4 0v6"/></svg>';var ic='<div class="Nicole-interact-item Nicole-anim-rps">'+qSvg+'</div>';renderRight(ic,true,isBlkRight);appendCmd(isBlkRight?'$[发送失败]':'[我猜拳:'+res+']');playSwoosh();Q('.Nicole-jemomodal').classList.remove('show');});

    // ===== INPUT & SEND =====
    var textInput=Q('.Nicole-jinput'),sendBtn=Q('.Nicole-jsend');
    function sendText(){var v=textInput.value.trim();if(!v)return;if(pendingReply){renderRight('<div class="Nicole-quote-box">'+pendingReply+'</div>'+v,false,isBlkRight);appendCmd(isBlkRight?'$[拉黑拒收]':'[我:[引用:'+pendingReply+'] '+v+']');Q('.Nicole-jrepclose').click();}else{renderRight(v,false,isBlkRight);appendCmd(isBlkRight?'$[消息被拒收]':'[我:'+v+']');}textInput.value='';playSwoosh();}
    sendBtn.addEventListener('click',sendText);
    textInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();sendText();}});

    var plusBtn=Q('.Nicole-jplus'),panel=Q('.Nicole-jpanel');
    plusBtn.addEventListener('click',function(){plusBtn.classList.toggle('on');panel.classList.toggle('show');});
    function openModal(sel){Q(sel).classList.add('show');panel.classList.remove('show');plusBtn.classList.remove('on');}

    // ===== ALL MODAL BUTTONS =====
    Q('.Nicole-jgiftbtn').addEventListener('click',function(){openModal('.Nicole-jgiftmodal');});
    Q('.Nicole-jgiftcancel').addEventListener('click',function(){Q('.Nicole-jgiftmodal').classList.remove('show');});
    Q('.Nicole-jlinkbtn').addEventListener('click',function(){openModal('.Nicole-jlinkmodal');});
    Q('.Nicole-jlinkcancel').addEventListener('click',function(){Q('.Nicole-jlinkmodal').classList.remove('show');});
    Q('.Nicole-jtf').addEventListener('click',function(){openModal('.Nicole-jtfmodal');});
    Q('.Nicole-jtfcancel').addEventListener('click',function(){Q('.Nicole-jtfmodal').classList.remove('show');});
    Q('.Nicole-jemo').addEventListener('click',function(){openModal('.Nicole-jemomodal');});
    Q('.Nicole-jemoclose').addEventListener('click',function(){Q('.Nicole-jemomodal').classList.remove('show');});
    Q('.Nicole-jmusic').addEventListener('click',function(){openModal('.Nicole-jmumodal');});
    Q('.Nicole-jmuclose').addEventListener('click',function(){Q('.Nicole-jmumodal').classList.remove('show');});
    Q('.Nicole-jcp').addEventListener('click',function(){openModal('.Nicole-jcpmodal');});
    Q('.Nicole-jcpclose').addEventListener('click',function(){Q('.Nicole-jcpmodal').classList.remove('show');});
    Q('.Nicole-jtxtimg').addEventListener('click',function(){openModal('.Nicole-jtxtimgmodal');});
    Q('.Nicole-jtxtimgcancel').addEventListener('click',function(){Q('.Nicole-jtxtimgmodal').classList.remove('show');Q('.Nicole-jtxtimgin').value='';});
    Q('.Nicole-jimgbtn').addEventListener('click',function(){openModal('.Nicole-jimgmodal');});
    Q('.Nicole-jimgcancel').addEventListener('click',function(){Q('.Nicole-jimgmodal').classList.remove('show');Q('.Nicole-jimgurl').value='';Q('.Nicole-jimgdesc').value='';});
    Q('.Nicole-jbtn-loc').addEventListener('click',function(){openModal('.Nicole-jlocmodal');});
    Q('.Nicole-jlocclose').addEventListener('click',function(){Q('.Nicole-jlocmodal').classList.remove('show');});
    Q('.Nicole-jbtn-food').addEventListener('click',function(){openModal('.Nicole-jfoodmodal');});
    Q('.Nicole-jfoodcancel').addEventListener('click',function(){Q('.Nicole-jfoodmodal').classList.remove('show');});

    Q('.Nicole-jgiftok').addEventListener('click',function(){var pr=Q('.Nicole-jgiftpr').value||'0',desc=Q('.Nicole-jgiftdesc').value||'精美礼物',note=Q('.Nicole-jgiftnote').value||'';renderRight('<div class="Nicole-link-card Nicole-gift-card"><div class="Nicole-link-ic" style="background:rgba(255,255,255,0.6);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+desc+'</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">¥ '+parseFloat(pr).toFixed(2)+(note?' - '+note:'')+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我礼物:'+pr+'|'+desc+']');Q('.Nicole-jgiftmodal').classList.remove('show');Q('.Nicole-jgiftpr').value='';Q('.Nicole-jgiftdesc').value='';Q('.Nicole-jgiftnote').value='';});
    Q('.Nicole-jlinkok').addEventListener('click',function(){var url=Q('.Nicole-jlinkurl').value.trim(),title=Q('.Nicole-jlinktitle').value.trim()||'网页链接';if(url){renderRight('<a href="javascript:;" class="Nicole-link-card"><div class="Nicole-link-ic"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+title+'</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">'+url+'</div></div></a>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我链接:'+title+'|'+url+']');Q('.Nicole-jlinkmodal').classList.remove('show');Q('.Nicole-jlinkurl').value='';Q('.Nicole-jlinktitle').value='';}});
    Q('.Nicole-jtfok').addEventListener('click',function(){var amt=Q('.Nicole-jtfamt').value,title=Q('.Nicole-jtftitle').value||'转账';if(amt>0){renderRight('<div class="Nicole-tf Nicole-j-pure-tf" data-amt="'+parseFloat(amt).toFixed(2)+'"><div class="Nicole-tf-ic">¥</div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+title+'</div><div class="Nicole-tf-a">¥ '+parseFloat(amt).toFixed(2)+'</div><div class="Nicole-tf-f">微信转账</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我转账:'+parseFloat(amt).toFixed(2)+':'+title+']');Q('.Nicole-jtfmodal').classList.remove('show');Q('.Nicole-jtfamt').value='';Q('.Nicole-jtftitle').value='';}});
    Q('.Nicole-jimgok').addEventListener('click',function(){var url=Q('.Nicole-jimgurl').value.trim(),desc=Q('.Nicole-jimgdesc').value.trim()||'图片';if(url){var realUrl=getRealImgUrl(url);renderRight('<img src="'+realUrl+'" class="Nicole-img" alt="'+desc+'">',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我表情:'+url+']');Q('.Nicole-jimgmodal').classList.remove('show');Q('.Nicole-jimgurl').value='';Q('.Nicole-jimgdesc').value='';}});
    Q('.Nicole-jtxtimgok').addEventListener('click',function(){var txt=Q('.Nicole-jtxtimgin').value.trim();if(txt){renderRight('<div class="Nicole-txt-img">'+txt+'</div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我文字图:'+txt+']');Q('.Nicole-jtxtimgmodal').classList.remove('show');Q('.Nicole-jtxtimgin').value='';}});
    Q('.Nicole-jfoodok').addEventListener('click',function(){var shop=Q('.Nicole-jfoodshop').value.trim()||'外卖派送';var items=Q('.Nicole-jfooditems').value.trim()||'神秘大餐';var addr=Q('.Nicole-jfoodaddr').value.trim()||'默认地址';var name=Q('.Nicole-jfoodname').value.trim()||'收件人';var phone=Q('.Nicole-jfoodphone').value.trim()||'138****0000';renderRight('<div class="Nicole-tf Nicole-food-card"><div class="Nicole-food-ic" style="background:rgba(255,255,255,0.6);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+shop+'</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">'+items+'</div><div class="Nicole-tf-f" style="margin-top:2px;padding-top:2px;">'+addr+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我外卖:'+shop+'|'+items+']');Q('.Nicole-jfoodmodal').classList.remove('show');Q('.Nicole-jfoodshop').value='';Q('.Nicole-jfooditems').value='';Q('.Nicole-jfoodaddr').value='';Q('.Nicole-jfoodname').value='';Q('.Nicole-jfoodphone').value='';});
    Q('.Nicole-jlocsend').addEventListener('click',function(){Q('.Nicole-jlocinputmodal').classList.add('show');});
    Q('.Nicole-jlocincancel').addEventListener('click',function(){Q('.Nicole-jlocinputmodal').classList.remove('show');});
    Q('.Nicole-jlocinok').addEventListener('click',function(){var p=Q('.Nicole-jlocin-pos').value.trim()||'我的位置';var d=Q('.Nicole-jlocin-dist').value.trim()||'未知距离';renderRight('<div class="Nicole-tf Nicole-loc-card"><div class="Nicole-link-ic" style="border-radius:50%;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+p+'</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">'+(d.includes('距离')?d:'距离 '+d)+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我定位:'+p+'|'+(d.includes('距离')?d:'距离 '+d)+']');Q('.Nicole-jlocinputmodal').classList.remove('show');Q('.Nicole-jlocmodal').classList.remove('show');Q('.Nicole-jlocin-pos').value='';Q('.Nicole-jlocin-dist').value='';});

    // ===== VOICE =====
    var micBtn=Q('.Nicole-jmic'),isRec=false,finalTxt='';
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    window.voiceObj=null;
    var mediaRec=null,recStartTime=0;
    var tempVoiceDur=null;
    function voiceBubble(txt,dur){renderRight('<div class="Nicole-au" data-txt="'+txt+'"><div class="Nicole-au-main"><div class="Nicole-au-play"></div><div class="Nicole-au-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="Nicole-au-dur">'+dur+'</div></div><div class="Nicole-au-wrap"><div class="Nicole-au-txt">'+txt+'</div></div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我语音:'+dur+'|'+txt+']');}
    function fallback(err){var modal=Q('.Nicole-jvoicemodal');var txtArea=Q('.Nicole-jvoicetxt');modal.classList.add('show');txtArea.value='';txtArea.placeholder=(err?err+'，':'')+'麦克风降级，请手动输入刚刚语音内容的文字...';setTimeout(function(){txtArea.focus();},100);}
    Q('.Nicole-jvoicecancel').addEventListener('click',function(){Q('.Nicole-jvoicemodal').classList.remove('show');tempVoiceDur=null;});
    Q('.Nicole-jvoiceok').addEventListener('click',function(){var txt=Q('.Nicole-jvoicetxt').value.trim();if(txt){var dur=tempVoiceDur||(Math.max(1,Math.round(txt.length/4))+'"');voiceBubble(txt,dur);}Q('.Nicole-jvoicemodal').classList.remove('show');tempVoiceDur=null;});
    function setupSR(){if(window.voiceObj)return true;if(!SR)return false;try{window.voiceObj=new SR();window.voiceObj.continuous=true;window.voiceObj.interimResults=true;window.voiceObj.onresult=function(ev){for(var i=ev.resultIndex;i<ev.results.length;i++){if(ev.results[i].isFinal)finalTxt+=ev.results[i][0].transcript;}};window.voiceObj.onerror=function(ev){if(ev.error!=='no-speech'){isRec=false;micBtn.classList.remove('rec');fallback(ev.error==='not-allowed'?'权限被拒':'识别被中断');}};window.voiceObj.onend=function(){if(isRec){try{window.voiceObj.start();}catch(e){}}else{micBtn.classList.remove('rec');if(finalTxt.trim())voiceBubble(finalTxt.trim(),Math.max(1,Math.round(finalTxt.length/4))+'"');}};return true;}catch(e){return false;}}
    function startMediaRecord(){if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){var MR=window.MediaRecorder;mediaRec=new MR(stream);mediaRec.onstop=function(){var dur=Math.max(1,Math.round((Date.now()-recStartTime)/1000));stream.getTracks().forEach(function(t){t.stop();});tempVoiceDur=dur+'"';fallback('语音录制完毕 (真实时长: '+dur+'秒)');};recStartTime=Date.now();mediaRec.start();isRec=true;micBtn.classList.add('rec');}).catch(function(){fallback('麦克风被占用或拒绝');});}else{fallback('浏览器环境不支持录音');}}
    micBtn.addEventListener('click',function(e){e.preventDefault();if(isRec){isRec=false;micBtn.classList.remove('rec');if(window.voiceObj){try{window.voiceObj.stop();}catch(err){}}if(mediaRec&&mediaRec.state!=='inactive'){try{mediaRec.stop();}catch(err){}}}else{var isEdgeAndroid=navigator.userAgent.includes('EdgA');if(SR&&!isEdgeAndroid&&setupSR()){finalTxt='';try{window.voiceObj.lang=langMap[langIdx].l;window.voiceObj.start();isRec=true;micBtn.classList.add('rec');}catch(err){isRec=false;micBtn.classList.remove('rec');fallback('引擎启动异常');}}else{startMediaRecord();}}});

    // ===== MUSIC (歌单+播放模式+搜索) =====
    var muPlaylists=JSON.parse(NcStore.get('Nc-mu-playlists')||'null')||[{name:'默认歌单',songs:[]}];
    var muCurPlaylist=parseInt(NcStore.get('Nc-mu-cur')||'0');
    if(muCurPlaylist>=muPlaylists.length)muCurPlaylist=0;
    var muList=muPlaylists[muCurPlaylist].songs;
    var muIdx=0,muPlaying=false,muSec=0;
    var muPlayMode=NcStore.get('Nc-mu-mode')||'loop'; // loop/order/random
    var muModeIcons={loop:'<path d="M17 1l4 4-4 4" fill="none" stroke="#222" stroke-width="1.5"/><path d="M3 11V9a4 4 0 0 1 4-4h14" fill="none" stroke="#222" stroke-width="1.5"/><path d="M7 23l-4-4 4-4" fill="none" stroke="#222" stroke-width="1.5"/><path d="M21 13v2a4 4 0 0 1-4 4H3" fill="none" stroke="#222" stroke-width="1.5"/>',order:'<polyline points="17 1 21 5 17 9" fill="none" stroke="#222" stroke-width="1.5"/><path d="M3 11V9a4 4 0 0 1 4-4h14" fill="none" stroke="#222" stroke-width="1.5"/><polyline points="7 23 3 19 7 15" fill="none" stroke="#222" stroke-width="1.5"/><path d="M21 13v2a4 4 0 0 1-4 4H3" fill="none" stroke="#222" stroke-width="1.5"/>',random:'<polyline points="16 3 21 3 21 8" fill="none" stroke="#222" stroke-width="1.5"/><line x1="4" y1="20" x2="21" y2="3" stroke="#222" stroke-width="1.5"/><polyline points="21 16 21 21 16 21" fill="none" stroke="#222" stroke-width="1.5"/><line x1="15" y1="15" x2="21" y2="21" stroke="#222" stroke-width="1.5"/><line x1="4" y1="4" x2="9" y2="9" stroke="#222" stroke-width="1.5"/>'};
    var muModeNames={loop:'循环播放',order:'顺序播放',random:'随机播放'};
    // ===== 歌词弹幕 =====
    var DANMU_API='https://music-api.gdstudio.xyz/api.php';
    var danmuEnabled=(NcStore.get('Nc-mu-danmu')||'1')==='1';
    var danmuLyrics=[],danmuLastIdx=-1,danmuTimer=null,danmuSongKey='',danmuContainer=null,lyricModule=null,lyricModuleExpanded=false;
    function createDanmuContainer(){
        if(danmuContainer)return;
        danmuContainer=document.createElement('div');
        danmuContainer.className='Nicole-danmu-container'+(danmuEnabled?'':' hidden');
        document.body.appendChild(danmuContainer);
        // 创建QQ音乐风格歌词模块
        createLyricModule();
    }
    function createLyricModule(){
        if(lyricModule)return;
        lyricModule=document.createElement('div');
        lyricModule.className='Nicole-lyric-module hidden';
        lyricModule.innerHTML='<div class="lyric-mini"><div class="lyric-prev"></div><div class="lyric-current">未在播放</div></div><div class="lyric-panel"><div class="lyric-panel-hd"><div class="lyric-panel-title"><svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>歌词</div><div class="lyric-panel-actions"><button class="lyric-action-btn lyric-setting-btn" title="歌词设置">⚙</button><button class="lyric-action-btn lyric-close-btn" title="关闭">×</button></div></div><div class="lyric-scroll"><div class="lyric-empty">暂无歌词数据<br>播放歌曲后自动加载</div></div></div>';
        document.body.appendChild(lyricModule);
        // 拖动功能（支持鼠标和触摸）
        var isDragging=false,startX=0,startY=0,startLeft=0,startTop=0,hasMoved=false;
        function onDragStart(clientX,clientY){
            isDragging=true;hasMoved=false;startX=clientX;startY=clientY;
            var rect=lyricModule.getBoundingClientRect();
            startLeft=rect.left;startTop=rect.top;
            lyricModule.style.left=startLeft+'px';lyricModule.style.top=startTop+'px';lyricModule.style.transform='none';
        }
        function onDragMove(clientX,clientY){
            if(!isDragging)return;
            var dx=clientX-startX,dy=clientY-startY;
            if(Math.abs(dx)>1||Math.abs(dy)>1)hasMoved=true;
            var newLeft=Math.max(0,Math.min(window.innerWidth-lyricModule.offsetWidth,startLeft+dx));
            // 限制拖动范围，不让歌词模块拖到页面底部（下拉键位置）
            var maxTop=Math.floor(window.innerHeight*0.55);
            var newTop=Math.max(0,Math.min(maxTop,startTop+dy));
            lyricModule.style.left=newLeft+'px';lyricModule.style.top=newTop+'px';
        }
        function onDragEnd(){
            if(isDragging&&!hasMoved){toggleLyricModule();}
            isDragging=false;
        }
        // 鼠标事件
        lyricModule.addEventListener('mousedown',function(e){
            if(e.target.closest('.lyric-panel-actions')||e.target.closest('.lyric-scroll'))return;
            onDragStart(e.clientX,e.clientY);e.preventDefault();
        });
        document.addEventListener('mousemove',function(e){onDragMove(e.clientX,e.clientY);});
        document.addEventListener('mouseup',onDragEnd);
        // 触摸事件（移动端支持）
        lyricModule.addEventListener('touchstart',function(e){
            if(e.target.closest('.lyric-panel-actions')||e.target.closest('.lyric-scroll'))return;
            var t=e.touches[0];onDragStart(t.clientX,t.clientY);
        },{passive:true});
        document.addEventListener('touchmove',function(e){
            if(!isDragging)return;
            var t=e.touches[0];onDragMove(t.clientX,t.clientY);
        },{passive:true});
        document.addEventListener('touchend',onDragEnd);
        // 关闭按钮
        lyricModule.querySelector('.lyric-close-btn').addEventListener('click',function(e){
            e.stopPropagation();
            lyricModule.classList.remove('expanded');
            lyricModuleExpanded=false;
            // 收起时重置位置，避免停留在下拉键位置拦截点击
            lyricModule.style.left='';
            lyricModule.style.top='';
            lyricModule.style.transform='';
        });
        // 设置按钮 - 打开QQ音乐风格设置面板
        lyricModule.querySelector('.lyric-setting-btn').addEventListener('click',function(e){
            e.stopPropagation();
            toggleLyricSettingPanel();
        });
        // 点击空白处收起歌词模块
        document.addEventListener('click',function(e){
            if(!lyricModule.contains(e.target)&&lyricModule.classList.contains('expanded')){
                lyricModule.classList.remove('expanded');
                lyricModuleExpanded=false;
                // 收起时重置位置，避免停留在下拉键位置拦截点击
                lyricModule.style.left='';
                lyricModule.style.top='';
                lyricModule.style.transform='';
            }
            // 点击空白处也关闭设置面板
            var panel=document.querySelector('.Nicole-lyric-setting-panel');
            if(panel&&!panel.contains(e.target)&&!e.target.closest('.lyric-setting-btn')){
                panel.classList.remove('show');
            }
        });
    }
    // QQ音乐风格歌词设置面板
    function toggleLyricSettingPanel(){
        var panel=document.querySelector('.Nicole-lyric-setting-panel');
        if(!panel){
            panel=document.createElement('div');
            panel.className='Nicole-lyric-setting-panel';
            panel.innerHTML='<div class="lsp-hd"><div class="lsp-title">歌词设置</div><div class="lsp-close">×</div></div><div class="lsp-body"><div class="lsp-section"><div class="lsp-label">歌词颜色</div><div class="lsp-colors"><div class="lsp-color" data-color="#ffffff" style="background:#fff"></div><div class="lsp-color" data-color="#000000" style="background:#000;border:1px solid #555"></div><div class="lsp-color" data-color="#ffd700" style="background:#ffd700"></div><div class="lsp-color" data-color="#ff6b6b" style="background:#ff6b6b"></div><div class="lsp-color" data-color="#4fc3f7" style="background:#4fc3f7"></div><div class="lsp-color" data-color="#81c784" style="background:#81c784"></div><div class="lsp-color" data-color="#ba68c8" style="background:#ba68c8"></div><div class="lsp-color" data-color="#ff9800" style="background:#ff9800"></div><div class="lsp-color" data-color="#e0e0e0" style="background:#e0e0e0"></div><div class="lsp-color" data-color="#f48fb1" style="background:#f48fb1"></div></div></div><div class="lsp-section"><div class="lsp-label"><span>字体大小</span><span class="lsp-val" id="lsp-size-val">20</span></div><input type="range" class="lsp-slider" id="lsp-size" min="12" max="36" value="20"></div><div class="lsp-section"><div class="lsp-label"><span>透明度</span><span class="lsp-val" id="lsp-opacity-val">100%</span></div><input type="range" class="lsp-slider" id="lsp-opacity" min="30" max="100" value="100"></div><div class="lsp-section"><div class="lsp-label"><span>滚动速度</span><span class="lsp-val" id="lsp-speed-val">1.0x</span></div><input type="range" class="lsp-slider" id="lsp-speed" min="5" max="20" value="10"></div><div class="lsp-section lsp-switch-row"><div class="lsp-label">桌面歌词</div><div class="lsp-switch" id="lsp-switch"><div class="lsp-switch-dot"></div></div></div><div class="lsp-reset" id="lsp-reset">恢复默认</div></div>';
            document.body.appendChild(panel);
            // 关闭按钮
            panel.querySelector('.lsp-close').addEventListener('click',function(){panel.classList.remove('show');});
            // 颜色选择
            panel.querySelectorAll('.lsp-color').forEach(function(c){
                c.addEventListener('click',function(){
                    var color=this.dataset.color;
                    danmuSettings.colorR=parseInt(color.slice(1,3),16);
                    danmuSettings.colorG=parseInt(color.slice(3,5),16);
                    danmuSettings.colorB=parseInt(color.slice(5,7),16);
                    NcStore.set('Nc-danmu-r',String(danmuSettings.colorR));
                    NcStore.set('Nc-danmu-g',String(danmuSettings.colorG));
                    NcStore.set('Nc-danmu-b',String(danmuSettings.colorB));
                    panel.querySelectorAll('.lsp-color').forEach(function(x){x.classList.remove('active');});
                    this.classList.add('active');
                    updateLyricModule();
                });
            });
            // 字体大小
            panel.querySelector('#lsp-size').addEventListener('input',function(){
                danmuSettings.size=parseInt(this.value);
                NcStore.set('Nc-danmu-size',String(danmuSettings.size));
                panel.querySelector('#lsp-size-val').textContent=this.value;
                updateLyricFontSize();
            });
            // 透明度
            panel.querySelector('#lsp-opacity').addEventListener('input',function(){
                danmuSettings.opacity=parseInt(this.value)/100;
                NcStore.set('Nc-danmu-opacity',String(danmuSettings.opacity));
                panel.querySelector('#lsp-opacity-val').textContent=this.value+'%';
                if(lyricModule)lyricModule.style.opacity=danmuSettings.opacity;
            });
            // 滚动速度
            panel.querySelector('#lsp-speed').addEventListener('input',function(){
                danmuSettings.speed=parseInt(this.value)/10;
                NcStore.set('Nc-danmu-speed',String(danmuSettings.speed));
                panel.querySelector('#lsp-speed-val').textContent=danmuSettings.speed.toFixed(1)+'x';
            });
            // 桌面歌词开关
            panel.querySelector('#lsp-switch').addEventListener('click',function(){
                this.classList.toggle('on');
                danmuEnabled=this.classList.contains('on');
                NcStore.set('Nc-mu-danmu',danmuEnabled?'1':'0');
                if(lyricModule)lyricModule.classList.toggle('hidden',!danmuEnabled);
                toggleDanmuBtn();
            });
            // 恢复默认
            panel.querySelector('#lsp-reset').addEventListener('click',function(){
                danmuSettings={colorR:255,colorG:255,colorB:255,size:20,speed:1,opacity:1,rainbow:false};
                NcStore.set('Nc-danmu-r','255');NcStore.set('Nc-danmu-g','255');NcStore.set('Nc-danmu-b','255');
                NcStore.set('Nc-danmu-size','20');NcStore.set('Nc-danmu-speed','1');NcStore.set('Nc-danmu-opacity','1');
                panel.querySelector('#lsp-size').value=20;panel.querySelector('#lsp-size-val').textContent='20';
                panel.querySelector('#lsp-opacity').value=100;panel.querySelector('#lsp-opacity-val').textContent='100%';
                panel.querySelector('#lsp-speed').value=10;panel.querySelector('#lsp-speed-val').textContent='1.0x';
                panel.querySelectorAll('.lsp-color').forEach(function(x){x.classList.remove('active');if(x.dataset.color==='#ffffff')x.classList.add('active');});
                if(lyricModule)lyricModule.style.opacity='1';
                updateLyricFontSize();updateLyricModule();
            });
        }
        // 初始化设置面板状态
        panel.querySelector('#lsp-size').value=danmuSettings.size;
        panel.querySelector('#lsp-size-val').textContent=danmuSettings.size;
        panel.querySelector('#lsp-opacity').value=Math.round(danmuSettings.opacity*100);
        panel.querySelector('#lsp-opacity-val').textContent=Math.round(danmuSettings.opacity*100)+'%';
        panel.querySelector('#lsp-speed').value=Math.round(danmuSettings.speed*10);
        panel.querySelector('#lsp-speed-val').textContent=danmuSettings.speed.toFixed(1)+'x';
        panel.querySelector('#lsp-switch').classList.toggle('on',danmuEnabled);
        var curColor='#'+[danmuSettings.colorR,danmuSettings.colorG,danmuSettings.colorB].map(function(x){return x.toString(16).padStart(2,'0');}).join('');
        panel.querySelectorAll('.lsp-color').forEach(function(x){x.classList.toggle('active',x.dataset.color.toLowerCase()===curColor.toLowerCase());});
        // 定位面板在歌词模块旁边
        if(lyricModule){
            var rect=lyricModule.getBoundingClientRect();
            panel.style.top=Math.min(rect.top,window.innerHeight-400)+'px';
            panel.style.left=Math.min(rect.right+10,window.innerWidth-300)+'px';
            if(panel.offsetLeft<10)panel.style.left='10px';
        }
        panel.classList.toggle('show');
    }
    function toggleLyricModule(){
        lyricModuleExpanded=!lyricModuleExpanded;
        lyricModule.classList.toggle('expanded',lyricModuleExpanded);
        if(lyricModuleExpanded){renderLyricLines();}
        else{
            // 收起时重置位置，避免停留在下拉键位置拦截点击
            lyricModule.style.left='';
            lyricModule.style.top='';
            lyricModule.style.transform='';
        }
    }
    function updateLyricFontSize(){
        if(!lyricModule)return;
        var lines=lyricModule.querySelectorAll('.lyric-line');
        lines.forEach(function(l){l.style.fontSize='';});
        var active=lyricModule.querySelector('.lyric-line.active');
        if(active)active.style.fontSize=(danmuSettings.size+2)+'px';
    }
    function renderLyricLines(){
        if(!lyricModule||!lyricModuleExpanded)return;
        var scroll=lyricModule.querySelector('.lyric-scroll');
        if(!scroll)return;
        if(danmuLyrics.length===0){
            scroll.innerHTML='<div class="lyric-empty">暂无歌词数据<br>播放歌曲后自动加载</div>';
            return;
        }
        var color='rgb('+danmuSettings.colorR+','+danmuSettings.colorG+','+danmuSettings.colorB+')';
        scroll.innerHTML=danmuLyrics.map(function(l,i){
            return '<div class="lyric-line" data-idx="'+i+'" style="color:'+color+';">'+l.text+'</div>';
        }).join('');
        // 绑定点击跳转
        scroll.querySelectorAll('.lyric-line').forEach(function(el){
            el.addEventListener('click',function(e){
                e.stopPropagation();
                var idx=parseInt(this.getAttribute('data-idx'));
                if(danmuLyrics[idx]&&!muAudio.paused){muAudio.currentTime=danmuLyrics[idx].time;}
            });
        });
    }
    function updateLyricModule(){
        if(!lyricModule||!danmuEnabled)return;
        var miniCurrent=lyricModule.querySelector('.lyric-current');
        var miniPrev=lyricModule.querySelector('.lyric-prev');
        if(danmuLyrics.length===0){
            if(miniCurrent)miniCurrent.textContent='未在播放';
            if(miniPrev)miniPrev.textContent='';
            return;
        }
        // 找到当前歌词
        var ct=muAudio.currentTime;
        var idx=-1;
        for(var i=0;i<danmuLyrics.length;i++){if(danmuLyrics[i].time<=ct+0.3)idx=i;else break;}
        if(idx===-1)return;
        var currentText=danmuLyrics[idx].text;
        var prevText=idx>0?danmuLyrics[idx-1].text:'';
        var color='rgb('+danmuSettings.colorR+','+danmuSettings.colorG+','+danmuSettings.colorB+')';
        // 更新迷你模式
        if(miniCurrent&&miniCurrent.textContent!==currentText){
            miniCurrent.textContent=currentText;
            miniCurrent.style.color=color;
            miniCurrent.style.fontSize=danmuSettings.size+'px';
        }
        if(miniPrev)miniPrev.textContent=prevText;
        // 更新展开模式
        if(lyricModuleExpanded){
            var lines=lyricModule.querySelectorAll('.lyric-line');
            if(lines.length!==danmuLyrics.length){renderLyricLines();lines=lyricModule.querySelectorAll('.lyric-line');}
            lines.forEach(function(l,i){
                l.classList.remove('active','near');
                l.style.color=color;
                l.style.fontSize='';
                if(i===idx){
                    l.classList.add('active');
                    l.style.fontSize=(danmuSettings.size+2)+'px';
                    // 滚动到当前歌词
                    var scroll=lyricModule.querySelector('.lyric-scroll');
                    if(scroll){
                        var lineTop=l.offsetTop;
                        scroll.scrollTo({top:lineTop-scroll.offsetHeight/2+l.offsetHeight/2,behavior:'smooth'});
                    }
                }else if(Math.abs(i-idx)<=2){
                    l.classList.add('near');
                }
            });
        }
    }
    function parseLRC(lrcText){if(!lrcText)return[];var res=[];var lines=lrcText.split('\n');lines.forEach(function(line){var m=line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);if(m){var t=parseInt(m[1])*60+parseInt(m[2])+parseInt(m[3].padEnd(3,'0'))/1000;var c=m[4].trim();if(c)res.push({time:t,text:c});}});return res.sort(function(a,b){return a.time-b.time;});}
    function fetchDanmuLyrics(song,artist){
        if(!song)return;
        var key=song+'_'+(artist||'');
        if(key===danmuSongKey&&danmuLyrics.length>0)return;
        danmuSongKey=key;danmuLyrics=[];danmuLastIdx=-1;
        var q=song+(artist?' '+artist:'');
        // 多引擎并行搜索歌词
        var sources=['netease','tencent','kugou'];
        var found=false;
        sources.forEach(function(src){
            if(found)return;
            muFetch(DANMU_API+'?types=search&count=3&source='+src+'&name='+encodeURIComponent(q),6000).then(function(r){return r.json();}).then(function(sr){
                if(found||!sr||!sr.length)return;
                var item=sr[0];
                return muFetch(DANMU_API+'?types=lyric&id='+item.id+'&source='+src,6000).then(function(r){return r.json();}).then(function(lr){
                    if(!found&&lr&&lr.lyric){found=true;danmuLyrics=parseLRC(lr.lyric);danmuLastIdx=-1;}
                });
            }).catch(function(){});
        });
        // 8秒后如果还没找到歌词，降级为只显示歌曲名弹幕
        setTimeout(function(){
            if(danmuLyrics.length===0&&!found){
                // 降级：每隔一段时间显示歌曲名和歌手名
                danmuLyrics=[{time:0,text:song+(artist?' - '+artist:'')}];
                danmuLastIdx=-1;
            }
        },8000);
    }
    function sendDanmu(text,isGradient){
        if(!danmuEnabled||!danmuContainer||!text)return;
        // 限制同时显示的弹幕数量
        var existing=danmuContainer.querySelectorAll('.Nicole-danmu-item');
        if(existing.length>6)return;
        var el=document.createElement('div');
        var useRainbow=danmuSettings.rainbow||isGradient;
        el.className='Nicole-danmu-item'+(useRainbow?' gradient':'');
        el.textContent=text;
        // 随机垂直位置（顶部10%-60%区域）
        var topPct=10+Math.random()*50;
        el.style.top=topPct+'%';
        // 使用用户设置的速度（基础速度±2秒随机）
        var dur=danmuSettings.speed-2+Math.random()*4;
        el.style.animationDuration=dur+'s';
        // 使用用户设置的字号（基础字号±4px随机）
        var fs=danmuSettings.size-2+Math.random()*4;
        el.style.fontSize=fs+'px';
        // 使用用户设置的颜色（非彩虹模式时）
        if(!useRainbow){
            el.style.color='rgb('+danmuSettings.colorR+','+danmuSettings.colorG+','+danmuSettings.colorB+')';
        }
        // 使用用户设置的透明度
        el.style.opacity=danmuSettings.opacity;
        danmuContainer.appendChild(el);
        // 动画结束后移除
        setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},dur*1000+500);
    }
    function updateDanmuLyrics(){
        if(!danmuEnabled||danmuLyrics.length===0||muAudio.paused)return;
        // 更新歌词模块（QQ音乐风格）
        updateLyricModule();
    }
    var danmuLastSendTime=0;
    function startDanmuTimer(){if(danmuTimer)clearInterval(danmuTimer);danmuTimer=setInterval(updateDanmuLyrics,800);}
    function stopDanmuTimer(){if(danmuTimer){clearInterval(danmuTimer);danmuTimer=null;}}
    function clearDanmu(){if(danmuContainer)danmuContainer.innerHTML='';danmuLastIdx=-1;}
    // ===== 弹幕设置面板（可拖动、颜色滑动条）=====
    var danmuSettings={
        colorR:parseInt(NcStore.get('Nc-danmu-r')||'255'),
        colorG:parseInt(NcStore.get('Nc-danmu-g')||'255'),
        colorB:parseInt(NcStore.get('Nc-danmu-b')||'255'),
        size:parseInt(NcStore.get('Nc-danmu-size')||'22'),
        speed:parseInt(NcStore.get('Nc-danmu-speed')||'10'),
        opacity:parseFloat(NcStore.get('Nc-danmu-opacity')||'1'),
        rainbow:(NcStore.get('Nc-danmu-rainbow')||'0')==='1'
    };
    var danmuPanel=null,danmuPanelVisible=false;
    function createDanmuPanel(){
        if(danmuPanel)return;
        danmuPanel=document.createElement('div');
        danmuPanel.className='Nicole-danmu-panel hidden';
        danmuPanel.innerHTML='<div class="Nicole-danmu-panel-hd"><div class="Nicole-danmu-panel-title"><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>弹幕设置</div><div class="Nicole-danmu-panel-close">×</div></div><div class="Nicole-danmu-panel-body"><div class="Nicole-danmu-row Nicole-danmu-toggle"><span style="font-size:13px;">弹幕开关</span><div class="Nicole-danmu-switch '+(danmuEnabled?'active':'')+'"></div></div><div class="Nicole-danmu-row Nicole-danmu-toggle"><span style="font-size:13px;">彩虹渐变</span><div class="Nicole-danmu-switch '+(danmuSettings.rainbow?'active':'')+'"></div></div><div class="Nicole-danmu-row"><div class="Nicole-danmu-label"><span>红色 R</span><span class="danmu-r-val">'+danmuSettings.colorR+'</span></div><input type="range" class="Nicole-danmu-slider Nicole-danmu-color-r danmu-slider-r" min="0" max="255" value="'+danmuSettings.colorR+'"></div><div class="Nicole-danmu-row"><div class="Nicole-danmu-label"><span>绿色 G</span><span class="danmu-g-val">'+danmuSettings.colorG+'</span></div><input type="range" class="Nicole-danmu-slider Nicole-danmu-color-g danmu-slider-g" min="0" max="255" value="'+danmuSettings.colorG+'"></div><div class="Nicole-danmu-row"><div class="Nicole-danmu-label"><span>蓝色 B</span><span class="danmu-b-val">'+danmuSettings.colorB+'</span></div><input type="range" class="Nicole-danmu-slider Nicole-danmu-color-b danmu-slider-b" min="0" max="255" value="'+danmuSettings.colorB+'"></div><div class="Nicole-danmu-color-preview danmu-color-preview"></div><div class="Nicole-danmu-row" style="margin-top:14px;"><div class="Nicole-danmu-label"><span>字号</span><span class="danmu-size-val">'+danmuSettings.size+'px</span></div><input type="range" class="Nicole-danmu-slider danmu-slider-size" min="14" max="40" value="'+danmuSettings.size+'" style="background:linear-gradient(to right,rgba(255,255,255,.2),rgba(79,195,247,.6));"></div><div class="Nicole-danmu-row"><div class="Nicole-danmu-label"><span>滚动速度</span><span class="danmu-speed-val">'+danmuSettings.speed+'s</span></div><input type="range" class="Nicole-danmu-slider danmu-slider-speed" min="5" max="20" value="'+danmuSettings.speed+'" style="background:linear-gradient(to right,rgba(255,255,255,.2),rgba(79,195,247,.6));"></div><div class="Nicole-danmu-row"><div class="Nicole-danmu-label"><span>不透明度</span><span class="danmu-opacity-val">'+Math.round(danmuSettings.opacity*100)+'%</span></div><input type="range" class="Nicole-danmu-slider danmu-slider-opacity" min="20" max="100" value="'+Math.round(danmuSettings.opacity*100)+'" style="background:linear-gradient(to right,rgba(255,255,255,.2),rgba(79,195,247,.6));"></div><button class="Nicole-danmu-reset danmu-reset-btn">恢复默认设置</button></div></div>';
        document.body.appendChild(danmuPanel);
        // 拖动功能
        var hd=danmuPanel.querySelector('.Nicole-danmu-panel-hd');
        var isDragging=false,startX=0,startY=0,startLeft=0,startTop=0;
        hd.addEventListener('mousedown',function(e){
            if(e.target.classList.contains('Nicole-danmu-panel-close'))return;
            isDragging=true;startX=e.clientX;startY=e.clientY;
            var rect=danmuPanel.getBoundingClientRect();
            startLeft=rect.left;startTop=rect.top;
            danmuPanel.style.right='auto';danmuPanel.style.left=startLeft+'px';danmuPanel.style.top=startTop+'px';
            e.preventDefault();
        });
        document.addEventListener('mousemove',function(e){
            if(!isDragging)return;
            var dx=e.clientX-startX,dy=e.clientY-startY;
            var newLeft=Math.max(0,Math.min(window.innerWidth-danmuPanel.offsetWidth,startLeft+dx));
            var newTop=Math.max(0,Math.min(window.innerHeight-danmuPanel.offsetHeight,startTop+dy));
            danmuPanel.style.left=newLeft+'px';danmuPanel.style.top=newTop+'px';
        });
        document.addEventListener('mouseup',function(){isDragging=false;});
        // 关闭按钮
        danmuPanel.querySelector('.Nicole-danmu-panel-close').addEventListener('click',function(){danmuPanel.classList.add('hidden');danmuPanelVisible=false;});
        // 弹幕开关
        danmuPanel.querySelectorAll('.Nicole-danmu-switch')[0].addEventListener('click',function(){
            danmuEnabled=!danmuEnabled;this.classList.toggle('active',danmuEnabled);
            NcStore.set('Nc-mu-danmu',danmuEnabled?'1':'0');
            if(danmuContainer)danmuContainer.classList.toggle('hidden',!danmuEnabled);
            if(lyricModule)lyricModule.classList.toggle('hidden',!danmuEnabled);
            toggleDanmuBtn();
            if(danmuEnabled&&!muAudio.paused){startDanmuTimer();updateLyricModule();}else{stopDanmuTimer();}
        });
        // 彩虹渐变开关
        danmuPanel.querySelectorAll('.Nicole-danmu-switch')[1].addEventListener('click',function(){
            danmuSettings.rainbow=!danmuSettings.rainbow;this.classList.toggle('active',danmuSettings.rainbow);
            NcStore.set('Nc-danmu-rainbow',danmuSettings.rainbow?'1':'0');
        });
        // 颜色滑动条
        function updateColorPreview(){
            var preview=danmuPanel.querySelector('.danmu-color-preview');
            if(preview)preview.style.background='rgb('+danmuSettings.colorR+','+danmuSettings.colorG+','+danmuSettings.colorB+')';
            // 实时更新歌词模块颜色
            if(lyricModule){
                var color='rgb('+danmuSettings.colorR+','+danmuSettings.colorG+','+danmuSettings.colorB+')';
                var miniCurrent=lyricModule.querySelector('.lyric-current');
                if(miniCurrent)miniCurrent.style.color=color;
                lyricModule.querySelectorAll('.lyric-line').forEach(function(l){l.style.color=color;});
            }
        }
        danmuPanel.querySelector('.danmu-slider-r').addEventListener('input',function(){danmuSettings.colorR=parseInt(this.value);danmuPanel.querySelector('.danmu-r-val').textContent=this.value;NcStore.set('Nc-danmu-r',this.value);updateColorPreview();});
        danmuPanel.querySelector('.danmu-slider-g').addEventListener('input',function(){danmuSettings.colorG=parseInt(this.value);danmuPanel.querySelector('.danmu-g-val').textContent=this.value;NcStore.set('Nc-danmu-g',this.value);updateColorPreview();});
        danmuPanel.querySelector('.danmu-slider-b').addEventListener('input',function(){danmuSettings.colorB=parseInt(this.value);danmuPanel.querySelector('.danmu-b-val').textContent=this.value;NcStore.set('Nc-danmu-b',this.value);updateColorPreview();});
        // 字号滑动条
        danmuPanel.querySelector('.danmu-slider-size').addEventListener('input',function(){danmuSettings.size=parseInt(this.value);danmuPanel.querySelector('.danmu-size-val').textContent=this.value+'px';NcStore.set('Nc-danmu-size',this.value);if(lyricModule){var miniCurrent=lyricModule.querySelector('.lyric-current');if(miniCurrent)miniCurrent.style.fontSize=this.value+'px';lyricModule.querySelectorAll('.lyric-line').forEach(function(l){if(!l.classList.contains('active'))l.style.fontSize='';});var active=lyricModule.querySelector('.lyric-line.active');if(active)active.style.fontSize=(parseInt(this.value)+2)+'px';}});
        // 速度滑动条
        danmuPanel.querySelector('.danmu-slider-speed').addEventListener('input',function(){danmuSettings.speed=parseInt(this.value);danmuPanel.querySelector('.danmu-speed-val').textContent=this.value+'s';NcStore.set('Nc-danmu-speed',this.value);});
        // 透明度滑动条
        danmuPanel.querySelector('.danmu-slider-opacity').addEventListener('input',function(){danmuSettings.opacity=parseInt(this.value)/100;danmuPanel.querySelector('.danmu-opacity-val').textContent=this.value+'%';NcStore.set('Nc-danmu-opacity',this.value);});
        // 恢复默认
        danmuPanel.querySelector('.danmu-reset-btn').addEventListener('click',function(){
            danmuSettings={colorR:255,colorG:255,colorB:255,size:22,speed:10,opacity:1,rainbow:false};
            ['Nc-danmu-r','Nc-danmu-g','Nc-danmu-b','Nc-danmu-size','Nc-danmu-speed','Nc-danmu-opacity','Nc-danmu-rainbow'].forEach(function(k){NcStore.remove(k);});
            danmuPanel.querySelector('.danmu-slider-r').value=255;danmuPanel.querySelector('.danmu-r-val').textContent='255';
            danmuPanel.querySelector('.danmu-slider-g').value=255;danmuPanel.querySelector('.danmu-g-val').textContent='255';
            danmuPanel.querySelector('.danmu-slider-b').value=255;danmuPanel.querySelector('.danmu-b-val').textContent='255';
            danmuPanel.querySelector('.danmu-slider-size').value=22;danmuPanel.querySelector('.danmu-size-val').textContent='22px';
            danmuPanel.querySelector('.danmu-slider-speed').value=10;danmuPanel.querySelector('.danmu-speed-val').textContent='10s';
            danmuPanel.querySelector('.danmu-slider-opacity').value=100;danmuPanel.querySelector('.danmu-opacity-val').textContent='100%';
            danmuPanel.querySelectorAll('.Nicole-danmu-switch')[1].classList.remove('active');
            updateColorPreview();
        });
        updateColorPreview();
    }
    function toggleDanmuPanel(){
        createDanmuPanel();
        danmuPanelVisible=!danmuPanelVisible;
        danmuPanel.classList.toggle('hidden',!danmuPanelVisible);
    }
    // 弹幕按钮切换
    function toggleDanmuBtn(){var btn=Q('.Nicole-jmu-danmu');if(btn){btn.classList.toggle('active',danmuEnabled);btn.title=danmuEnabled?'歌词弹幕:开':'歌词弹幕:关';}}
    // 初始化弹幕容器
    try{createDanmuContainer();}catch(e){}
    function muSavePlaylists(){NcStore.set('Nc-mu-playlists',JSON.stringify(muPlaylists));NcStore.set('Nc-mu-cur',String(muCurPlaylist));NcStore.set('Nc-mu-mode',muPlayMode);}
    function muRenderPlaylistSelect(){var sel=Q('.Nicole-jmu-playlist-select');if(!sel)return;sel.innerHTML=muPlaylists.map(function(p,i){return '<option value="'+i+'"'+(i===muCurPlaylist?' selected':'')+'>'+p.name+' ('+p.songs.length+')</option>';}).join('');}
    function muUpdateModeIcon(){var ic=Q('.Nicole-jmu-mode-icon');if(ic)ic.innerHTML=muModeIcons[muPlayMode];}
    function renderMuList(){var html=muList.map(function(s,i){return '<div class="Nicole-mu-item'+(i===muIdx?' active':'')+'" data-idx="'+i+'"><div class="mu-song-name">'+s.name+'</div><div class="mu-song-artist">'+s.artist+'</div><span class="jmudel" data-idx="'+i+'">×</span></div>';}).join('');Q('.Nicole-jmulist').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:20px;">暂无歌曲</div>';QA('.Nicole-mu-item').forEach(function(el){el.addEventListener('click',function(e){if(e.target.classList.contains('jmudel')){e.stopPropagation();var di=parseInt(e.target.getAttribute('data-idx'));muList.splice(di,1);if(muIdx>=muList.length)muIdx=0;muSavePlaylists();renderMuList();return;}muIdx=parseInt(this.getAttribute('data-idx'));playMu();});});}
    function muGetNextIdx(){if(muList.length===0)return 0;if(muPlayMode==='random'){var n=Math.floor(Math.random()*muList.length);if(n===muIdx&&muList.length>1)n=(n+1)%muList.length;return n;}return (muIdx+1)%muList.length;}
    function muPlayUrl(url,retry){
        if(!url)return;
        if(retry===undefined)retry=0;
        try{
            if(muAudio.src!==url){muAudio.src=url;muAudio.load();}
            var doPlay=function(){
                var p=muAudio.play();
                if(p&&typeof p.catch==='function'){
                    p.catch(function(){
                        if(retry<2){setTimeout(function(){muPlayUrl(url,retry+1);},300);}
                    });
                }
            };
            if(muAudio.readyState>=2){doPlay();}
            else{
                var onCan=function(){muAudio.removeEventListener('canplay',onCan);doPlay();};
                muAudio.addEventListener('canplay',onCan);
                setTimeout(function(){muAudio.removeEventListener('canplay',onCan);if(muAudio.paused&&retry<2){muPlayUrl(url,retry+1);}},5000);
            }
        }catch(e){if(retry<2)setTimeout(function(){muPlayUrl(url,retry+1);},300);}
    }
    function playMu(){
        if(muList.length===0)return;
        var s=muList[muIdx];
        Q('.Nicole-jmunow').textContent=s.name+' - '+s.artist;
        Q('.Nicole-jmuwaves').classList.add('playing');
        muPlaying=true;
        Q('.Nicole-jmuicon').innerHTML='<rect x="6" y="4" width="4" height="16" fill="#222"/><rect x="14" y="4" width="4" height="16" fill="#222"/>';
        if(s.cover){QA('.Nicole-jmuf1,.Nicole-jmuf2').forEach(function(el){el.style.backgroundImage='url('+s.cover+')';});}
        if(s.url){
            muPlayUrl(s.url);
            fetchDanmuLyrics(s.name,s.artist);startDanmuTimer();
        }else{
            var q=s.name+(s.artist&&s.artist!=='未知歌手'?' '+s.artist:'');
            Q('.Nicole-jmunow').textContent='搜索中: '+q;
            muResolve(q).then(function(hit){
                if(hit){
                    s.url=hit.url;s.name=hit.name||s.name;s.artist=hit.artist||s.artist;
                    Q('.Nicole-jmunow').textContent=s.name+' - '+s.artist;
                    muSavePlaylists();renderMuList();
                    muPlayUrl(hit.url);
                    fetchDanmuLyrics(s.name,s.artist);startDanmuTimer();
                }else{
                    // 降级：只搜歌名
                    if(s.artist&&s.artist!=='未知歌手'){
                        Q('.Nicole-jmunow').textContent='降级搜索中: '+s.name;
                        muResolve(s.name).then(function(hit2){
                            if(hit2){
                                s.url=hit2.url;s.name=hit2.name||s.name;s.artist=hit2.artist||s.artist;
                                Q('.Nicole-jmunow').textContent=s.name+' - '+s.artist;
                                muSavePlaylists();renderMuList();
                                muPlayUrl(hit2.url);
                                fetchDanmuLyrics(s.name,s.artist);startDanmuTimer();
                            }else{
                                Q('.Nicole-jmunow').textContent='搜索失败: '+s.name;
                                pauseMu();
                            }
                        });
                    }else{
                        Q('.Nicole-jmunow').textContent='搜索失败: '+s.name;
                        pauseMu();
                    }
                }
            });
        }
    }
    function pauseMu(){muPlaying=false;muAudio.pause();stopDanmuTimer();Q('.Nicole-jmuwaves').classList.remove('playing');Q('.Nicole-jmuicon').innerHTML='<polygon points="7 4 19 12 7 20 7 4" fill="#222"/>';}
    // 音频播放结束后根据播放模式切换
    muAudio.addEventListener('ended',function(){
        if(muPlayMode==='loop'){muAudio.currentTime=0;muAudio.play().catch(function(){});}
        else if(muPlayMode==='order'){if(muIdx<muList.length-1){muIdx++;playMu();}else{pauseMu();}}
        else{muIdx=muGetNextIdx();playMu();}
    });
    Q('.Nicole-jmuplay').addEventListener('click',function(){if(muPlaying){pauseMu();}else{playMu();}});
    Q('.Nicole-jmuprev').addEventListener('click',function(){if(muList.length===0)return;muIdx=(muIdx-1+muList.length)%muList.length;playMu();});
    Q('.Nicole-jmunext').addEventListener('click',function(){if(muList.length===0)return;muIdx=muGetNextIdx();playMu();});
    // 播放模式切换
    Q('.Nicole-jmu-mode').addEventListener('click',function(){var modes=['loop','order','random'];var ci=modes.indexOf(muPlayMode);muPlayMode=modes[(ci+1)%modes.length];muUpdateModeIcon();muSavePlaylists();renderSysMsg('已切换为: '+muModeNames[muPlayMode]);});
    // 歌词模块开关 - 单击显示/隐藏，双击打开设置面板
    var danmuClickTimer=null;
    Q('.Nicole-jmu-danmu').addEventListener('click',function(){
        if(danmuClickTimer){clearTimeout(danmuClickTimer);danmuClickTimer=null;toggleDanmuPanel();return;}
        danmuClickTimer=setTimeout(function(){
            danmuClickTimer=null;
            danmuEnabled=!danmuEnabled;
            NcStore.set('Nc-mu-danmu',danmuEnabled?'1':'0');
            toggleDanmuBtn();
            if(lyricModule)lyricModule.classList.toggle('hidden',!danmuEnabled);
            if(danmuContainer)danmuContainer.classList.toggle('hidden',!danmuEnabled);
            if(danmuEnabled&&muPlaying){startDanmuTimer();updateLyricModule();}else{stopDanmuTimer();}
            renderSysMsg('歌词模块: '+(danmuEnabled?'显示':'隐藏')+' (双击打开设置)');
        },250);
    });
    // 歌单切换
    Q('.Nicole-jmu-playlist-select').addEventListener('change',function(){muCurPlaylist=parseInt(this.value);muList=muPlaylists[muCurPlaylist].songs;muIdx=0;pauseMu();muSavePlaylists();renderMuList();});
    // 新建歌单
    Q('.Nicole-jmu-playlist-add').addEventListener('click',function(){var name=prompt('输入新歌单名称:','歌单'+(muPlaylists.length+1));if(name&&name.trim()){muPlaylists.push({name:name.trim(),songs:[]});muCurPlaylist=muPlaylists.length-1;muList=muPlaylists[muCurPlaylist].songs;muIdx=0;muSavePlaylists();muRenderPlaylistSelect();renderMuList();}});
    // 删除歌单
    Q('.Nicole-jmu-playlist-del').addEventListener('click',function(){if(muPlaylists.length<=1){renderSysMsg('至少保留一个歌单');return;}if(confirm('确定删除歌单「'+muPlaylists[muCurPlaylist].name+'」？')){muPlaylists.splice(muCurPlaylist,1);muCurPlaylist=0;muList=muPlaylists[0].songs;muIdx=0;pauseMu();muSavePlaylists();muRenderPlaylistSelect();renderMuList();}});
    // 搜索按钮 - 搜索成功后自动添加并播放，失败自动降级只搜歌名
    Q('.Nicole-jmu-search').addEventListener('click',function(){
        var name=Q('.Nicole-jmuname').value.trim();
        var artist=Q('.Nicole-jmuartist').value.trim();
        if(!name){renderSysMsg('请输入歌曲名称');return;}
        var q=name+(artist?' '+artist:'');
        Q('.Nicole-jmunow').textContent='搜索中(6引擎并行): '+q;
        muResolve(q).then(function(hit){
            if(hit){
                var cover=Q('.Nicole-jmucover').value.trim();
                muList.push({name:hit.name||name,artist:hit.artist||artist||'未知歌手',cover:cover,url:hit.url});
                muIdx=muList.length-1;muSavePlaylists();renderMuList();
                Q('.Nicole-jmuname').value='';Q('.Nicole-jmuartist').value='';Q('.Nicole-jmucover').value='';Q('.Nicole-jmuinp').value='';
                Q('.Nicole-jmunow').textContent='正在播放: '+hit.name+' - '+(hit.artist||artist);
                renderSysMsg('搜索成功('+hit.source+')，已添加并播放');
                playMu();
            }else if(artist){
                // 降级：只搜歌名
                Q('.Nicole-jmunow').textContent='降级搜索中(仅歌名): '+name;
                muResolve(name).then(function(hit2){
                    if(hit2){
                        var cover=Q('.Nicole-jmucover').value.trim();
                        muList.push({name:hit2.name||name,artist:hit2.artist||artist||'未知歌手',cover:cover,url:hit2.url});
                        muIdx=muList.length-1;muSavePlaylists();renderMuList();
                        Q('.Nicole-jmuname').value='';Q('.Nicole-jmuartist').value='';Q('.Nicole-jmucover').value='';Q('.Nicole-jmuinp').value='';
                        Q('.Nicole-jmunow').textContent='正在播放: '+hit2.name+' - '+(hit2.artist||artist);
                        renderSysMsg('降级搜索成功('+hit2.source+')，已添加并播放');
                        playMu();
                    }else{
                        Q('.Nicole-jmunow').textContent='搜索失败: '+q;
                        renderSysMsg('搜索失败，可能原因：①网络/VPN问题 ②API服务器限流 ③歌曲名不准确。建议：换关键词重试，或在"直链"框手动粘贴mp3地址');
                    }
                });
            }else{
                Q('.Nicole-jmunow').textContent='搜索失败: '+q;
                renderSysMsg('搜索失败，可能原因：①网络/VPN问题 ②API服务器限流 ③歌曲名不准确。建议：换关键词重试，或在"直链"框手动粘贴mp3地址');
            }
        });
    });
    Q('.Nicole-jmuaddbtn').addEventListener('click',function(){var name=Q('.Nicole-jmuname').value.trim()||'未命名';var artist=Q('.Nicole-jmuartist').value.trim()||'未知歌手';var cover=Q('.Nicole-jmucover').value.trim();var url=Q('.Nicole-jmuinp').value.trim();muList.push({name:name,artist:artist,cover:cover,url:url});muSavePlaylists();renderMuList();Q('.Nicole-jmuname').value='';Q('.Nicole-jmuartist').value='';Q('.Nicole-jmucover').value='';Q('.Nicole-jmuinp').value='';});
    Q('.Nicole-jmuinv').addEventListener('click',function(){if(muList.length===0){renderSysMsg('请先添加歌曲');return;}var s=muList[muIdx];renderRight('<div class="Nicole-music-share-card"><div class="Nicole-msc-top"><div class="Nicole-msc-cover" style="background-image:url('+(s.cover||'')+')"><div class="Nicole-msc-playic"><svg viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4"/></svg></div></div><div class="Nicole-msc-info"><div class="Nicole-msc-name">'+s.name+'</div><div class="Nicole-msc-artist">'+s.artist+'</div></div></div><div class="Nicole-msc-bot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>一起听歌</div></div>',true,isBlkRight);playSwoosh();appendCmd(isBlkRight?'$[发送失败]':'[我听歌:'+s.name+'|'+s.artist+']');Q('.Nicole-jmumodal').classList.remove('show');});
    muRenderPlaylistSelect();muUpdateModeIcon();toggleDanmuBtn();renderMuList();

    // ===== COUPLE SPACE =====
    var cpThings=JSON.parse(NcStore.get('Nc-cp-things')||'[]');
    var cpDays=JSON.parse(NcStore.get('Nc-cp-days')||'[]');
    var cpAlbums=JSON.parse(NcStore.get('Nc-cp-albums')||'[]');
    function renderCpThings(){var html=cpThings.map(function(t,i){return '<div class="Nicole-cp-thing'+(t.done?' done':'')+'" data-idx="'+i+'"><div class="dot"></div><span>'+(t.who==='Me'?finalRName:finalLName)+': '+t.text+'</span></div>';}).join('');Q('.Nicole-jcpthings').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:10px;">还没有想做的小事</div>';QA('.Nicole-cp-thing').forEach(function(el){el.addEventListener('click',function(){var idx=parseInt(this.getAttribute('data-idx'));cpThings[idx].done=!cpThings[idx].done;NcStore.set('Nc-cp-things',JSON.stringify(cpThings));renderCpThings();});});}
    function renderCpDays(){var html=cpDays.map(function(d){var dDate=new Date(d.date);var now=new Date();var diff=Math.ceil((now-dDate)/(1000*60*60*24));return '<div class="Nicole-cp-day"><span>'+d.name+'</span><b>'+(diff>=0?diff+'天前':'还有'+Math.abs(diff)+'天')+'</b></div>';}).join('');Q('.Nicole-jcpdays').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:10px;">还没有纪念日</div>';}
    function renderCpAlbums(){var html=cpAlbums.map(function(a){if(a.img){return '<div class="Nicole-cp-album-card"><div class="Nicole-cp-album-img" style="background-image:url('+a.img+')"></div><div class="Nicole-cp-album-who">'+a.who+'</div><div class="Nicole-cp-album-txt">'+a.txt+'</div></div>';}else{return '<div class="Nicole-cp-album-card"><div class="Nicole-cp-album-txt-only">'+a.txt+'</div></div>';}}).join('');Q('.Nicole-jcpalbums').innerHTML=html||'<div style="text-align:center;color:#aaa;font-size:12px;padding:10px;grid-column:1/-1;">还没有相册</div>';}
    Q('.Nicole-jcpthingadd').addEventListener('click',function(){var text=Q('.Nicole-jcpthingin').value.trim();var who=Q('.Nicole-jcpwho').value;if(text){cpThings.push({text:text,who:who,done:false});NcStore.set('Nc-cp-things',JSON.stringify(cpThings));renderCpThings();Q('.Nicole-jcpthingin').value='';}});
    Q('.Nicole-jcpdayadd').addEventListener('click',function(){var name=Q('.Nicole-jcpdayname').value.trim();var date=Q('.Nicole-jcpdaydate').value;if(name&&date){cpDays.push({name:name,date:date});NcStore.set('Nc-cp-days',JSON.stringify(cpDays));renderCpDays();Q('.Nicole-jcpdayname').value='';Q('.Nicole-jcpdaydate').value='';}});
    Q('.Nicole-jcpalbumadd').addEventListener('click',function(){var txt=Q('.Nicole-jcpalbumtxt').value.trim();var img=Q('.Nicole-jcpalbumimg').value.trim();if(txt||img){cpAlbums.unshift({txt:txt||'图片',img:img,who:finalRName});NcStore.set('Nc-cp-albums',JSON.stringify(cpAlbums));renderCpAlbums();Q('.Nicole-jcpalbumtxt').value='';Q('.Nicole-jcpalbumimg').value='';}});
    var cSign=NcStore.get('Nc-csign')||'';var uSign=NcStore.get('Nc-usign')||'';
    Q('.Nicole-jcsign').textContent=cSign;
    Q('.Nicole-jusign-disp').textContent=uSign;
    Q('.Nicole-jusignsave').addEventListener('click',function(){var val=Q('.Nicole-jusignin').value.trim();if(val){uSign=val;NcStore.set('Nc-usign',val);Q('.Nicole-jusign-disp').textContent=val;Q('.Nicole-jusignin').value='';appendCmd('$[更新个签:'+val+']');}});
    Q('.Nicole-jsigndel').addEventListener('click',function(){uSign='';NcStore.set('Nc-usign','');Q('.Nicole-jusign-disp').textContent='';});
    Q('.Nicole-jcprel').textContent='相恋中 · 永远在一起';
    renderCpThings();renderCpDays();renderCpAlbums();

    // ===== PYQ (朋友圈) =====
    var pyqList=JSON.parse(NcStore.get('Nc-pyq-list')||'[]');
    function renderPyq(){
        var html=pyqList.map(function(p){
            var h='<div class="Nicole-pyq-item" data-id="'+p.id+'"><div class="Nicole-pyq-delbtn jpyqdel" data-id="'+p.id+'" title="删除"><svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div>';
            var avStyle=p.uav?' style="background-image:url(\''+p.uav.replace(/'/g,'%27')+'\')"':'';
            h+='<div class="Nicole-pyq-iav"'+avStyle+'></div><div class="Nicole-pyq-ict"><div class="Nicole-pyq-inm">'+p.uname+'</div>';
            if(p.txt)h+='<div class="Nicole-pyq-itxt">'+p.txt+'</div>';
            if(p.txtimg)h+='<div class="Nicole-pyq-txtimg Nicole-txt-img">'+p.txtimg+'</div>';
            else if(p.img)h+='<img src="'+getRealImgUrl(p.img)+'" class="Nicole-pyq-iimg">';
            h+='<div class="Nicole-pyq-ibot"><span>'+p.time+'</span><div class="Nicole-pyq-iacts"><div class="Nicole-pyq-btn jpyqlike" data-id="'+p.id+'"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'+(p.likes&&p.likes.length?' '+p.likes.length:'')+'</div><div class="Nicole-pyq-btn jpyqcom" data-id="'+p.id+'"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'+(p.comments&&p.comments.length?' '+p.comments.length:'')+'</div></div></div>';
            if(p.likes&&p.likes.length||p.comments&&p.comments.length){h+='<div class="Nicole-pyq-ints">';if(p.likes&&p.likes.length)h+='<div class="Nicole-pyq-likes"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'+p.likes.join('、')+'</div>';if(p.comments&&p.comments.length){h+='<div class="Nicole-pyq-coms">';p.comments.forEach(function(c){h+='<div class="Nicole-pyq-com"><span>'+c.from+'</span>：'+c.text+'</div>';});h+='</div>';}h+='</div>';}
            h+='</div></div>';return h;
        }).join('');
        Q('.Nicole-jpyqlist').innerHTML=html;
        QA('.jpyqlike').forEach(function(btn){btn.addEventListener('click',function(){var id=this.getAttribute('data-id');var p=pyqList.find(function(x){return x.id===id;});if(!p)return;if(!p.likes)p.likes=[];if(p.likes.indexOf(finalRName)===-1){p.likes.push(finalRName);appendCmd('$[点赞朋友圈]');}else{p.likes=p.likes.filter(function(n){return n!==finalRName;});}NcStore.set('Nc-pyq-list',JSON.stringify(pyqList));renderPyq();});});
        QA('.jpyqcom').forEach(function(btn){btn.addEventListener('click',function(){curPyqIdx=this.getAttribute('data-id');Q('.Nicole-jpyqcomtxt').value='';Q('.Nicole-jpyqcommodal').classList.add('show');});});
        QA('.jpyqdel').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation();var id=this.getAttribute('data-id');pyqList=pyqList.filter(function(x){return x.id!==id;});NcStore.set('Nc-pyq-list',JSON.stringify(pyqList));renderPyq();appendCmd('$[删除朋友圈]');});});
    }
    var curPyqIdx=-1;
    Q('.Nicole-jpyqbtn').addEventListener('click',function(){Q('.Nicole-jpyqpanel').classList.add('show');renderPyq();});
    Q('.Nicole-jpyqback').addEventListener('click',function(){Q('.Nicole-jpyqpanel').classList.remove('show');});
    Q('.Nicole-jpyqadd').addEventListener('click',function(){Q('.Nicole-jpyqsendmodal').classList.add('show');});
    Q('.Nicole-jpyqsendcancel').addEventListener('click',function(){Q('.Nicole-jpyqsendmodal').classList.remove('show');});
    Q('.Nicole-jpyqsendok').addEventListener('click',function(){
        var t=Q('.Nicole-jpyqsendtxt').value.trim();var i=Q('.Nicole-jpyqsendimg').value.trim();var ti=Q('.Nicole-jpyqsendtxtimg').value.trim();
        if(t||i||ti){
            var newId='pyq_'+Date.now();
            var pyqUav=NcStore.get('Nc-pyq-uav')||safeRAv;
            pyqList.unshift({id:newId,txt:t,img:i,txtimg:ti,uname:finalRName,uav:pyqUav,time:'刚刚',likes:[],comments:[]});
            NcStore.set('Nc-pyq-list',JSON.stringify(pyqList));
            appendCmd('[我朋友圈:'+t+'|'+(i?i:(ti?'text:'+ti:''))+']');
            renderPyq();
            Q('.Nicole-jpyqsendmodal').classList.remove('show');
            Q('.Nicole-jpyqsendtxt').value='';Q('.Nicole-jpyqsendimg').value='';Q('.Nicole-jpyqsendtxtimg').value='';
        }
    });
    Q('.Nicole-jpyqcomcancel').addEventListener('click',function(){Q('.Nicole-jpyqcommodal').classList.remove('show');});
    Q('.Nicole-jpyqcomok').addEventListener('click',function(){var t=Q('.Nicole-jpyqcomtxt').value.trim();if(t){var p=pyqList.find(function(x){return x.id===curPyqIdx;});if(p){if(!p.comments)p.comments=[];p.comments.push({from:finalRName,text:t});NcStore.set('Nc-pyq-list',JSON.stringify(pyqList));renderPyq();appendCmd('$[评论朋友圈:'+t+']');}Q('.Nicole-jpyqcommodal').classList.remove('show');Q('.Nicole-jpyqcomtxt').value='';}});
    Q('.Nicole-jpyq-uav').addEventListener('click',function(){var fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.onchange=function(e){var f=e.target.files[0];if(!f)return;var reader=new FileReader();reader.onload=function(re){var b64=re.target.result;NcStore.set('Nc-pyq-uav',b64);Q('.Nicole-jpyq-uav').style.backgroundImage='url('+b64+')';};reader.readAsDataURL(f);};fileInp.click();});
    Q('.Nicole-jpyq-cover').addEventListener('click',function(){var fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.onchange=function(e){var f=e.target.files[0];if(!f)return;var reader=new FileReader();reader.onload=function(re){var b64=re.target.result;NcStore.set('Nc-pyq-cover',b64);Q('.Nicole-jpyq-cover').style.backgroundImage='url('+b64+')';};reader.readAsDataURL(f);};fileInp.click();});
    var savedPyqCover=NcStore.get('Nc-pyq-cover');if(savedPyqCover)Q('.Nicole-jpyq-cover').style.backgroundImage='url('+savedPyqCover+')';
    var savedPyqUav=NcStore.get('Nc-pyq-uav')||safeRAv;if(savedPyqUav)Q('.Nicole-jpyq-uav').style.backgroundImage='url('+savedPyqUav.replace(/'/g,'%27')+')';
    renderPyq();

    // init welcome
    renderSysMsg('Nicole 手机已连接 · '+finalLName);
}

/* ============ MAIN INIT & CHAR SWITCH ============ */
var finalLName='',finalRName='',finalLAv='',finalRAv='',safeLAv='',safeRAv='',currentCharName='',currentChatId2='',ncManualChar=false;
var currentCharName='';
async function doInit(){
    try{
        console.log('[nicoPhone] 初始化开始');
        var built=buildExtension();
        if(!built){console.log('[nicoPhone] 已加载，跳过');return;}
        var charInfo=getTavernChar();
        var userInfo=getTavernUser();
        // triggerSlash 加超时，防止移动端卡住
        function triggerSafe(cmd){
            return new Promise(function(resolve){
                var done=false;
                var timer=setTimeout(function(){if(!done){done=true;resolve(null);}},2500);
                try{
                    var p=triggerSlash(cmd);
                    if(p&&typeof p.then==='function'){
                        p.then(function(r){if(!done){done=true;clearTimeout(timer);resolve(r);}}).catch(function(){if(!done){done=true;clearTimeout(timer);resolve(null);}});
                    }else{if(!done){done=true;clearTimeout(timer);resolve(p);}}
                }catch(e){if(!done){done=true;clearTimeout(timer);resolve(null);}}
            });
        }
        if(typeof triggerSlash==='function'){
            var cn=await triggerSafe('/pass {{char}}');
            if(cn&&cn.trim())charInfo.name=cn.trim();
            var ca=await triggerSafe('/pass {{charAvatarPath}}');
            if(ca&&ca.trim())charInfo.avatar=ca.trim();
            var un=await triggerSafe('/pass {{user}}');
            if(un&&un.trim())userInfo.name=un.trim();
            var ua=await triggerSafe('/pass {{userAvatarPath}}');
            if(ua&&ua.trim())userInfo.avatar=ua.trim();
        }
        currentCharName=charInfo.name;
        // 先显示浮动按钮，确保即使面板初始化失败也能看到
        try{
            if(typeof positionFloatBtn==='function') positionFloatBtn();
            built.floatEl.style.display='block';
            built.btn.style.display='flex';
            console.log('[nicoPhone] 浮动按钮位置:',built.floatEl.getBoundingClientRect());
        }catch(e){console.error('[nicoPhone] 显示浮动按钮失败:',e);}
        try{
            initPhone(built.panel,charInfo,userInfo);
            console.log('[nicoPhone] 初始化完成，角色：'+charInfo.name);
        }catch(e){
            console.error('[nicoPhone] 面板初始化错误:',e);
        }
        window.NcAPI={
            openCallUI:function(type,dir){try{var call=document.querySelector('.Nicole-jcall');if(call){call.classList.remove('state-out','state-in','video');call.classList.add(dir==='in'?'state-in':'state-out');if(type==='video')call.classList.add('video');call.classList.add('show');var st=call.querySelector('.Nicole-jcall-st');if(st)st.textContent=dir==='in'?'对方发起通话...':'正在呼叫...';var nm=call.querySelector('.Nicole-jcall-nm');if(nm)nm.textContent=finalLName;}}catch(e){}},
            addPyq:function(txt,img){try{var modal=document.querySelector('.Nicole-jpyqsendtxt');if(modal)modal.value=txt||'';var imgInp=document.querySelector('.Nicole-jpyqsendimg');if(imgInp)imgInp.value=img||'';var btn=document.querySelector('.Nicole-jpyqsendok');if(btn)btn.click();}catch(e){}},
            renderSysMsg:function(txt){try{renderSysMsg(txt);}catch(e){}}
        };
        startStoryListener();
        // 浮动按钮已在前面显示，这里只做日志
        console.log('[nicoPhone] 浮动按钮已显示');
    }catch(e){
        console.error('[nicoPhone] 初始化错误:',e);
    }
}
// 酒馆下拉键修复：JS持续修复，只改text-align不碰display
function ncFixPullButton(){
    try{
        var wrap=document.querySelector('.welcomeRecent');
        if(wrap){
            wrap.style.setProperty('text-align','center','important');
            wrap.style.setProperty('display','block','important');
        }
        var panel=document.querySelector('.welcomePanel');
        if(panel){
            panel.style.setProperty('justify-content','center','important');
            panel.style.setProperty('display','flex','important');
        }
        var btn=document.querySelector('button.menu_button_icon.showMoreChats');
        if(btn){
            btn.style.setProperty('pointer-events','auto','important');
            btn.style.setProperty('z-index','999999','important');
            btn.style.setProperty('position','relative','important');
        }
    }catch(e){}
}
setTimeout(ncFixPullButton,1000);
setTimeout(ncFixPullButton,2000);
setTimeout(ncFixPullButton,4000);
setTimeout(ncFixPullButton,6000);
var currentChatId2='';
function checkCharSwitch(){
    try{
        var charInfo=getTavernChar();
        // 从页面获取真实角色名（比 getTavernChar 更可靠）
        var realName='';
        var nameSels=['.char-name','#ch_name','.character-name','#character_name','[class*="char-name"]','[class*="charName"]','.chat-header-name','.character_card_name','[data-testid*="char"]','.profile_name'];
        for(var i=0;i<nameSels.length;i++){
            var nel=document.querySelector(nameSels[i]);
            if(nel&&nel.textContent&&nel.textContent.trim()&&nel.textContent.trim().length<30&&nel.textContent.trim()!=='SillyTavern'&&nel.textContent.trim()!=='Mufy'){
                realName=nel.textContent.trim();break;
            }
        }
        var chatId=window.chat_id||window.location.hash||'';
        var nameChanged=(realName&&realName!==currentCharName);
        var chatChanged=(chatId&&chatId!==currentChatId2);
        if(nameChanged||chatChanged){
            // 如果是从聊天列表手动选择的角色，不自动切换
            if(ncManualChar){
                console.log('[Nicole] 手动选择角色模式，跳过自动切换: current='+currentCharName+' detected='+realName);
                currentChatId2=chatId;
                return;
            }
            console.log('[Nicole] 切换检测: name='+currentCharName+'→'+realName+' chat='+currentChatId2+'→'+chatId);
            var panel=document.getElementById(PANEL_ID);
            if(panel){
                // 切换前保存当前角色记录
                if(currentCharName) saveChatForChar(currentCharName);
                panel.innerHTML=HTML;
                var userInfo=getTavernUser();
                currentCharName=realName||charInfo.name;
                currentChatId2=chatId;
                initPhone(panel,{name:realName||charInfo.name,avatar:''},userInfo);
                // 切换后加载新角色记录
                setTimeout(function(){loadChatForChar(currentCharName);},100);
            }
        }
    }catch(e){console.log('[Nicole] checkCharSwitch error:',e);}
}

// wait for DOM ready
// 健壮的初始化：等待document.body准备好，多次尝试
function safeInit(){
    try{
        if(!document.body){setTimeout(safeInit,100);return;}
        doInit();
    }catch(e){
        console.error('[nicoPhone] safeInit错误:',e);
        setTimeout(safeInit,500);
    }
}
if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',safeInit);
}else{
    safeInit();
}
// poll for char switch every 2 seconds
setInterval(checkCharSwitch,5000);

// 多重兜底：1秒、3秒、5秒、10秒后检查浮动按钮
[1000,3000,5000,10000].forEach(function(t){
    setTimeout(function(){
        var f=document.getElementById('nicole-float');
        if(!f){
            console.warn('[nicoPhone] '+t+'ms 浮动按钮未创建，重试');
            try{safeInit();}catch(e){console.error('[nicoPhone] 重试失败:',e);}
        }else{
            f.style.display='block';
            var btn=document.getElementById('nicole-toggle-btn');
            if(btn)btn.style.display='flex';
            console.log('[nicoPhone] '+t+'ms 浮动按钮已显示');
        }
    },t);
});


// ========== 剧情联动：支持多种消息类型，区分用户/角色 ==========
var storyObserver2=null;
var processedStoryNodes2=new WeakSet();
var ncObserverReady=false;
var ncPageLoadTime=Date.now();
function ncIsInitializing(){return Date.now()-ncPageLoadTime<8000;}
function startStoryListener(){
    if(storyObserver2){storyObserver2.disconnect();storyObserver2=null;}
    ncObserverReady=false;
    setTimeout(function(){ncObserverReady=true;console.log('[Nicole] 剧情监听器就绪');},3000);
    try{
        var ncObserveTimer=null,ncPendingMutations=[],ncRafId=null;
        storyObserver2=new MutationObserver(function(mutations){
            if(!ncObserverReady) return;
            // 只收集有新增节点的mutation，减少处理量
            var hasAdd=false;
            for(var mi=0;mi<mutations.length;mi++){
                if(mutations[mi].addedNodes&&mutations[mi].addedNodes.length>0){hasAdd=true;break;}
            }
            if(!hasAdd) return;
            ncPendingMutations=ncPendingMutations.concat(mutations);
            if(ncObserveTimer) clearTimeout(ncObserveTimer);
            if(ncRafId) cancelAnimationFrame(ncRafId);
            ncObserveTimer=setTimeout(function(){
                ncRafId=requestAnimationFrame(function(){
                    var pending=ncPendingMutations;ncPendingMutations=[];ncRafId=null;
                    var processed=0;
                    for(var mi=0;mi<pending.length&&processed<50;mi++){
                        var added=pending[mi].addedNodes;
                        for(var ai=0;ai<added.length&&processed<50;ai++){
                            var node=added[ai];
                            if(node.nodeType!==1) continue;
                            if(node.closest&&node.closest('#'+PANEL_ID)) continue;
                            scanNodeForPhoneMsg2(node);processed++;
                            if(node.querySelectorAll&&processed<50){
                                var children=node.querySelectorAll('div,p,span,li');
                                for(var ci=0;ci<children.length&&processed<50;ci++){
                                    if(children[ci].closest&&children[ci].closest('#'+PANEL_ID)) continue;
                                    scanNodeForPhoneMsg2(children[ci]);processed++;
                                }
                            }
                        }
                    }
                });
            },600);
        });
        storyObserver2.observe(document.body,{childList:true,subtree:true,characterData:false,attributes:false});
        console.log('[Nicole] 剧情监听器已启动（3秒冷却中，已优化性能）');
    }catch(e){console.log('[Nicole] 剧情监听器失败:',e);}
}
// 获取所有需要匹配的角色名（备注名+原始角色卡名）
function getCharNames(){
    var names=[];
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'&&finalLName!=='我')names.push(finalLName);
    if(currentCharName&&currentCharName!=='角色'&&currentCharName!=='Unknown'&&currentCharName!=='我'&&names.indexOf(currentCharName)===-1)names.push(currentCharName);
    return names;
}
function ncGuessIsUser(node){
    if(!node) return false;
    var el=node;
    for(var i=0;i<12&&el;i++){
        if(el.classList&&el.className){
            var cls=(' '+el.className+' ').toLowerCase();
            if(/\b(you|user_mes|user-message|my-message|me-msg|right-msg|msg-right|user_msg|usermsg|message-right|right-message|user|my-msg|me_message)\b/.test(cls)) return true;
            if(/\b(char|bot|ai-msg|assistant|left-msg|msg-left|char_mes|char-msg|bot-msg|ai_msg|message-left|left-message|bot_message|char_message)\b/.test(cls)) return false;
        }
        el=el.parentElement;
    }
    try{
        if(node.getBoundingClientRect){
            var r=node.getBoundingClientRect();
            var chatArea=document.querySelector('#chat,[class*="chat-container"],[id*="chat"]');
            if(chatArea){var cr=chatArea.getBoundingClientRect();if(r.left>cr.left+cr.width*0.4) return true;}
        }
    }catch(e){}
    return false;
}
function scanNodeForPhoneMsg2(node){
    if(!node||node.nodeType!==1) return;
    if(processedStoryNodes2.has(node)) return;
    var txt=node.textContent||node.innerText||'';
    if(!txt||txt.length<3) return;
    var hasMarker=/\[(微信|语音|红包|图片|转账|手机|电话|朋友圈|拍一拍|系统|拉黑|加好友|收款|退回|正在输入|角色|我|角色语音|角色红包|角色图片|角色转账|角色表情|我语音|我红包|我图片|我转账|我表情|我朋友圈|我拍一拍|我拉黑|我取消拉黑|我加好友|我电话|我通话|我视频|角色通话|角色视频|通话|视频)[：:]|\[(我拉黑|我取消拉黑)\]|!\[[^\]]*\]\(/.test(txt)||/<msg>/.test(txt)||/\[[^\[\]:]+(语音|表情|图片|红包|转账|通话|视频|电话|朋友圈|拍一拍)[：:]/.test(txt)||(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'&&new RegExp('\\['+finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(朋友圈|拍一拍|拉黑|取消拉黑|加好友|语音|表情|图片|红包|转账|通话|视频|电话)?[：:]?').test(txt));
    // 通用格式检测：[任意名字通话/视频/电话:内容]，不依赖角色名获取
    if(!hasMarker){if(/\[[^\[\]:]+(通话|视频|电话)[：:]/.test(txt))hasMarker=true;}
    if(!hasMarker) return;
    processedStoryNodes2.add(node);
    var isUser=ncGuessIsUser(node);
    // 我专用格式（优先匹配，强制右侧）
    var fm;
    if((fm=txt.match(/\[我语音[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'voice',true);}
    if((fm=txt.match(/\[我通话[：:]([^\]]*?)\]/))&&fm[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('voice','in');if(window.NcAddCallBubble)window.NcAddCallBubble('right',fm[1].trim(),false,'voice');}catch(e){}}
    if((fm=txt.match(/\[我视频[：:]([^\]]*?)\]/))&&fm[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('video','in');if(window.NcAddCallBubble)window.NcAddCallBubble('right',fm[1].trim(),false,'video');}catch(e){}}
    if((fm=txt.match(/\[我红包[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'redpacket',true);}
    if((fm=txt.match(/\[我图片[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'image',true);}
    if((fm=txt.match(/\[我转账[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'transfer',true);}
    if((fm=txt.match(/\[我收款[：:]([^\]]*?)\]/))&&fm[1].trim()){renderSysMsg('你已收款 ¥'+fm[1].trim());}
    if((fm=txt.match(/\[我退回[：:]([^\]]*?)\]/))&&fm[1].trim()){renderSysMsg('你已退回转账 ¥'+fm[1].trim());}
    if((fm=txt.match(/\[我文字图[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'txtimg',true);}
    if((fm=txt.match(/\[我文图[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'txtimg',true);}
    if((fm=txt.match(/\[我定位[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'location',true);}
    var meEmoRe=/\[我表情[：:](!\[[^\]]*\]\([^)]*\)|[^\]]*)\]/;if((fm=txt.match(meEmoRe))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'image',true);}
    if((fm=txt.match(/\[我[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'text',true);}
    // 动态角色名格式：[角色名:内容] - 遍历所有别名（备注名+原始角色卡名）
    var charNames=getCharNames();
    for(var cni=0;cni<charNames.length;cni++){
        try{
            var cnEsc=charNames[cni].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            var dmRe=new RegExp('\\['+cnEsc+'[：:]([\\s\\S]*?)\\]','g');
            var dm;while((dm=dmRe.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'text',false);}
            var dm2Re=new RegExp('\\['+cnEsc+'语音[：:]([^\\]]*?)\\]','g');
            while((dm=dm2Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'voice',false);}
            // 角色发起通话：[角色名电话:语音/视频]
            var dmPhoneRe=new RegExp('\\['+cnEsc+'电话[：:](语音|视频)\\]','g');
            while((dm=dmPhoneRe.exec(txt))!==null){try{if(typeof openCallUI==='function')openCallUI(dm[1],'in');if(typeof playRing==='function')playRing();}catch(e){}}
            // 角色通话中消息：[角色名电话:内容]（内容不是语音/视频时，显示在通话界面）
            var dmPhoneMsgRe=new RegExp('\\['+cnEsc+'电话[：:](?!语音|视频)([^\\]]+)\\]','g');
            while((dm=dmPhoneMsgRe.exec(txt))!==null){if(dm[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('voice','in');if(window.NcAddCallBubble)window.NcAddCallBubble('left',dm[1].trim(),false,'voice');}catch(e){}}}
            var dmCallRe=new RegExp('\\['+cnEsc+'通话[：:]([^\\]]*?)\\]','g');
            while((dm=dmCallRe.exec(txt))!==null){if(dm[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('voice','in');if(window.NcAddCallBubble)window.NcAddCallBubble('left',dm[1].trim(),false,'voice');}catch(e){}}}
            var dmVidRe=new RegExp('\\['+cnEsc+'视频[：:]([^\\]]*?)\\]','g');
            while((dm=dmVidRe.exec(txt))!==null){if(dm[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('video','in');if(window.NcAddCallBubble)window.NcAddCallBubble('left',dm[1].trim(),false,'video');}catch(e){}}}
            var dm3Re=new RegExp('\\['+cnEsc+'红包[：:]([^\\]]*?)\\]','g');
            while((dm=dm3Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'redpacket',false);}
            var dm4Re=new RegExp('\\['+cnEsc+'图片[：:]([^\\]]*?)\\]','g');
            while((dm=dm4Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'image',false);}
            var dm5Re=new RegExp('\\['+cnEsc+'转账[：:]([^\\]]*?)\\]','g');
            while((dm=dm5Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'transfer',false);}
            var dm5bRe=new RegExp('\\['+cnEsc+'收款[：:]([^\\]]*?)\\]','g');
            while((dm=dm5bRe.exec(txt))!==null){if(dm[1].trim())renderSysMsg(cnName+' 已收款 ¥'+dm[1].trim());}
            var dm5cRe=new RegExp('\\['+cnEsc+'退回[：:]([^\\]]*?)\\]','g');
            while((dm=dm5cRe.exec(txt))!==null){if(dm[1].trim())renderSysMsg(cnName+' 已退回转账 ¥'+dm[1].trim());}
            var dm7Re=new RegExp('\\['+cnEsc+'文字图[：:]([\\s\\S]*?)\\]','g');
            while((dm=dm7Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'txtimg',false);}
            var dm8Re=new RegExp('\\['+cnEsc+'文图[：:]([\\s\\S]*?)\\]','g');
            while((dm=dm8Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'txtimg',false);}
            var dm9Re=new RegExp('\\['+cnEsc+'定位[：:]([^\\]]*?)\\]','g');
            while((dm=dm9Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'location',false);}
            // 表情包
            var dm6Re=new RegExp('\\['+cnEsc+'表情[：:]([^\\]]*)\\]','g');
            while((dm=dm6Re.exec(txt))!==null){if(dm[1].trim())renderPhoneMessage(dm[1].trim(),'image',false);}
        }catch(e){}
    }
    // 角色专用格式（强制左侧）
    if((fm=txt.match(/\[角色语音[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'voice',false);}
    if((fm=txt.match(/\[角色电话[：:](语音|视频)\]/))&&fm[1]){try{if(typeof openCallUI==='function')openCallUI(fm[1],'in');if(typeof playRing==='function')playRing();}catch(e){}}
    if((fm=txt.match(/\[角色通话[：:]([^\]]*?)\]/))&&fm[1].trim()){try{if(window.NcAddCallBubble)window.NcAddCallBubble('left',fm[1].trim(),false,'voice');}catch(e){}}
    if((fm=txt.match(/\[角色视频[：:]([^\]]*?)\]/))&&fm[1].trim()){try{if(window.NcAddCallBubble)window.NcAddCallBubble('left',fm[1].trim(),false,'voice');}catch(e){}}
    if((fm=txt.match(/\[角色红包[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'redpacket',false);}
    if((fm=txt.match(/\[角色图片[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'image',false);}
    if((fm=txt.match(/\[角色转账[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'transfer',false);}
    if((fm=txt.match(/\[角色收款[：:]([^\]]*?)\]/))&&fm[1].trim()){renderSysMsg((finalLName||'对方')+' 已收款 ¥'+fm[1].trim());}
    if((fm=txt.match(/\[角色退回[：:]([^\]]*?)\]/))&&fm[1].trim()){renderSysMsg((finalLName||'对方')+' 已退回转账 ¥'+fm[1].trim());}
    if((fm=txt.match(/\[角色文字图[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'txtimg',false);}
    if((fm=txt.match(/\[角色文图[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'txtimg',false);}
    if((fm=txt.match(/\[角色定位[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'location',false);}
    if((fm=txt.match(/\[角色表情[：:]([^\]]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'image',false);}
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){try{var cnEmo=finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');var emRe=new RegExp('\\['+cnEmo+'表情[：:](!\\[[^\\]]*\\]\\([^)]*\\)|[^\\]]*)\\]');var em=txt.match(emRe);if(em&&em[1].trim()){renderPhoneMessage(em[1].trim(),'image',false);}}catch(e){}}
    if((fm=txt.match(/\[角色[：:]([\s\S]*?)\]/))&&fm[1].trim()){renderPhoneMessage(fm[1].trim(),'text',false);}
    // 角色一起听歌：[角色听歌:歌名|歌手名] / [角色名听歌:歌名|歌手名]
    var charMusicRe=/\[(?:角色|([^\[\]:]+))听歌[：:]([^\]|]+)(?:\|([^\]]+))?\]/;
    var cmMatch=txt.match(charMusicRe);
    if(cmMatch){
        var songName=(cmMatch[2]||'').trim();
        var songArtist=(cmMatch[3]||'未知歌手').trim();
        if(songName){
            try{
                var nameInp=Q('.Nicole-jmuname'),artistInp=Q('.Nicole-jmuartist');
                if(nameInp)nameInp.value=songName;
                if(artistInp)artistInp.value=songArtist;
                // 添加到歌曲列表并播放
                if(typeof muList!=='undefined'){
                    muList.push({name:songName,artist:songArtist,cover:'',url:''});
                    muIdx=muList.length-1;
                    if(typeof renderMuList==='function')renderMuList();
                    if(typeof playMu==='function')playMu();
                }
                // 渲染音乐分享卡片到左侧
                renderLeft('<div class="Nicole-music-share-card"><div class="Nicole-msc-top"><div class="Nicole-msc-cover" style="background-image:url(\'\')"><div class="Nicole-msc-playic"><svg viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4"/></svg></div></div><div class="Nicole-msc-info"><div class="Nicole-msc-name">'+songName+'</div><div class="Nicole-msc-artist">'+songArtist+'</div></div></div><div class="Nicole-msc-bot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>一起听歌</div></div>',true);
                playSwoosh();
            }catch(e){}
        }
    }

    // 功能触发 - 通话
    // 用户呼出：[我电话:语音] / [我电话:视频]
    if(/\[我电话[：:](语音|视频)/.test(txt)&&window.NcAPI){var cm2=txt.match(/\[我电话[：:](语音|视频)/);window.NcAPI.openCallUI(cm2[1]==='视频'?'video':'voice','out');}
    // 用户通话中消息：[我电话:内容]（内容不是语音/视频时，显示在通话界面）
    var mePhoneMsg=txt.match(/\[我电话[：:](?!语音|视频)([^\]]+)\]/);
    if(mePhoneMsg&&mePhoneMsg[1].trim()){try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('voice','in');if(window.NcAddCallBubble)window.NcAddCallBubble('right',mePhoneMsg[1].trim(),false,'voice');}catch(e){}}
    // 角色来电：[角色名电话:语音] / [角色名电话:视频]（遍历别名）
    var _callNames=getCharNames();
    for(var _cni=0;_cni<_callNames.length;_cni++){
        try{
            var _cne=_callNames[_cni].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            var _cm=txt.match(new RegExp('\\['+_cne+'电话[：:](语音|视频)'));
            if(_cm&&window.NcAPI){window.NcAPI.openCallUI(_cm[1]==='视频'?'video':'voice','in');break;}
        }catch(e){}
    }
    // 兼容旧格式：[电话:语音] / [电话:视频]（默认角色来电）
    if(/\[电话[：:](语音|视频)/.test(txt)&&window.NcAPI){var cm=txt.match(/\[电话[：:](语音|视频)/);window.NcAPI.openCallUI(cm[1]==='视频'?'video':'voice','in');}
    // ===== 通用通话匹配（不依赖角色名获取）=====
    // 通用角色来电：[任意名字电话:语音/视频]，名字不是"我"就当角色来电
    try{
        var _genPhoneRe=/\[([^\[\]:]+)电话[：:](语音|视频)\]/g;
        var _gpm;
        while((_gpm=_genPhoneRe.exec(txt))!==null){
            var _gpn=_gpm[1].trim();
            if(_gpn&&_gpn!=='我'&&_gpn!=='角色'&&window.NcAPI){
                window.NcAPI.openCallUI(_gpm[2]==='视频'?'video':'voice','in');
                break;
            }
        }
    }catch(e){}
    // 通用通话中消息：[任意名字通话:内容]
    try{
        var _genCallRe=/\[([^\[\]:]+)通话[：:]([^\]]*?)\]/g;
        var _gcm;
        while((_gcm=_genCallRe.exec(txt))!==null){
            var _gcn=_gcm[1].trim();
            var _gcc=_gcm[2].trim();
            if(_gcc){
                var _isMe=(_gcn==='我');
                try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('voice','in');if(window.NcAddCallBubble)window.NcAddCallBubble(_isMe?'right':'left',_gcc,false,'voice');}catch(e){}
            }
        }
    }catch(e){}
    // 通用视频通话中消息：[任意名字视频:内容]
    try{
        var _genVidRe=/\[([^\[\]:]+)视频[：:]([^\]]*?)\]/g;
        var _gvm;
        while((_gvm=_genVidRe.exec(txt))!==null){
            var _gvn=_gvm[1].trim();
            var _gvc=_gvm[2].trim();
            if(_gvc){
                var _isMe2=(_gvn==='我');
                try{if(window.NcAPI&&!document.querySelector('.Nicole-jcall.show'))window.NcAPI.openCallUI('video','in');if(window.NcAddCallBubble)window.NcAddCallBubble(_isMe2?'right':'left',_gvc,false,'video');}catch(e){}
            }
        }
    }catch(e){}
    if(/\[朋友圈[：:]/.test(txt)&&window.NcAPI){var pm=txt.match(/\[朋友圈[：:]([^\]|]+)(?:\|([^\]]+))?/);if(pm)window.NcAPI.addPyq(pm[1]||'',pm[2]||'');}
    // 区分角色/用户的朋友圈
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){
        try{
            var cnE=finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            var cPyq=txt.match(new RegExp('\\['+cnE+'朋友圈[：:]([^\\]|]+)(?:\\|([^\\]]+))?'));
            if(cPyq&&window.NcAPI){window.NcAPI.addPyq(cPyq[1]||'',cPyq[2]||'');renderSysMsg(finalLName+' 发了一条朋友圈');}
            var uPyq=txt.match(/\[我朋友圈[：:]([^\]|]+)(?:\|([^\]]+))?/);
            if(uPyq&&window.NcAPI){window.NcAPI.addPyq(uPyq[1]||'',uPyq[2]||'');renderSysMsg(finalRName+' 发了一条朋友圈');}
        }catch(e){}
    }
    // 区分角色/用户的拍一拍
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){
        try{
            var cnE2=finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            var cPoke=txt.match(new RegExp('\\['+cnE2+'拍一拍[：:]([^\\]]+)'));
            if(cPoke){renderSysMsg(finalLName+' 拍了拍 '+finalRName+' '+cPoke[1]);}
            var uPoke=txt.match(/\[我拍一拍[：:]([^\]]+)/);
            if(uPoke){renderSysMsg(finalRName+' 拍了拍 '+finalLName+' '+uPoke[1]);}
        }catch(e){}
    }
    // 区分角色/用户的拉黑
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){
        try{
            var cnE3=finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            if(new RegExp('\\['+cnE3+'拉黑\]').test(txt)){isBlkLeft=true;renderSysMsg(finalLName+' 将 '+finalRName+' 拉入黑名单');}
            if(new RegExp('\\['+cnE3+'取消拉黑\]').test(txt)){isBlkLeft=false;renderSysMsg(finalLName+' 将 '+finalRName+' 移出黑名单');}
            if(/\[我拉黑\]/.test(txt)){isBlkRight=true;renderSysMsg(finalRName+' 将 '+finalLName+' 拉入黑名单');}
            if(/\[我取消拉黑\]/.test(txt)){isBlkRight=false;renderSysMsg(finalRName+' 将 '+finalLName+' 移出黑名单');}
        }catch(e){}
    }
    // 区分角色/用户的加好友
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){
        try{
            var cnE4=finalLName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            var cAdd=txt.match(new RegExp('\\['+cnE4+'加好友[：:]([^\\]]+)'));
            if(cAdd){renderSysMsg(finalLName+' 发送了好友请求：'+cAdd[1]);}
            var uAdd=txt.match(/\[我加好友[：:]([^\]]+)/);
            if(uAdd){renderSysMsg(finalRName+' 发送了好友请求：'+uAdd[1]);Q('.Nicole-jaddfriendmodal').classList.add('show');}
        }catch(e){}
    }
    // 通用格式
    var patterns=[
        {re:/\[微信语音[：:]([^\]]*?)\]/g,type:'voice'},
        {re:/\[语音[：:]([^\]]*?)\]/g,type:'voice'},
        {re:/\[微信红包[：:]([^\]]*?)\]/g,type:'redpacket'},
        {re:/\[红包[：:]([^\]]*?)\]/g,type:'redpacket'},
        {re:/\[微信图片[：:]([^\]]*?)\]/g,type:'image'},
        {re:/\[图片[：:]([^\]]*?)\]/g,type:'image'},
        {re:/\[微信转账[：:]([^\]]*?)\]/g,type:'transfer'},
        {re:/\[转账[：:]([^\]]*?)\]/g,type:'transfer'},
        {re:/\[微信文字[：:]([\s\S]*?)\]/g,type:'text'},
        {re:/\[微信消息[：:]([\s\S]*?)\]/g,type:'text'},
        {re:/\[微信[：:]([\s\S]*?)\]/g,type:'text'},
        {re:/\[手机消息[：:]([\s\S]*?)\]/g,type:'text'},
        {re:/\[手机[：:]([\s\S]*?)\]/g,type:'text'}
    ];
    for(var pi=0;pi<patterns.length;pi++){
        var match;
        while((match=patterns[pi].re.exec(txt))!==null){
            var mc=match[1].trim();
            if(mc){renderPhoneMessage(mc,patterns[pi].type,isUser);}
        }
    }
    // 正文气泡渲染
    ncRenderInlineBubbles(node);
}
// 聊天列表渲染
function renderChatListScreen(){
    try{
        var panel=document.getElementById(PANEL_ID);
        if(!panel) return;
        var body=panel.querySelector('.Nicole-jchatlist-body');
        if(!body) return;
        var list=JSON.parse(localStorage.getItem('Nc-chat-list')||'[]');
        var groups=JSON.parse(localStorage.getItem('Nc-group-list')||'[]');
        var html='';
        // 群聊列表
        groups.forEach(function(g){
            var memberCount=g.members?g.members.length:0;
            var lastMsg=g.lastMsg||'暂无消息';
            var avStyle='';
            html+='<div class="Nicole-chatlist-item group-item" data-gid="'+g.id+'"><div class="Nicole-chatlist-inner"><div class="Nicole-chatlist-av group-av"'+avStyle+'><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><div class="Nicole-chatlist-info"><div class="Nicole-chatlist-name">'+g.name+' <span style="font-size:11px;color:#999;font-weight:300;">('+memberCount+'人)</span></div><div class="Nicole-chatlist-msg">'+lastMsg+'</div></div></div><div class="Nicole-chatlist-del" data-gid="'+g.id+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg><span>删除</span></div></div>';
        });
        // 单聊列表
        list.forEach(function(name){
            var key='Nc-chat-'+name;
            var saved=localStorage.getItem(key)||'';
            var lastMsg='暂无消息';
            try{var tmp=document.createElement('div');tmp.innerHTML=saved;var msgs=tmp.querySelectorAll('.Nicole-bub');if(msgs.length>0)lastMsg=msgs[msgs.length-1].textContent.substring(0,25);}catch(e){}
            var av=localStorage.getItem('Nc-av-'+name)||'';
            var avStyle=av?'style="background-image:url('+av.replace(/'/g,'%27')+')"':'';
            html+='<div class="Nicole-chatlist-item" data-name="'+name+'"><div class="Nicole-chatlist-inner"><div class="Nicole-chatlist-av"'+avStyle+'>'+(av?'':name.charAt(0))+'</div><div class="Nicole-chatlist-info"><div class="Nicole-chatlist-name">'+name+'</div><div class="Nicole-chatlist-msg">'+lastMsg+'</div></div></div><div class="Nicole-chatlist-del" data-name="'+name+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg><span>删除</span></div></div>';
        });
        if(!html) html='<div class="Nicole-chatlist-add" style="text-align:center;color:#999;padding:40px 0;font-size:13px;">点击右上角 + 添加聊天人物</div>';
        body.innerHTML=html;
        var homeEl=panel.querySelector('.Nicole-jhome');
        var chatlistEl=panel.querySelector('.Nicole-jchatlist-screen');
        body.querySelectorAll('.Nicole-chatlist-item').forEach(function(item){
            var inner=item.querySelector('.Nicole-chatlist-inner');
            var delBtn=item.querySelector('.Nicole-chatlist-del');
            if(!inner||!delBtn)return;
            var startX=0,startY=0,curX=0,isDragging=false,isOpen=false;
            var delWidth=70;
            // 触摸左滑
            inner.addEventListener('touchstart',function(e){
                e.stopPropagation();
                startX=e.touches[0].clientX;startY=e.touches[0].clientY;curX=isOpen?-delWidth:0;isDragging=true;
                inner.style.transition='none';
            },{passive:true});
            inner.addEventListener('touchmove',function(e){
                if(!isDragging)return;
                var dx=e.touches[0].clientX-startX;
                var dy=e.touches[0].clientY-startY;
                if(Math.abs(dy)>Math.abs(dx))return;
                var nx=curX+dx;
                if(nx>0)nx=0;
                if(nx<-delWidth-20)nx=-delWidth-20;
                inner.style.transform='translateX('+nx+'px)';
                delBtn.style.opacity=Math.min(1,Math.abs(nx)/delWidth);
            },{passive:true});
            inner.addEventListener('touchend',function(e){
                if(!isDragging)return;
                isDragging=false;
                inner.style.transition='transform .3s cubic-bezier(.2,.8,.2,1)';
                var dx=e.changedTouches[0].clientX-startX;
                if(curX+dx<-delWidth/2){
                    inner.style.transform='translateX(-'+delWidth+'px)';isOpen=true;
                }else{
                    inner.style.transform='translateX(0)';isOpen=false;
                }
            });
            // 鼠标左滑（电脑端）
            var mouseDown=false;
            inner.addEventListener('mousedown',function(e){
                if(e.button!==0)return;
                e.stopPropagation();
                startX=e.clientX;startY=e.clientY;curX=isOpen?-delWidth:0;isDragging=true;mouseDown=true;
                inner.style.transition='none';
                e.preventDefault();
            });
            document.addEventListener('mousemove',function(e){
                if(!isDragging||!mouseDown)return;
                var dx=e.clientX-startX;
                var dy=e.clientY-startY;
                if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dx)<5)return;
                var nx=curX+dx;
                if(nx>0)nx=0;
                if(nx<-delWidth-20)nx=-delWidth-20;
                inner.style.transform='translateX('+nx+'px)';
                delBtn.style.opacity=Math.min(1,Math.abs(nx)/delWidth);
            });
            document.addEventListener('mouseup',function(e){
                if(!isDragging||!mouseDown)return;
                isDragging=false;mouseDown=false;
                inner.style.transition='transform .3s cubic-bezier(.2,.8,.2,1)';
                var dx=e.clientX-startX;
                if(curX+dx<-delWidth/2){
                    inner.style.transform='translateX(-'+delWidth+'px)';isOpen=true;
                }else{
                    inner.style.transform='translateX(0)';isOpen=false;
                }
            });
            // 删除按钮点击
            delBtn.addEventListener('click',function(e){
                e.stopPropagation();
                var name=this.getAttribute('data-name');
                var gid=this.getAttribute('data-gid');
                if(gid){
                    if(confirm('删除群聊「'+gid+'」？')){
                        var groups=JSON.parse(localStorage.getItem('Nc-group-list')||'[]');
                        groups=groups.filter(function(g){return g.id!==gid;});
                        localStorage.setItem('Nc-group-list',JSON.stringify(groups));
                        localStorage.removeItem('Nc-chat-'+gid);
                        renderChatListScreen();
                    }
                    return;
                }
                if(name&&confirm('删除与「'+name+'」的聊天记录？')){
                    var list=JSON.parse(localStorage.getItem('Nc-chat-list')||'[]');
                    list=list.filter(function(n){return n!==name;});
                    localStorage.setItem('Nc-chat-list',JSON.stringify(list));
                    localStorage.removeItem('Nc-chat-'+name);
                    if(finalLName===name){finalLName='';currentCharName='';}
                    renderChatListScreen();
                }
            });
            item.addEventListener('click',function(e){
                if(isOpen){
                    inner.style.transform='translateX(0)';isOpen=false;
                    e.stopPropagation();
                    return;
                }
                var name=this.getAttribute('data-name');
                var gid=this.getAttribute('data-gid');
                if(gid){
                    // 进入群聊
                    var groups=JSON.parse(localStorage.getItem('Nc-group-list')||'[]');
                    var group=groups.find(function(g){return g.id===gid;});
                    if(group){
                        if(finalLName) saveChatForChar(finalLName);
                        finalLName=group.id;currentCharName=group.name;ncManualChar=true;
                        loadChatForChar(group.id);
                        // 设置群聊模式：隐藏头像，只显示群名
                        var hd=document.querySelector('.Nicole-hd');
                        if(hd)hd.classList.add('group-mode');
                        document.querySelectorAll('.Nicole-bind-gname').forEach(function(el){el.textContent=group.name;});
                        if(chatlistEl)chatlistEl.classList.remove('show');
                        if(homeEl)homeEl.classList.remove('active');
                    }
                    return;
                }
                if(name){
                    if(finalLName) saveChatForChar(finalLName);
                    finalLName=name;currentCharName=name;ncManualChar=true;
                    loadChatForChar(name);
                    // 私聊模式：移除group-mode类
                    var hd=document.querySelector('.Nicole-hd');
                    if(hd)hd.classList.remove('group-mode');
                    panel.querySelectorAll('.Nicole-bind-lnm').forEach(function(el){el.textContent=name;});
                    if(chatlistEl)chatlistEl.classList.remove('show');
                    if(homeEl)homeEl.classList.remove('active');
                }
            });
        });
    }catch(e){console.log('[Nicole] renderChatListScreen error:',e);}
}
// ===== 聊天内容删除（电脑端悬停显示删除按钮，手机端长按）=====


function saveChatForChar(charName){
    try{if(!charName)return;var panel=document.getElementById(PANEL_ID);if(!panel)return;var chatBox=panel.querySelector('.Nicole-jchat');if(!chatBox)return;localStorage.setItem('Nc-chat-'+charName,chatBox.innerHTML);var list=JSON.parse(localStorage.getItem('Nc-chat-list')||'[]');if(list.indexOf(charName)===-1){list.unshift(charName);localStorage.setItem('Nc-chat-list',JSON.stringify(list));}}catch(e){}
}
function loadChatForChar(charName){
    try{if(!charName)return false;var panel=document.getElementById(PANEL_ID);if(!panel)return false;var chatBox=panel.querySelector('.Nicole-jchat');if(!chatBox)return false;var saved=localStorage.getItem('Nc-chat-'+charName);if(saved&&saved.length>10){chatBox.innerHTML=saved;chatBox.scrollTop=chatBox.scrollHeight;return true;}chatBox.innerHTML='';return false;}catch(e){return false;}
}
function renderPhoneMessage(text,type,isUser){
    try{
        var panel=document.getElementById(PANEL_ID);
        if(!panel) return;
        var chatBox=panel.querySelector('.Nicole-jchat');
        if(!chatBox) return;
        var dir=isUser?'right':'left';
        var avClass=isUser?'Nicole-bind-rav user-avatar':'Nicole-bind-lav char-avatar';
        var avUrl=isUser?safeRAv:safeLAv;
        var avStyle=avUrl?' style="background-image:url(\''+avUrl+'\')"':'';
        var now=new Date();
        var time=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
        var body='';
        if(type==='voice'){
            // 格式：时长"|内容 或 时长"
            var parts=text.split('|');
            var dur=parts[0].trim()||(Math.max(1,Math.round(text.length/4))+'"');
            var vtxt=parts[1]?parts[1].trim():'';
            body='<div class="Nicole-au" data-txt="'+vtxt.replace(/"/g,'&quot;')+'"><div class="Nicole-au-main"><div class="Nicole-au-play"></div><div class="Nicole-au-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="Nicole-au-dur">'+dur+'</div></div><div class="Nicole-au-wrap"><div class="Nicole-au-txt">'+vtxt+'</div></div></div>';
        }else if(type==='redpacket'){
            // 格式：金额|备注
            var rp=text.split('|');
            var amt=rp[0].trim()||'0.00';
            var note=rp[1]?rp[1].trim():'恭喜发财';
            body='<div class="Nicole-link-card Nicole-gift-card"><div class="Nicole-link-ic" style="background:linear-gradient(135deg,#ff6b6b,#ee5a5a);border-radius:10px;"><svg viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M12 4v16M3 12h18"/></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">微信红包</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">¥'+amt+' - '+note+'</div></div></div>';
        }else if(type==='image'){
            // 支持：纯URL、说明|URL、完整<img>标签
            var imgUrl=text, imgAlt='';
            // 如果是完整的img标签，直接提取src
            var imgTagMatch=text.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
            if(imgTagMatch){
                imgUrl=imgTagMatch[1];
                var altMatch=text.match(/alt=["']([^"']*)["']/i);
                if(altMatch) imgAlt=altMatch[1];
            }else{
                // 去掉首尾多余的[]
                var cleanText=text.replace(/^\[+/,'').replace(/\]+$/,'').trim();
                var mdMatch=cleanText.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                if(mdMatch){imgAlt=mdMatch[1];imgUrl=mdMatch[2];}
                else if(cleanText.indexOf('|')>-1){var pp=cleanText.split('|');imgAlt=pp[0].trim();imgUrl=pp.slice(1).join('|').trim();}
                else{imgUrl=cleanText;}
            }
            body='<img src="'+imgUrl+'" class="Nicole-img" alt="'+imgAlt.replace(/"/g,'&quot;')+'" style="max-width:160px;border-radius:10px;display:block;">';
        }else if(type==='transfer'){
            // 格式：金额|说明
            var tf=text.split('|');
            var tamt=tf[0].trim()||'0.00';
            var ttitle=tf[1]?tf[1].trim():'转账';
            body='<div class="Nicole-tf Nicole-j-pure-tf" data-amt="'+tamt+'"><div class="Nicole-tf-ic">¥</div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+ttitle+'</div><div class="Nicole-tf-a">¥ '+tamt+'</div><div class="Nicole-tf-f">微信转账</div></div></div>';
        }else if(type==='txtimg'){
            // 文字图：格式 内容
            body='<div class="Nicole-txt-img">'+text.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div>';
        }else if(type==='location'){
            // 定位：格式 名称|距离
            var locParts=text.split('|');
            var locName=locParts[0].trim()||'我的位置';
            var locDist=locParts[1]?locParts[1].trim():'未知距离';
            body='<div class="Nicole-tf Nicole-loc-card"><div class="Nicole-link-ic" style="border-radius:50%;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="Nicole-tf-info"><div class="Nicole-tf-t">'+locName+'</div><div class="Nicole-tf-a" style="color:var(--sys-txt);">'+(locDist.indexOf('距离')>=0?locDist:'距离 '+locDist)+'</div></div></div>';
        }else{
            body='<div class="Nicole-bub">'+text.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div>';
        }
        var row=document.createElement('div');
        var isBlocked=(isUser&&window.NcIsBlkLeft&&window.NcIsBlkLeft())||(!isUser&&window.NcIsBlkRight&&window.NcIsBlkRight());
        row.className='Nicole-row '+dir+(isBlocked?' has-err':'');
        row.style.opacity='0';
        row.style.animation='Nicole-pop .4s forwards cubic-bezier(.2,.8,.2,1)';
        row.innerHTML='<div class="Nicole-'+(isUser?'rav':'lav')+' '+avClass+'"'+avStyle+'></div><div class="Nicole-ct">'+body+'<div class="Nicole-meta">'+time+(isUser?' <span class="Nicole-tick">✓✓</span>':'')+'</div></div>'+(isBlocked?'<div class="Nicole-err-icon" title="消息被拒收">!</div>':'');
        chatBox.appendChild(row);
        chatBox.scrollTop=chatBox.scrollHeight;
        // 未读提示
        if(!isUser){
            var floatEl=document.getElementById(FLOAT_ID);
            if(floatEl){
                var btn=floatEl.querySelector('#'+TOGGLE_ID);
                if(btn){btn.style.boxShadow='0 0 0 3px rgba(255,59,48,.6),0 4px 16px rgba(0,0,0,.15)';setTimeout(function(){btn.style.boxShadow='';},2500);}
            }
        }
    }catch(e){console.log('[Nicole] renderPhoneMessage error:',e);}
}


// ===== 正文内嵌气泡渲染 =====
function ncInlineBubbleHTML(type,content,isUser){
    var dir=isUser?'nc-right':'nc-left';
    // 正文头像：黑白灰首字母样式，不自动获取（避免获取失败显示蓝色默认）
    var av='';
    // 名字：用户固定"我"，角色用全局变量+页面兜底
    var name='';
    if(isUser){name='我';}
    else{
        name=finalLName||'';
        if(!name||name==='Unknown'||name==='角色'){
            try{
                var sels=['.char-name','#ch_name','.character-name','#character_name','[class*="char-name"]','[class*="charName"]','.chat-header-name','.character_card_name'];
                for(var ni=0;ni<sels.length;ni++){var nel=document.querySelector(sels[ni]);if(nel&&nel.textContent&&nel.textContent.trim()&&nel.textContent.trim().length<30&&nel.textContent.trim()!=='SillyTavern'&&nel.textContent.trim()!=='Mufy'){name=nel.textContent.trim();break;}}
            }catch(e){}
        }
        if(!name) name='角色';
    }
    // 气泡颜色同步手机设置（优先localStorage，和手机一致）
    var bubColor=isUser?'#95ec69':'#ffffff';
    try{
        var lsBub=isUser?localStorage.getItem('Nc-bub'):localStorage.getItem('Nc-bubl');
        if(lsBub&&lsBub.trim()) bubColor=lsBub.trim();
    }catch(e){}
    try{
        var phonePanel=document.getElementById(PANEL_ID);
        if(phonePanel){
            var stageEl=phonePanel.querySelector('.Nicole-stage')||phonePanel;
            var cs=window.getComputedStyle(stageEl);
            var cssColor=isUser?cs.getPropertyValue('--bub-r'):cs.getPropertyValue('--bub-l');
            if(cssColor&&cssColor.trim()&&cssColor.trim()!=='none') bubColor=cssColor.trim();
        }
    }catch(e){}
    var avHtml='';
    var avChar=name?name.charAt(0).toUpperCase():'?';
    var avClass=isUser?'nc-inline-av nc-av-user':'nc-inline-av nc-av-char';
    avHtml='<div class="nc-inline-av-wrap"><div class="'+avClass+'">'+avChar+'</div></div>';
    var bub='';
    if(type==='call-voice'||type==='call-video'){
        var callIcon=type==='call-video'?'📹':'📞';
        var callText=type==='call-video'?'视频通话':'语音通话';
        bub='<div class="nc-inline-bub nc-inline-call" style="background:'+bubColor+';color:#222;display:flex;align-items:center;gap:8px;padding:10px 16px;"><span style="font-size:16px;">'+callIcon+'</span><span style="font-size:13px;">'+callText+'</span></div>';
    }else if(type==='voice'){
        var parts=content.split('|');var dur=parts[0].trim()||'3"';var vtxt=parts[1]?parts[1].trim():'';
        bub='<div class="nc-inline-bub" style="background:'+bubColor+';"><div class="nc-inline-voice"><div class="nc-inline-voice-bars"><span style="height:6px"></span><span style="height:10px"></span><span style="height:14px"></span><span style="height:8px"></span><span style="height:12px"></span></div><span class="nc-inline-voice-dur">'+dur+'</span></div>'+(vtxt?'<div style="font-size:11px;color:#222;margin-top:4px;">'+vtxt+'</div>':'')+'</div>';
    }else if(type==='image'){
        var iUrl=content,iAlt='';
        var iImgTag=content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
        if(iImgTag){iUrl=iImgTag[1];var iAltM=content.match(/alt=["']([^"']*)["']/i);if(iAltM)iAlt=iAltM[1];}
        else{var cleanContent=content.replace(/^\[+/,'').replace(/\]+$/,'').trim();var iMd=cleanContent.match(/!\[([^\]]*)\]\(([^)]+)\)/);if(iMd){iAlt=iMd[1];iUrl=iMd[2];}else if(cleanContent.indexOf('|')>-1){var ip=cleanContent.split('|');iAlt=ip[0].trim();iUrl=ip.slice(1).join('|').trim();}else{iUrl=cleanContent;}}
        bub='<div class="nc-inline-bub" style="padding:4px;background:transparent!important;box-shadow:none;"><img src="'+iUrl+'" class="nc-inline-img" alt="'+iAlt.replace(/"/g,'&quot;')+'" style="max-width:160px;display:block;border-radius:10px;"></div>';
    }else if(type==='redpacket'){
        var rp=content.split('|');var amt=rp[0].trim()||'0.00';var note=rp[1]?rp[1].trim():'恭喜发财';
        bub='<div class="nc-inline-bub" style="background:'+bubColor+';"><div class="nc-inline-card"><div class="nc-inline-card-ic" style="background:linear-gradient(135deg,#ff6b6b,#ee5a5a);color:#fff;">¥</div><div><div class="nc-inline-card-tx">微信红包</div><div class="nc-inline-card-sub">¥'+amt+' · '+note+'</div></div></div></div>';
    }else if(type==='transfer'){
        var tf=content.split('|');var tamt=tf[0].trim()||'0.00';var ttitle=tf[1]?tf[1].trim():'转账';
        bub='<div class="nc-inline-bub" style="background:'+bubColor+';"><div class="nc-inline-card"><div class="nc-inline-card-ic" style="background:#1aad19;color:#fff;">¥</div><div><div class="nc-inline-card-tx">'+ttitle+'</div><div class="nc-inline-card-sub">¥ '+tamt+'</div></div></div></div>';
    }else{
        var safeTxt=content.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
        bub='<div class="nc-inline-bub" style="background:'+bubColor+';color:#222;">'+safeTxt+'</div>';
    }
    var nameHtml='<div class="nc-inline-name">'+name+'</div>';
    var contentHtml='<div class="nc-inline-content">'+nameHtml+bub+'</div>';
    if(dir==='nc-right'){
        return '<div class="nc-inline-row '+dir+'">'+contentHtml+avHtml+'</div>';
    }else{
        return '<div class="nc-inline-row '+dir+'">'+avHtml+contentHtml+'</div>';
    }
}
function ncRenderInlineBubbles(node){
    if(!node||node.nodeType!==1) return;
    if(node.getAttribute('data-nc-inline-done')) return;
    // 直接处理node的innerHTML，不查找子元素
    var textEl=node;
    if(!textEl||!textEl.innerHTML) return;
    var html=textEl.innerHTML;
    // 调试日志
    try{console.log('[Nicole] ncRenderInlineBubbles called, node:',node.tagName,'class:',node.className,'html前50:',html.substring(0,50));}catch(e){}
    // 支持{{char}}占位符，替换为当前角色名
    if(finalLName&&finalLName!=='角色'&&finalLName!=='Unknown'){html=html.replace(/\{\{char\}\}/g,finalLName);}
    var hasInlineM=/\[(微信|语音|红包|图片|转账|手机|微信文字|微信消息|手机消息|角色|我|角色语音|角色红包|角色图片|角色转账|角色表情|我语音|我红包|我图片|我转账|我表情|我电话|电话)[：:]/.test(html);if(!hasInlineM){var _cn=getCharNames();for(var _hi=0;_hi<_cn.length;_hi++){try{var _cne=_cn[_hi].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');if(new RegExp('\\['+_cne+'(语音|表情|图片|红包|转账|电话)?[：:]').test(html)){hasInlineM=true;break;}}catch(e){}}}if(!hasInlineM) return;
    var isUser=ncGuessIsUser(node);
    // ===== 我专用（优先匹配，强制右侧）=====
    try{console.log('[Nicole] 开始匹配我格式, html包含[我::',html.indexOf('[我:')>-1);}catch(e){}
    html=html.replace(/\[我语音[：:]([^\]]*?)\]/g,function(m,t){return ncInlineBubbleHTML('voice',t.trim(),true);});
    html=html.replace(/\[我电话[：:](语音|视频)\]/g,function(m,t){return ncInlineBubbleHTML(t==='视频'?'call-video':'call-voice',t,true);});
    html=html.replace(/\[我电话[：:](?!语音|视频)([^\]]+)\]/g,function(m,t){return ncInlineBubbleHTML('text',t.trim(),true);});
    html=html.replace(/\[我红包[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[我图片[：:]([^\]]*?)\]/g,function(m,t){return ncInlineBubbleHTML('image',t.trim(),true);});
    html=html.replace(/\[我转账[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[我表情[：:]([^\]]*)\]/g,function(m,t){return ncInlineBubbleHTML('image',t.trim(),true);});
    html=html.replace(/\[我[：:]([\s\S]*?)\]/g,function(m,t){return ncInlineBubbleHTML('text',t.trim(),true);});
    // ===== 动态角色名格式（强制左侧）- 遍历所有别名 =====
    var charNames2=getCharNames();
    for(var cni2=0;cni2<charNames2.length;cni2++){
        try{
            var cnEsc2=charNames2[cni2].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            // 表情包格式：[角色名表情:URL] 或 [角色名表情:说明|URL]
            html=html.replace(new RegExp('\\['+cnEsc2+'表情[：:]([^\\]]*)\\]','g'),function(m,t){return ncInlineBubbleHTML('image',t.trim(),false);});
            html=html.replace(new RegExp('\\['+cnEsc2+'语音[：:]([^\\]]*?)\\]','g'),function(m,t){return ncInlineBubbleHTML('voice',t.trim(),false);});
            html=html.replace(new RegExp('\\['+cnEsc2+'电话[：:](语音|视频)\\]','g'),function(m,t){return ncInlineBubbleHTML(t==='视频'?'call-video':'call-voice',t,false);});
            html=html.replace(new RegExp('\\['+cnEsc2+'电话[：:](?!语音|视频)([^\\]]+)\\]','g'),function(m,t){return ncInlineBubbleHTML('text',t.trim(),false);});
            html=html.replace(new RegExp('\\['+cnEsc2+'红包[：:]([^\\]]*?)\\]','g'),'');
            html=html.replace(new RegExp('\\['+cnEsc2+'图片[：:]([^\\]]*?)\\]','g'),function(m,t){return ncInlineBubbleHTML('image',t.trim(),false);});
            html=html.replace(new RegExp('\\['+cnEsc2+'转账[：:]([^\\]]*?)\\]','g'),'');
            html=html.replace(new RegExp('\\['+cnEsc2+'[：:]([\\s\\S]*?)\\]','g'),function(m,t){return ncInlineBubbleHTML('text',t.trim(),false);});
        }catch(e){}
    }
    // ===== 角色专用（强制左侧）=====
    html=html.replace(/\[角色语音[：:]([^\]]*?)\]/g,function(m,t){return ncInlineBubbleHTML('voice',t.trim(),false);});
    html=html.replace(/\[角色电话[：:](语音|视频)\]/g,function(m,t){return ncInlineBubbleHTML(t==='视频'?'call-video':'call-voice',t,false);});
    html=html.replace(/\[角色红包[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[角色图片[：:]([^\]]*?)\]/g,function(m,t){return ncInlineBubbleHTML('image',t.trim(),false);});
    html=html.replace(/\[角色转账[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[角色表情[：:]([^\]]*)\]/g,function(m,t){return ncInlineBubbleHTML('image',t.trim(),false);});
    html=html.replace(/\[角色[：:]([\s\S]*?)\]/g,function(m,t){return ncInlineBubbleHTML('text',t.trim(),false);});
    // ===== 通用格式（按位置判断）=====
    html=html.replace(/\[(微信语音|语音)[：:]([^\]]*?)\]/g,function(m,k,t){return ncInlineBubbleHTML('voice',t.trim(),isUser);});
    html=html.replace(/\[电话[：:](语音|视频)\]/g,function(m,t){return ncInlineBubbleHTML(t==='视频'?'call-video':'call-voice',t,isUser);});
    html=html.replace(/\[电话[：:](?!语音|视频)([^\]]+)\]/g,function(m,t){return ncInlineBubbleHTML('text',t.trim(),isUser);});
    html=html.replace(/\[(微信红包|红包)[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[(微信图片|图片)[：:]([^\]]*?)\]/g,function(m,k,t){return ncInlineBubbleHTML('image',t.trim(),isUser);});
    html=html.replace(/\[(微信转账|转账)[：:]([^\]]*?)\]/g,'');
    html=html.replace(/\[(微信文字|微信消息|微信|手机消息|手机)[：:]([\s\S]*?)\]/g,function(m,k,t){return ncInlineBubbleHTML('text',t.trim(),isUser);});
    // 用户纯文本消息自动渲染成右侧气泡（没有标记格式的用户消息）
    if(isUser&&!html.includes('[我:')&&!html.includes('[我语音:')&&!html.includes('[我表情:')&&!html.includes('[我图片:')){
        var pureText=textEl.textContent||textEl.innerText||'';
        if(pureText&&pureText.trim().length>0&&pureText.trim().length<500&&!pureText.includes('[')&&!pureText.includes('{')&&!pureText.includes('#')&&!pureText.includes('```')){
            try{
                var safePure=pureText.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
                html=ncInlineBubbleHTML('text',safePure,true);
                console.log('[Nicole] 用户纯文本消息自动渲染气泡');
            }catch(e){}
        }
    }
    textEl.innerHTML=html;
    node.setAttribute('data-nc-inline-done','1');
}

})();


/* ================================================================
 *  nicoPhone.js - Qixian 手机组件单文件版
 *  仓库: miaccj9-maker / 适配酒馆 & GitHub CDN
 *  加载自动渲染，暴露 window.QixianPhone 全局API
 * ================================================================ */
(function () {
  // ===================== 1. 注入全部 CSS 样式 =====================
  const phoneCSS = `
.Qixian-mu-inp-wrap,.Qixian-mu-ctrl,.Qixian-mu-time-disp,.Qixian-mu-now,.Qixian-mu-stage,.Qixian-mu-invbtn{flex-shrink:0!important;}
.Qixian-mu-list{display:flex;flex-direction:column;gap:6px;flex:1 1 auto;min-height:120px;max-height:240px!important;overflow-y:auto!important;padding-bottom:10px;scrollbar-width:none;-webkit-overflow-scrolling:touch;}
.Qixian-mu-list::-webkit-scrollbar{display:none;}
.Qixian-mu-item{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:rgba(250,250,250,.85);border-radius:12px;font-size:12px;color:#444;cursor:pointer;transition:background .2s,transform .1s;border:1px solid rgba(0,0,0,.02);flex-shrink:0;}
.Qixian-mu-item:active{transform:scale(.98);background:rgba(240,240,240,.9);}
.Qixian-mu-item.active{background:#333!important;color:#fff!important;font-weight:600;}
.Qixian-mu-item.active .jmudel{color:rgba(255,255,255,.6)!important;}
.Qixian-home-screen{position:absolute;inset:0;background-color:#f2f2f7;background-image:url('https://tuchuang.org.cn/imgs/2026/07/10/cdf179abe6c5f102.png');background-size:cover;background-position:center;background-repeat:no-repeat;z-index:200;display:flex;flex-direction:column;transition:transform .35s cubic-bezier(.2,.8,.2,1);transform:translateX(-100%);border-radius:inherit;overflow:hidden;}
.Qixian-home-screen.active{transform:translateX(0);}
.Qixian-ios-statusbar{position:absolute;top:0;left:0;right:0;height:44px;display:flex;justify-content:space-between;align-items:center;padding:0 24px;font-size:14px;font-weight:600;color:var(--hdr-txt,#222);z-index:210;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif;letter-spacing:.5px;text-shadow:0 1px 4px rgba(255,255,255,.6);}
.Qixian-ios-statusbar-right{display:flex;align-items:center;gap:6px;}
.Qixian-ios-statusbar-right svg{height:12px;fill:var(--hdr-txt,#222);filter:drop-shadow(0 1px 2px rgba(255,255,255,.5));}
.Qixian-ios-battery{width:22px;height:11px;border:1px solid var(--hdr-txt,rgba(0,0,0,.6));border-radius:4px;position:relative;padding:1px;display:flex;box-shadow:0 1px 2px rgba(255,255,255,.5);}
.Qixian-ios-battery::after{content:'';position:absolute;right:-4px;top:3px;width:2px;height:3px;background:var(--hdr-txt,rgba(0,0,0,.6));border-radius:0 2px 2px 0;}
.Qixian-ios-battery-level{background:var(--hdr-txt,#222);height:100%;width:85%;border-radius:1px;}
.Qixian-sticky-note{position:absolute;top:80px;left:50%;transform:translateX(-50%);width:80%;max-width:280px;background:rgba(255,255,255,.95);border-radius:4px;box-shadow:2px 6px 16px rgba(0,0,0,.06);padding:24px 16px 16px;display:flex;flex-direction:column;z-index:50;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
.Qixian-sticky-tape{position:absolute;top:-14px;left:50%;transform:translateX(-50%) rotate(-3deg);width:110px;height:32px;background:rgba(255,255,255,.35);box-shadow:0 1px 3px rgba(0,0,0,.05);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);border:1px solid rgba(255,255,255,.4);border-radius:2px;pointer-events:none;z-index:51;}
.Qixian-sticky-textarea{width:100%;min-height:140px;border:none;background:transparent;resize:none;outline:none;font-size:15px;color:#333;line-height:1.6;font-family:'Kaiti','Comic Sans MS',-apple-system,sans-serif;overflow-y:auto;scrollbar-width:none;font-weight:500;}
.Qixian-sticky-textarea::-webkit-scrollbar{display:none;}
.Qixian-sticky-btn{align-self:flex-end;margin-top:8px;background:#222;color:#fff;border:none;border-radius:14px;padding:6px 16px;font-size:12px;cursor:pointer;opacity:0;transition:opacity .3s,transform .1s;font-weight:500;}
.Qixian-sticky-note:focus-within .Qixian-sticky-btn{opacity:1;}
.Qixian-sticky-btn:active{transform:scale(.95);}
.Qixian-dock{position:absolute;bottom:24px;left:20px;right:20px;height:68px;background:rgba(255,255,255,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;display:flex;justify-content:space-evenly;align-items:center;padding:0 10px;box-shadow:0 4px 20px rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.02);}
.Qixian-dock-icon{width:48px;height:48px;border-radius:14px;background:transparent;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .2s,background .2s;}
.Qixian-dock-icon:active{transform:scale(.9);background:rgba(0,0,0,.05);}
.Qixian-dock-icon svg{width:28px;height:28px;stroke:#222;stroke-width:1.5;fill:none;}
#app-wechat svg{width:25px;height:25px;}
.Qixian-hd-back{cursor:pointer;padding:4px;display:flex;align-items:center;color:var(--hdr-ic,#333);margin-right:4px;transition:opacity .2s;flex-shrink:0;}
.Qixian-hd-back:active{opacity:.6;}
.Qixian-hd-back svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.5;}
.Qixian-sys-app{position:absolute;inset:0;background:#fff;z-index:250;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s;border-radius:inherit;}
.Qixian-sys-app.show{transform:translateX(0);}
.Qixian-sys-app-hd{padding:40px 16px 16px;background:rgba(255,255,255,.9);backdrop-filter:blur(10px);font-size:16px;font-weight:500;display:flex;align-items:center;gap:12px;border-bottom:.5px solid rgba(0,0,0,.05);z-index:10;}
.Qixian-sys-app-body{flex:1;overflow-y:auto;padding:0;scrollbar-width:none;display:flex;flex-direction:column;background:#fff;}
.Qixian-sys-app-body::-webkit-scrollbar{display:none;}
.Qixian-phone-app-container{display:flex;flex-direction:column;height:100%;width:100%;}
.Qixian-phone-content{flex:1;overflow-y:auto;scrollbar-width:none;background:#fff;padding-bottom:20px;}
.Qixian-phone-tabbar{display:flex;justify-content:space-around;padding:10px 0 20px;border-top:.5px solid rgba(0,0,0,.05);background:rgba(250,250,250,.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}
.Qixian-ptab{font-size:10px;color:#888;cursor:pointer;transition:color .2s;display:flex;flex-direction:column;align-items:center;gap:4px;font-weight:500;}
.Qixian-ptab svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.5;}
.Qixian-ptab.active{color:#222;}
.Qixian-list-item{padding:14px 20px;border-bottom:.5px solid rgba(0,0,0,.03);display:flex;justify-content:space-between;align-items:center;cursor:pointer;background:#fff;transition:background .2s;}
.Qixian-list-item:active{background:#f9f9f9;}
.Qixian-item-title{font-size:15px;font-weight:500;color:#222;}
.Qixian-item-sub{font-size:12px;color:#888;margin-top:4px;}
.Qixian-item-arrow svg{width:16px;height:16px;stroke:#ccc;fill:none;stroke-width:1.5;}
.Qixian-contact-detail{padding:20px;display:flex;flex-direction:column;gap:20px;animation:Qixian-pop .3s forwards;}
.Qixian-c-av-wrap{display:flex;justify-content:center;margin-bottom:10px;}
.Qixian-c-av{width:80px;height:80px;border-radius:50%;background:#f0f0f0;display:flex;justify-content:center;align-items:center;font-size:32px;color:#888;font-weight:300;}
.Qixian-c-input-grp{display:flex;flex-direction:column;gap:6px;}
.Qixian-c-input-grp label{font-size:12px;color:#888;margin-left:4px;}
.Qixian-c-input{width:100%;border:none;border-bottom:1px solid rgba(0,0,0,.1);padding:12px 4px;font-size:16px;color:#222;outline:none;background:transparent;transition:border-color .3s;}
.Qixian-c-input:focus{border-bottom-color:#222;}
.Qixian-c-btns{display:flex;gap:12px;margin-top:10px;}
.Qixian-c-btn{flex:1;padding:14px;border-radius:12px;border:none;font-size:14px;font-weight:500;cursor:pointer;text-align:center;transition:transform .1s,opacity .2s;}
.Qixian-c-btn:active{transform:scale(.98);opacity:.8;}
.Qixian-c-btn.call{background:#333;color:#fff;}
.Qixian-c-btn.save{background:#f2f2f7;color:#222;}
.Qixian-dial-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px 24px;max-width:260px;margin:0 auto;padding-top:20px;}
.Qixian-dial-key{width:68px;height:68px;border-radius:50%;background:#f2f2f7;display:flex;flex-direction:column;justify-content:center;align-items:center;font-size:28px;font-weight:300;color:#222;cursor:pointer;transition:transform .1s,background .1s;border:1px solid rgba(0,0,0,.02);}
.Qixian-dial-key:active{transform:scale(.9);background:#e5e5ea;}
.Qixian-dial-callbtn{width:68px;height:68px;border-radius:50%;background:#34c759;display:flex;justify-content:center;align-items:center;cursor:pointer;margin:30px auto 0;transition:transform .1s;box-shadow:0 4px 12px rgba(52,199,89,.3);}
.Qixian-dial-callbtn:active{transform:scale(.9);}
.Qixian-dial-callbtn svg{width:30px;height:30px;stroke:#fff;stroke-width:1.5;fill:none;}
.Qixian-stage{width:90%;display:flex;justify-content:center;padding:10px 0;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;touch-action:pan-y;--wrap-bg:#e0e0e0;--hdr-bg:rgba(255,255,255,.85);--ftr-bg:rgba(255,255,255,.9);--bub-r:rgba(245,245,245,.9);--bub-l:rgba(255,255,255,.9);--txt-main:#222;--wv-bg:#aaa;--sys-txt:#888;--card-txt:#222;--hdr-txt:#333;--hdr-ic:#333;--card-ic:#333;--pull-bg:rgba(200,200,200,.3);--card-bg:rgba(255,255,255,.7);--call-bub-l:rgba(250,250,250,.9);--call-bub-r:rgba(240,240,240,.9);--call-bub-txt:#222;--blur-val:16px;}
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
input[type=number]{-moz-appearance:textfield;}
#Qixian-Phone-Root ::-webkit-scrollbar{display:none;width:0;height:0;}
.Qixian-root.solid-mode{--blur-val:0px!important;}
.Qixian-root.solid-mode .Qixian-hd,.Qixian-root.solid-mode .Qixian-ft,.Qixian-root.solid-mode .Qixian-hd-pull{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}
.Qixian-root.av-sq .Qixian-uav,.Qixian-root.av-sq .Qixian-rav,.Qixian-root.av-sq .Qixian-lav,.Qixian-root.av-sq .Qixian-call-av,.Qixian-root.av-sq .Qixian-cp-face,.Qixian-root.av-sq .Qixian-pyq-iav,.Qixian-root.av-sq .Qixian-pyq-uav,.Qixian-root.av-sq .Qixian-mu-face,.Qixian-root.av-sq .Qixian-anchor-av{border-radius:10px!important;}
.Qixian-root.av-sq .Qixian-call.minimized:not(.video) .Qixian-call-av{border-radius:6px!important;}
.Qixian-phone-wrap{padding:6px;background:var(--wrap-bg);border-radius:42px;display:flex;justify-content:center;align-items:center;width:100%;max-width:360px;transition:background .3s;}
.Qixian-phone{width:100%;height:510px;background:#fdfdfd;border-radius:36px;position:relative;overflow:hidden;-webkit-mask-image:-webkit-radial-gradient(white,black);transform:translateZ(0);display:flex;flex-direction:column;box-sizing:border-box;}
.Qixian-bg{position:absolute;inset:-2px;z-index:0;background-size:cover;background-position:center;background-repeat:no-repeat;background-color:#f7f7f7;transition:background-image .3s;border-radius:inherit;}
.Qixian-content-layer{position:relative;z-index:1;display:flex;flex-direction:column;width:100%;height:100%;}
.Qixian-hd{position:absolute;top:0;left:0;right:0;padding:20px 14px 8px;display:flex;align-items:center;justify-content:space-between;background:var(--hdr-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));z-index:50;transition:transform .35s cubic-bezier(.2,.8,.2,1),background .3s;border-bottom:.5px solid rgba(0,0,0,.03);}
.Qixian-hd.collapsed{transform:translateY(-100%);}
.Qixian-notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:70px;height:16px;background:#222;border-radius:0 0 10px 10px;z-index:30;}
.Qixian-hd-pull{position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);width:44px;height:16px;background:var(--pull-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:0 0 14px 14px;display:flex;justify-content:center;align-items:center;cursor:pointer;z-index:100;color:var(--sys-txt);transition:all .3s;pointer-events:auto;}
.Qixian-hd.collapsed .Qixian-hd-pull svg{transform:rotate(180deg);}
.Qixian-hd-ph{width:4px;}
.Qixian-hd-mid{display:flex;align-items:center;gap:12px;flex:1;justify-content:flex-start;margin-left:2px;}
.Qixian-ubox{display:flex;flex-direction:column;align-items:center;gap:4px;width:56px;}
.Qixian-uav{width:32px;height:32px;aspect-ratio:1;border-radius:50%;background-size:cover;background-position:center;cursor:pointer;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}
.Qixian-uname{font-size:11px;font-weight:500;color:var(--hdr-txt,#222);width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;outline:none;cursor:text;padding:2px;border-radius:4px;transition:background .2s,color .3s;}
.Qixian-uname:focus{background:rgba(0,0,0,.05);}
.Qixian-waves{display:flex;align-items:center;gap:3px;height:20px;}
.Qixian-wave{width:2px;background:var(--wv-bg);border-radius:10px;opacity:.85;animation:Qixian-jp 1s ease-in-out infinite alternate;transition:background .3s;}
.Qixian-wave:nth-child(2){animation-delay:.3s} .Qixian-wave:nth-child(3){animation-delay:.15s} .Qixian-wave:nth-child(4){animation-delay:.5s} .Qixian-wave:nth-child(5){animation-delay:.25s} .Qixian-wave:nth-child(6){animation-delay:.4s}
@keyframes Qixian-jp{0%{height:4px}100%{height:16px}}
.Qixian-icons-rt{display:flex;gap:6px;align-items:center;}
.Qixian-icbtn{padding:4px;cursor:pointer;color:var(--hdr-ic,#333)!important;transition:opacity .2s;}
.Qixian-icbtn:active{opacity:.6;}
.Qixian-icbtn svg{width:20px;height:20px;fill:none!important;stroke:var(--hdr-ic,#333)!important;stroke-width:1.5;}
.Qixian-chat{flex:1;padding:14px;padding-top:76px;display:flex;flex-direction:column;gap:14px;overflow-y:auto;touch-action:pan-y;z-index:5;scrollbar-width:none;overscroll-behavior:contain;position:relative;transition:padding-top .35s cubic-bezier(.2,.8,.2,1);}
.Qixian-chat.collapsed{padding-top:26px;}
.Qixian-row{display:flex;gap:8px;max-width:95%;opacity:0;animation:Qixian-pop .4s forwards cubic-bezier(.2,.8,.2,1);position:relative;transition:transform .2s,filter .2s;}
@keyframes Qixian-pop{from{transform:translateY(6px);opacity:0;}to{transform:translateY(0);opacity:1;}}
.Qixian-row.left{align-self:flex-start;}
.Qixian-row.right{align-self:flex-end;flex-direction:row-reverse;}
.Qixian-rav,.Qixian-lav{width:32px;height:32px;border-radius:50%;background-size:cover;background-position:center;flex-shrink:0;user-select:none;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}
.Qixian-ct{display:flex;flex-direction:column;gap:4px;max-width:calc(100% - 40px);position:relative;}
.Qixian-row.right .Qixian-ct{align-items:flex-end;}
.Qixian-err-icon{display:none;width:18px;height:18px;border-radius:50%;border:1.5px solid #444;color:#444;background:rgba(255,255,255,.9);align-items:center;justify-content:center;font-size:13px;font-weight:bold;cursor:pointer;flex-shrink:0;align-self:center;}
.Qixian-row.has-err .Qixian-err-icon{display:flex;animation:Qixian-pop .3s forwards;}
.Qixian-sys-msg{width:100%;text-align:center;font-size:11px;color:var(--sys-txt);font-weight:400;opacity:0;animation:Qixian-pop .4s forwards;padding:4px 0;transition:color .3s;}
.Qixian-view-rev{color:#444;font-weight:500;cursor:pointer;margin-left:4px;border-bottom:.5px solid #444;}
.Qixian-sys-rej{color:var(--sys-txt);filter:brightness(.85);transition:color .3s;}
.Qixian-bub{padding:10px 14px;font-size:13px;line-height:1.5;color:var(--txt-main);word-wrap:break-word;word-break:break-all;white-space:pre-wrap;cursor:pointer;position:relative;backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));transition:background .3s,backdrop-filter .3s;font-weight:400;border:.5px solid rgba(0,0,0,.03);}
.Qixian-row.left .Qixian-bub{background:var(--bub-l);border-radius:4px 18px 18px 18px;}
.Qixian-row.right .Qixian-bub{background:var(--bub-r);border-radius:18px 4px 18px 18px;}
@keyframes Qx-poke{0%{transform:scale(1) rotate(0);}20%{transform:scale(1.1) rotate(-15deg) translateX(-4px);}40%{transform:scale(1.1) rotate(15deg) translateX(4px);}60%{transform:scale(1.1) rotate(-15deg) translateX(-4px);}80%{transform:scale(1.1) rotate(15deg) translateX(4px);}100%{transform:scale(1) rotate(0);}}
@keyframes Qx-dice{0%{transform:translateY(0) rotate(0);}25%{transform:translateY(-12px) rotate(90deg);}50%{transform:translateY(0) rotate(180deg);}75%{transform:translateY(-6px) rotate(270deg);}100%{transform:translateY(0) rotate(360deg);}}
@keyframes Qx-rps{0%{transform:scale(.3);opacity:0;}50%{transform:scale(1.2);opacity:1;}100%{transform:scale(1);opacity:1;}}
.Qixian-interact-item{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;background:transparent;border:none;box-shadow:none;color:#444;margin:4px 0;}
.Qixian-interact-item svg{width:44px;height:44px;stroke:currentColor;fill:none;stroke-width:1.5;}
.Qixian-anim-poke svg{animation:Qx-poke .6s ease-in-out;}
.Qixian-anim-dice svg{animation:Qx-dice .7s ease-in-out;}
.Qixian-anim-rps svg{animation:Qx-rps .5s cubic-bezier(.175,.885,.32,1.275);}
.Qixian-row.right .Qixian-interact-item{align-items:flex-end;}
.Qixian-row.left .Qixian-interact-item{align-items:flex-start;}
.Qixian-img{width:140px;max-width:100%;border-radius:14px;display:block;background:transparent;object-fit:cover;cursor:pointer;border:.5px solid rgba(0,0,0,.03);}
.Qixian-txt-img{display:flex!important;justify-content:center!important;align-items:center!important;width:150px!important;max-width:100%!important;aspect-ratio:1!important;background:linear-gradient(135deg,var(--bub-l),var(--bub-r))!important;backdrop-filter:blur(var(--blur-val))!important;-webkit-backdrop-filter:blur(var(--blur-val))!important;border-radius:18px!important;padding:14px!important;font-size:13px!important;font-weight:400!important;color:var(--txt-main)!important;text-align:center!important;word-wrap:break-word!important;white-space:pre-wrap!important;line-height:1.5!important;cursor:pointer!important;overflow:hidden!important;border:.5px solid rgba(0,0,0,.03)!important;box-shadow:none!important;transition:all .3s;}
.Qixian-txt-img:active{filter:brightness(.95);}
.Qixian-quote-box{position:relative;font-size:11px;color:inherit;opacity:.75;background:rgba(0,0,0,.02);padding:8px 12px;border-radius:10px;margin-bottom:8px;word-wrap:break-word;white-space:pre-wrap;display:block;width:100%;max-width:220px;box-sizing:border-box;overflow:hidden;}
.Qixian-row.right .Qixian-quote-box{background:rgba(0,0,0,.02);}
.Qixian-reply-bar{display:none;background:rgba(255,255,255,.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:14px;padding:8px 14px;font-size:12px;color:#666;margin:10px 0 8px;justify-content:space-between;align-items:center;border:.5px solid rgba(0,0,0,.03);}
.Qixian-reply-bar.show{display:flex;}
.Qixian-reply-txt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85%;font-weight:400;}
.Qixian-reply-txt::before{content:'💬 引用：';color:#444;font-size:11px;margin-right:4px;font-weight:500;}
.Qixian-reply-close{cursor:pointer;font-weight:300;color:#888;padding:0 4px;font-size:18px;}
.Qixian-au{padding:10px 14px;cursor:pointer;overflow:hidden;transition:all .3s;backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));user-select:none;border:.5px solid rgba(0,0,0,.03);}
.Qixian-row.left .Qixian-au{background:var(--bub-l);border-radius:4px 18px 18px 18px;}
.Qixian-row.right .Qixian-au{background:var(--bub-r);border-radius:18px 4px 18px 18px;}
.Qixian-au-main{display:flex;align-items:center;gap:8px;width:130px;pointer-events:none;}
.Qixian-au-play{width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:7px solid #888;transition:border-left-color .2s;}
.Qixian-au.playing .Qixian-au-play{border-left-color:#222;}
.Qixian-au-bars{flex:1;display:flex;align-items:center;gap:2px;height:10px;}
.Qixian-au-bars span{width:2px;height:100%;background:rgba(0,0,0,.1);border-radius:1px;transition:height .2s,background .2s;}
.Qixian-au-bars span:nth-child(even){height:60%} .Qixian-au-bars span:nth-child(3n){height:85%}
.Qixian-au.playing .Qixian-au-bars span{background:#222;animation:Qixian-bar-jump .4s infinite alternate;}
.Qixian-au.playing .Qixian-au-bars span:nth-child(2){animation-delay:.1s} .Qixian-au.playing .Qixian-au-bars span:nth-child(3){animation-delay:.2s} .Qixian-au.playing .Qixian-au-bars span:nth-child(4){animation-delay:.3s}
@keyframes Qixian-bar-jump{0%{transform:scaleY(.4);}100%{transform:scaleY(1.3);}}
.Qixian-au-dur{font-size:11px;font-weight:400;color:#666;pointer-events:none;}
.Qixian-au-wrap{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s;}
.Qixian-au.open .Qixian-au-wrap{grid-template-rows:1fr;}
.Qixian-au-txt{overflow:hidden;font-size:12px;color:var(--txt-main);word-wrap:break-word;white-space:pre-wrap;border-top:.5px solid transparent;transition:all .3s;opacity:.8;font-weight:300;}
.Qixian-au.open .Qixian-au-txt{border-top-color:rgba(0,0,0,.05);margin-top:8px;padding-top:8px;}
.Qixian-meta{display:flex;align-items:center;gap:4px;font-size:10px;color:#aaa;margin-top:2px;font-weight:300;}
.Qixian-tick{color:#aaa;font-size:11px;letter-spacing:-1.5px;font-weight:400;}
.Qixian-tf,.Qixian-link-card,.Qixian-gift-card,.Qixian-mu-invite-card,.Qixian-loc-card,.Qixian-food-card{background:var(--card-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:16px;padding:14px;display:flex;align-items:center;gap:12px;width:210px;cursor:pointer;text-decoration:none;transition:filter .2s,opacity .2s,background .3s;border:.5px solid rgba(0,0,0,.03);}
.Qixian-tf-ic{width:34px;height:34px;background:rgba(0,0,0,.03);border-radius:50%;display:flex;justify-content:center;align-items:center;font-weight:400;font-size:15px;color:var(--card-ic,#222);flex-shrink:0;transition:all .3s;}
.Qixian-tf.got,.Qixian-tf.returned{opacity:.75;}
.Qixian-tf.got .Qixian-tf-ic,.Qixian-tf.returned .Qixian-tf-ic{background:rgba(0,0,0,.02);color:#888;}
.Qixian-link-ic,.Qixian-food-ic{width:36px;height:36px;background:transparent;border-radius:10px;display:flex;justify-content:center;align-items:center;flex-shrink:0;}
.Qixian-link-ic svg,.Qixian-food-ic svg{width:18px;height:18px;fill:none;stroke:var(--card-ic,#222);stroke-width:1.5px;transition:stroke .3s;}
.Qixian-tf-info{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;pointer-events:none;}
.Qixian-tf-t{font-size:13px;font-weight:500;color:var(--card-txt,var(--txt-main));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .3s;letter-spacing:.2px;}
.Qixian-tf-a{font-size:11px;color:var(--sys-txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:300;}
.Qixian-tf-f{font-size:10px;color:var(--txt-main);opacity:.4;margin-top:4px;padding-top:4px;font-weight:300;}
.Qixian-cp-qacard{width:auto;max-width:240px;align-items:flex-start;flex-direction:column;gap:6px;background:var(--card-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));border-radius:18px;padding:16px;cursor:pointer;transition:filter .2s,background .3s;border:.5px solid rgba(0,0,0,.03);}
.Qixian-cp-qacard .Qixian-tf-t{font-size:11px;font-weight:500;color:var(--sys-txt);letter-spacing:.5px;width:100%;display:flex;align-items:center;gap:6px;text-transform:uppercase;}
.Qixian-cp-qatxt{font-size:13px;color:var(--txt-main);line-height:1.5;font-weight:400;width:100%;word-break:break-word;padding-top:4px;pointer-events:none;}
.Qixian-music-share-card{flex-direction:column;align-items:stretch;width:230px;padding:14px;gap:12px;border-radius:18px;}
.Qixian-msc-top{display:flex;align-items:center;gap:12px;}
.Qixian-msc-cover{width:46px;height:46px;border-radius:10px;background-size:cover;background-position:center;position:relative;flex-shrink:0;}
.Qixian-msc-playic{position:absolute;inset:0;background:rgba(0,0,0,.2);border-radius:10px;display:flex;justify-content:center;align-items:center;}
.Qixian-msc-playic svg{width:18px;height:18px;fill:rgba(255,255,255,.9);}
.Qixian-msc-info{display:flex;flex-direction:column;min-width:0;flex:1;}
.Qixian-msc-name{font-size:13px;font-weight:500;color:var(--txt-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;}
.Qixian-msc-artist{font-size:11px;color:var(--sys-txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;font-weight:300;}
.Qixian-msc-bot{padding-top:8px;display:flex;align-items:center;gap:6px;font-size:10px;color:#888;font-weight:400;}
.Qixian-msc-bot svg{width:14px;height:14px;stroke:#888;}
.Qixian-ft{background:var(--ftr-bg);backdrop-filter:blur(var(--blur-val));-webkit-backdrop-filter:blur(var(--blur-val));padding:0 14px 14px;display:flex;flex-direction:column;flex-shrink:0;z-index:10;transition:background .3s;border-top:.5px solid rgba(0,0,0,.03);}
.Qixian-in-area{display:flex;gap:8px;align-items:center;padding-top:10px;}
.Qixian-lang{width:34px;height:28px;font-size:11px;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.03);border-radius:10px;cursor:pointer;color:#555;font-weight:500;flex-shrink:0;}
.Qixian-plus{width:28px;height:28px;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .3s;flex-shrink:0;}
.Qixian-plus svg{width:22px;height:22px;stroke:#444;stroke-width:1.5px;fill:none;}
.Qixian-plus.on{transform:rotate(45deg);}
.Qixian-input{flex:1;min-width:0;height:36px;border-radius:18px;background:rgba(240,240,240,.8)!important;padding:0 16px;font-size:13px;outline:none;border:none;color:#222;font-weight:400;}
.Qixian-mic,.Qixian-send{width:28px;height:28px;display:flex;justify-content:center;align-items:center;cursor:pointer;color:#444;flex-shrink:0;}
.Qixian-mic svg,.Qixian-send svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.5px;}
.Qixian-mic.rec{color:#222;animation:Qixian-pl 1s infinite alternate;}
.Qixian-panel{max-height:0;overflow:hidden;transition:max-height .3s ease;display:grid;grid-template-columns:repeat(4,1fr);gap:16px 6px;}
.Qixian-panel.show{max-height:280px;padding-top:16px;overflow-y:auto;scrollbar-width:none;}
.Qixian-pi{display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;position:relative;}
.Qixian-pic{width:46px;height:46px;background:rgba(0,0,0,.02);border-radius:14px;display:flex;justify-content:center;align-items:center;border:.5px solid rgba(0,0,0,.03);}
.Qixian-pic svg{width:22px;height:22px;fill:none;stroke:#333;stroke-width:1.2px;}
.Qixian-ptx{font-size:10px;color:#777;font-weight:400;text-align:center;white-space:nowrap;}
.Qixian-call{position:absolute;inset:0;background:#fdfdfd;z-index:9999;display:flex;flex-direction:column;opacity:0;pointer-events:none;transition:all .35s cubic-bezier(.2,.8,.2,1);border-radius:inherit;overflow:hidden;}
.Qixian-call.show{opacity:1;pointer-events:auto;}
.Qixian-call-vbg{position:absolute;inset:0;background-size:cover;background-position:center;background-image:url('');filter:blur(20px) brightness(.9) grayscale(.2);opacity:0;transition:all .3s;z-index:1;}
.Qixian-call:not(.video) .Qixian-call-vbg{opacity:1;}
.Qixian-call.video .Qixian-call-vbg{opacity:1;filter:blur(10px) brightness(.9) grayscale(.2);}
.Qixian-call-pip{position:absolute;top:30px;right:16px;width:70px;height:100px;background-size:cover;border-radius:12px;z-index:20;opacity:0;transition:opacity .3s;border:.5px solid rgba(255,255,255,.2);}
.Qixian-call.video .Qixian-call-pip{opacity:1;}
.Qixian-call-mini-top{position:absolute;top:20px;left:16px;z-index:60;cursor:pointer;color:#333;padding:4px;display:flex;align-items:center;justify-content:center;transition:color .2s,transform .2s;}
.Qixian-call.video .Qixian-call-mini-top{color:rgba(255,255,255,.9);}
.Qixian-call-mini-top:active{transform:scale(.85);}
.Qixian-call-mini-top svg{width:24px;height:24px;stroke:currentColor;stroke-width:1.5;fill:none;}
.Qixian-call.minimized .Qixian-call-mini-top{display:none;}
.Qixian-call-ct{position:relative;z-index:10;display:flex;flex-direction:column;height:100%;padding:10px 16px 16px;transition:padding .3s;}
.Qixian-call-avs{display:flex;justify-content:center;align-items:center;margin-bottom:12px;transition:transform .4s cubic-bezier(.2,.8,.2,1);}
.Qixian-call.active .Qixian-call-avs{transform:scale(.85) translateY(-10px);}
.Qixian-call-av{width:84px;height:84px;border-radius:50%;background-size:cover;position:relative;transition:border-radius .3s,width .4s,height .4s;border:.5px solid rgba(0,0,0,.05);}
.Qixian-jcall-lav{z-index:1;}
.Qixian-jcall-rav{margin-left:-20px;z-index:2;}
.Qixian-call.active .Qixian-call-av{width:64px;height:64px;}
.Qixian-call.video .Qixian-call-avs{transform:scale(0);height:0;margin:0;opacity:0;display:none;}
.Qixian-call-nm{text-align:center;font-size:20px;font-weight:500;color:#222;z-index:10;letter-spacing:.5px;transition:font-size .4s;margin-bottom:6px;}
.Qixian-call.active .Qixian-call-nm{font-size:16px;margin-bottom:0px;}
.Qixian-call.video .Qixian-call-nm{color:#fff!important;font-weight:500;text-shadow:0 1px 4px rgba(0,0,0,.3);}
.Qixian-call-st{text-align:center;font-size:12px;color:#888;margin-bottom:8px;z-index:10;font-weight:300;transition:all .3s;}
.Qixian-call.active .Qixian-call-st{display:none;}
.Qixian-call.video .Qixian-call-st{color:rgba(255,255,255,.8)!important;font-weight:400;text-shadow:0 1px 3px rgba(0,0,0,.3);}
.Qixian-call-timer{text-align:center;font-size:10px;color:#555;font-family:-apple-system,sans-serif;font-weight:400;margin-bottom:8px;z-index:10;display:none;transition:opacity .3s;}
.Qixian-call.active .Qixian-call-timer{display:block;opacity:1;}
.Qixian-call.video .Qixian-call-timer{color:#fff!important;text-shadow:0 1px 3px rgba(0,0,0,.3);}
.Qixian-call-bubs{flex:1;display:flex;flex-direction:column;justify-content:flex-start;gap:8px;margin-bottom:16px;overflow-y:auto;z-index:10;padding:0 4px;scrollbar-width:none;opacity:0;transition:opacity .3s;touch-action:pan-y;-webkit-overflow-scrolling:touch;}
.Qixian-call-bubs::before{content:"";flex:1 1 auto;min-height:0;}
.Qixian-call.active .Qixian-call-bubs{opacity:1;}
.Qixian-cb-wrap{display:flex;flex-direction:column;}
.Qixian-cb-wrap.left{align-items:flex-start;} .Qixian-cb-wrap.right{align-items:flex-end;}
.Qixian-cb{background:var(--call-bub-l,rgba(250,250,250,.9));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:var(--call-bub-txt,#222);padding:10px 14px;border-radius:16px;font-size:13px;max-width:85%;animation:Qixian-pop .3s forwards cubic-bezier(.2,.8,.2,1);font-weight:400;border:.5px solid rgba(0,0,0,.03);}
.Qixian-cb-wrap.right .Qixian-cb{background:var(--call-bub-r,rgba(240,240,240,.9));}
.Qixian-call.video .Qixian-cb{color:var(--call-bub-txt,#222)!important;text-shadow:none;}
.Qixian-call .Qixian-call-ft {
    display: flex !important;
    flex-direction: column;
    gap: 20px;
    z-index: 99999 !important;
    padding-bottom: 10px;
}
.Qixian-call-btns {
    display: none !important;
    justify-content: space-evenly !important;
    padding: 0 30px !important;
    animation: Qixian-pop .3s !important;
}
.Qixian-call.state-out .btns-out {
    display: flex !important;
}
.Qixian-call.state-in .btns-in {
    display: flex !important;
}
.Qixian-call-btn {
    width: 64px !important;
    height: 64px !important;
    border-radius: 50% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    cursor: pointer !important;
    transition: transform .1s, background .2s !important;
}
.Qixian-call-btn:active {
    transform: scale(.92) !important;
}
.Qixian-call-btn.hangup {
    background: #ffffff !important;
    color: #222222 !important;
    box-shadow: 0 2px 8px rgba(0,0,0,.15) !important;
    border: 1px solid rgba(0,0,0,.1) !important;
}
.Qixian-call-btn.answer {
    background: #ffffff !important;
    color: #222222 !important;
    box-shadow: 0 2px 8px rgba(0,0,0,.15) !important;
    border: 1px solid rgba(0,0,0,.1) !important;
}
.Qixian-call-btn.cancel {
    background: #f5f5f5 !important;
    color: #666666 !important;
    box-shadow: 0 2px 8px rgba(0,0,0,.1) !important;
    border: 1px solid rgba(0,0,0,.08) !important;
}
.Qixian-call-btn svg {
    width: 28px !important;
    height: 28px !important;
    stroke: currentColor !important;
    stroke-width: 1.8 !important;
    fill: none !important;
}
.Qixian-call-inrow {
    display: none !important;
    gap: 10px;
    align-items: center;
    background: rgba(250, 250, 250, 0.9) !important;
    backdrop-filter: blur(10px);
    padding: 6px 8px !important;
    height: 36px !important;
    border-radius: 22px;
    animation: Qixian-pop .3s;
    border: .5px solid rgba(0, 0, 0, .03);
    z-index: 99999 !important;
}
.Qixian-call.active .Qixian-call-inrow {
    display: flex !important;
}
.Qixian-call-in {
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
.Qixian-call.active .Qixian-call-btn.mini {
    width: 28px !important;
    height: 28px !important;
    flex-shrink: 0;
    box-shadow: none !important;
}
.Qixian-call.active .Qixian-call-btn.mini svg {
    width: 16px !important;
    height: 16px !important;
}
.Qixian-call.active .Qixian-call-send {
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
.Qixian-call.minimized{cursor:grab;}
.Qixian-call.minimized:active{cursor:grabbing;}
.Qixian-call.minimized.video{top:16px;right:16px;bottom:auto;left:auto;width:84px;height:134px;border-radius:14px;padding:0;background:#000;overflow:hidden;}
.Qixian-call.minimized.video .Qixian-call-vbg{display:block!important;opacity:1!important;filter:none!important;z-index:1;}
.Qixian-call.minimized.video .Qixian-call-pip{display:block!important;opacity:1!important;width:26px;height:38px;top:6px;right:6px;border-radius:6px;z-index:25;border:none;}
.Qixian-call.minimized.video .Qixian-call-ct{display:flex!important;flex-direction:column;justify-content:flex-end;align-items:center;padding:8px!important;z-index:10;background:linear-gradient(to top,rgba(0,0,0,.5),transparent 60%);height:100%;}
.Qixian-call.minimized.video .Qixian-call-avs,.Qixian-call.minimized.video .Qixian-call-nm,.Qixian-call.minimized.video .Qixian-call-st,.Qixian-call.minimized.video .Qixian-call-bubs,.Qixian-call.minimized.video .Qixian-call-ft{display:none!important;}
.Qixian-call.minimized.video .Qixian-call-timer{display:block!important;margin:0;padding:0;font-size:11px;color:#fff!important;font-weight:400;text-shadow:0 1px 4px rgba(0,0,0,.5);letter-spacing:.5px;opacity:1;}
.Qixian-call.minimized:not(.video){top:60px;right:16px;bottom:auto;left:auto;width:auto;min-width:104px;height:42px;border-radius:21px;background:rgba(250,250,250,.95);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:0 16px;display:flex;flex-direction:row;justify-content:center;align-items:center;overflow:visible;border:.5px solid rgba(0,0,0,.05);}
.Qixian-call.minimized:not(.video) .Qixian-call-vbg{display:none;}
.Qixian-call.minimized:not(.video) .Qixian-call-ct{padding:0;flex-direction:row;justify-content:space-between;align-items:center;width:100%;gap:10px;}
.Qixian-call.minimized:not(.video) .Qixian-call-avs{margin:0;transform:none;display:flex!important;opacity:1!important;height:auto;pointer-events:none;}
.Qixian-call.minimized:not(.video) .Qixian-call-av{width:24px;height:24px;}
.Qixian-call.minimized:not(.video) .Qixian-jcall-rav{margin-left:-10px;z-index:2;}
.Qixian-call.minimized:not(.video) .Qixian-call-nm,.Qixian-call.minimized:not(.video) .Qixian-call-st{display:none;}
.Qixian-call.minimized:not(.video) .Qixian-call-timer{display:block!important;font-size:13px;font-weight:500;color:#222!important;margin:0;text-shadow:none;pointer-events:none;letter-spacing:.5px;opacity:1;}
.Qixian-call.minimized .Qixian-call-bubs,.Qixian-call.minimized .Qixian-call-ft,.Qixian-call.minimized:not(.video) .Qixian-call-pip{display:none!important;}
.Qixian-call-mini-hint{display:none;position:absolute;inset:0;z-index:50;}
.Qixian-call.minimized .Qixian-call-mini-hint{display:block;}
.Qixian-set{position:absolute;inset:0;background:rgba(255,255,255,.95);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);z-index:100;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s;padding:24px;overflow-y:auto;scrollbar-width:none;}
.Qixian-set.show{transform:translateX(0);}
.Qixian-set-h{font-size:18px;font-weight:500;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;color:#222;}
.Qixian-set-x{font-size:24px;cursor:pointer;color:#888;width:32px;height:32px;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.03);border-radius:50%;font-weight:300;}
.Qixian-set-r{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:.5px solid rgba(0,0,0,.03);font-size:13px;color:#555;font-weight:400;}
.Qixian-color-wrap{display:flex;align-items:center;gap:8px;}
.Qixian-hex-in{width:70px;height:30px;border:none;border-radius:8px;padding:0 6px;font-size:11px;font-family:monospace;outline:none;background:rgba(0,0,0,.03);color:#222;text-align:center;}
.Qixian-color-wrap input[type=color]{border:none;width:30px;height:30px;border-radius:8px;cursor:pointer;background:none;padding:0;}
.Qixian-bg-btn{padding:6px 12px;height:30px;border-radius:8px;border:none;background:#f2f2f7;cursor:pointer;font-size:12px;color:#333;outline:none;font-weight:500;transition:background .2s,color .2s;}
.Qixian-bg-btn.active{background:#222;color:#fff;}
.Qixian-mf{position:absolute;inset:0;background:rgba(0,0,0,.15);z-index:50;display:flex;flex-direction:column;justify-content:flex-end;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
.Qixian-mf.show{opacity:1;pointer-events:auto;}
.Qixian-mbox{background:rgba(255,255,255,.98);height:75%;border-radius:28px 28px 0 0;display:flex;flex-direction:column;transform:translateY(100%);transition:transform .3s;}
.Qixian-mf.show .Qixian-mbox{transform:translateY(0);}
.Qixian-mh{display:flex;justify-content:space-between;align-items:center;padding:20px 24px 14px;font-weight:500;font-size:15px;color:#222;}
.Qixian-mc{width:28px;height:28px;background:rgba(0,0,0,.03);border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;color:#888;font-weight:300;}
.Qixian-act-btn{padding:18px;text-align:center;font-size:15px;font-weight:400;color:#222;cursor:pointer;}
.Qixian-act-space{height:8px;background:rgba(0,0,0,.02);}
.Qixian-act-btn:active{background:rgba(0,0,0,.03);}
.Qixian-cen{position:absolute;inset:0;background:rgba(0,0,0,.25);z-index:999;display:none;justify-content:center;align-items:center;opacity:0;transition:opacity .3s;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
.Qixian-cen.show{display:flex;opacity:1;}
.Qixian-cen-box{background:rgba(250,250,250,.98);width:260px;border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:16px;transform:translateY(20px);transition:transform .3s;}
.Qixian-cen.show .Qixian-cen-box{transform:translateY(0);}
.Qixian-cen-box h4{text-align:center;font-size:15px;font-weight:500;color:#222;}
.Qixian-tf-grp{display:flex;align-items:baseline;border-bottom:1.5px solid rgba(0,0,0,.1);padding-bottom:6px;gap:8px;}
.Qixian-tf-grp input{border:none;font-size:26px;font-weight:400;width:100%;outline:none;background:transparent;color:#222;}
.Qixian-cen-inp,.Qixian-cen-box textarea{border:none;background:rgba(0,0,0,.03);padding:12px;border-radius:10px;font-size:13px;outline:none;resize:none;color:#222;width:100%;font-weight:400;}
.Qixian-cen-btns{display:flex;gap:12px;}
.Qixian-cen-btns button{flex:1;padding:12px;border-radius:12px;border:none;font-size:13px;font-weight:500;cursor:pointer;}
.Qixian-cen-btns .cc{background:rgba(0,0,0,.04);color:#55;} .Qixian-cen-btns .ok{background:#222;color:#fff;}
.Qixian-cen.w260 .Qixian-cen-box{width:280px;gap:12px;}
.Qixian-draw-canvas{border-radius:14px;background:#fff;touch-action:none;cursor:crosshair;display:block;margin:0 auto;border:.5px solid rgba(0,0,0,.03);}
.Qixian-draw-tools{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;margin:6px 0;background:rgba(0,0,0,.02);padding:8px 10px;border-radius:14px;}
.Qixian-draw-color{width:26px;height:26px;border-radius:8px;cursor:pointer;padding:0;background:transparent;flex-shrink:0;border:none;}
.Qixian-draw-range{flex:1;accent-color:#222;height:4px;}
.Qixian-draw-btn-icon{width:28px;height:28px;border-radius:8px;background:rgba(0,0,0,.03);display:flex;justify-content:center;align-items:center;cursor:pointer;color:#444;flex-shrink:0;transition:transform .1s,background .2s;}
.Qixian-draw-btn-icon:active{transform:scale(.9);}
.Qixian-draw-btn-icon svg{stroke:currentColor;fill:none;width:16px;height:16px;stroke-width:1.5;}
.Qixian-txt-zoom{position:absolute;inset:0;background:rgba(250,250,250,.9);z-index:1000;display:none;justify-content:center;align-items:center;opacity:0;transition:opacity .3s;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:20px;cursor:zoom-out;}
.Qixian-txt-zoom.show{display:flex;opacity:1;align-items:center;}
.Qixian-txt-zoom-in{width:100%;max-width:300px;max-height:80vh;overflow-y:auto;scrollbar-width:none;background:#fff;border-radius:20px!important;padding:28px;font-size:16px;color:#222;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;word-wrap:break-word;white-space:pre-wrap;font-weight:400;cursor:default;box-shadow:0 8px 30px rgba(0,0,0,.05);border:.5px solid rgba(0,0,0,.02);}
.Qixian-txt-zoom-in.txt-img-zoom{border:none!important;background:linear-gradient(135deg,var(--bub-l),var(--bub-r))!important;aspect-ratio:1;justify-content:center;border-radius:20px!important;padding:16px!important;}
.Qixian-txt-zoom-in.gift-zoom{justify-content:center;}
.Qixian-loc-wrap{flex:1;display:flex;flex-direction:column;align-items:center;position:relative;background:#fdfdfd;background-image:radial-gradient(rgba(0,0,0,.05) 1px,transparent 1px);background-size:20px 20px;border-radius:0 0 28px 28px;overflow:hidden;padding:24px 0;}
.Qixian-loc-dist{font-size:13px;color:#222;font-weight:500;margin-top:6px;padding:6px 14px;background:rgba(0,0,0,.03);border-radius:14px;}
.Qixian-radar{width:280px;height:280px;position:relative;margin:30px auto;display:flex;justify-content:center;align-items:center;}
.Qixian-radar-wave{position:absolute;width:100%;height:100%;border-radius:50%;background:radial-gradient(circle,rgba(0,0,0,.06) 0%,rgba(0,0,0,.02) 60%,transparent 80%);animation:Qixian-radar-pulse 3s ease-out infinite;opacity:0;}
.Qixian-radar-wave.w2{animation-delay:1.5s;width:80%;height:80%;}
@keyframes Qixian-radar-pulse{0%{transform:scale(.5);opacity:0;}50%{opacity:1;}100%{transform:scale(1.2);opacity:0;}}
.Qixian-anchor{position:absolute;display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:transform .2s cubic-bezier(.2,.8,.2,1);z-index:5;}
.Qixian-anchor:active{transform:scale(1.08);}
.Qixian-anchor.a1{top:25%;left:15%;}
.Qixian-anchor.a2{bottom:20%;right:15%;}
.Qixian-anchor-av{width:46px;height:46px;border-radius:50%;background-size:cover;position:relative;z-index:2;transition:border-radius .3s;border:1px solid rgba(255,255,255,.8);box-shadow:0 4px 10px rgba(0,0,0,.05);}
.Qixian-anchor-tip{position:absolute;top:-38px;background:rgba(255,255,255,.95);backdrop-filter:blur(16px);padding:8px 14px;border-radius:16px;font-size:12px;color:#222;font-weight:500;white-space:nowrap;opacity:0;pointer-events:none;transition:all .2s;z-index:10;transform:translateY(4px);box-shadow:0 2px 8px rgba(0,0,0,.05);border:.5px solid rgba(0,0,0,.02);}
.Qixian-anchor:hover .Qixian-anchor-tip{opacity:1;transform:translateY(0);}
.Qixian-loc-send{margin-top:auto;background:#222;color:#fff;border-radius:18px;padding:14px 36px;font-size:14px;font-weight:500;cursor:pointer;border:none;}
.Qixian-mu,.Qixian-cp,.Qixian-emo{flex:1;display:flex;flex-direction:column;padding:20px;gap:20px;overflow-y:auto;scrollbar-width:none;}
.Qixian-mu-stage{display:flex;justify-content:center;align-items:center;gap:16px;}
.Qixian-mu-face{width:64px;height:64px;border-radius:50%;background-size:cover;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}
.Qixian-mu-waves{display:flex;align-items:center;justify-content:center;gap:6px;height:36px;width:48px;}
.Qixian-mu-waves .Qixian-wave{background:rgba(0,0,0,.1);width:3px;height:4px;border-radius:2px;transition:height .3s;}
.Qixian-mu-waves.playing .Qixian-wave{background:#222;animation:Qixian-jp 1s ease-in-out infinite alternate;}
.Qixian-mu-waves.playing .Qixian-wave:nth-child(2){animation-delay:.3s}
.Qixian-mu-waves.playing .Qixian-wave:nth-child(3){animation-delay:.15s}
.Qixian-mu-time-disp{text-align:center;font-size:12px;color:#555;font-weight:500;background:rgba(0,0,0,.02);padding:6px 14px;border-radius:16px;margin:0 auto;border:.5px solid rgba(0,0,0,.02);}
.Qixian-mu-ctrl{display:flex;justify-content:center;align-items:center;gap:28px;margin-top:12px;}
.Qixian-mu-btn{width:48px;height:48px;border-radius:50%;background:transparent;display:flex;justify-content:center;align-items:center;cursor:pointer;border:none;transition:transform .2s;}
.Qixian-mu-btn:active{transform:scale(.9);}
.Qixian-mu-btn svg{width:26px;height:26px;stroke:#222;fill:none;stroke-width:1.2;}
.Qixian-mu-btn.main svg{width:34px;height:34px;fill:#222;stroke:none;}
.Qixian-mu-inp-wrap{display:flex;gap:10px;}
.Qixian-mu-inp,.Qixian-mu-name,.Qixian-mu-artist,.Qixian-mu-cover{flex:1;border-radius:12px;padding:12px 14px;font-size:13px;background:rgba(0,0,0,.02);outline:none;border:none;color:#222;font-weight:400;}
.Qixian-mu-add{padding:0 16px;border:none;border-radius:12px;background:#222;color:#fff;font-size:13px;font-weight:500;}
.Qixian-mu-invbtn{margin-top:auto;padding:14px;border-radius:16px;background:rgba(0,0,0,.03);color:#222;font-size:14px;font-weight:500;cursor:pointer;border:none;}
.Qixian-emo-games{display:flex;gap:10px;padding:12px 20px;flex-shrink:0;align-items:center;}
.Qixian-emo-gamebtn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(0,0,0,.02);border-radius:14px;padding:10px 0;font-size:13px;color:#222;font-weight:500;cursor:pointer;transition:transform .1s,background .2s;border:.5px solid rgba(0,0,0,.02);}
.Qixian-emo-gamebtn:active{transform:scale(.95);background:rgba(0,0,0,.05);}
.Qixian-emo-gamebtn svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;}
.Qixian-emo-addbtn{width:36px;height:36px;flex-shrink:0;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.02);border-radius:12px;cursor:pointer;transition:transform .1s,background .2s;border:.5px solid rgba(0,0,0,.02);}
.Qixian-emo-addbtn:active{transform:scale(.9);background:rgba(0,0,0,.06);}
.Qixian-emo-addbtn svg{width:18px;height:18px;stroke:#222;stroke-width:1.5;fill:none;}
.Qixian-emo{display:grid;grid-template-columns:repeat(2,1fr);align-content:start;gap:12px;padding-top:12px;}
.Qixian-emo-card{background:rgba(0,0,0,.02);border-radius:16px;padding:8px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;transition:transform .1s;border:.5px solid rgba(0,0,0,.02);}
.Qixian-emo-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;pointer-events:none;border:none;}
.Qixian-emo-t{font-size:11px;color:#555;text-align:center;font-weight:400;}
.Qixian-cp-top{display:flex;flex-direction:column;align-items:center;gap:10px;}
.Qixian-cp-avs{display:flex;justify-content:center;align-items:center;}
.Qixian-cp-face{width:64px;height:64px;border-radius:50%;background-size:cover;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.05);}
.Qixian-cp-face.Qixian-jcpf2{margin-left:-20px;position:relative;z-index:2;}
.Qixian-cp-id-group{font-size:14px;font-weight:500;color:#222;letter-spacing:.2px;display:flex;align-items:center;gap:8px;}
.Qixian-cp-rel{text-align:center;font-size:12px;color:#555;background:rgba(0,0,0,.02);border-radius:14px;padding:8px 16px;}
.Qixian-cp-sec{background:rgba(0,0,0,.02);border-radius:20px;padding:16px;transition:background .3s;border:.5px solid rgba(0,0,0,.02);}
.Qixian-cp-h{font-size:13px;font-weight:500;color:#222;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.Qixian-sign-mod{display:flex;flex-direction:column;gap:10px;background:rgba(255,255,255,.8);padding:14px;border-radius:16px;margin-bottom:12px;}
.Qixian-sign-hd{display:flex;align-items:center;gap:10px;}
.Qixian-sign-bd{font-size:12px;color:#444;line-height:1.5;padding-left:42px;word-wrap:break-word;font-weight:300;}
.Qixian-sign-act{display:flex;align-items:center;background:rgba(0,0,0,.03);border-radius:18px;padding:4px;margin-top:10px;}
.Qixian-jusignin{flex:1;border:none;background:transparent;padding:8px 12px;font-size:12px;outline:none;color:#222;min-width:0;font-weight:400;}
.Qixian-jusignsave{height:30px;padding:0 16px;border:none;border-radius:15px;background:#222;color:#fff;font-size:12px;font-weight:500;cursor:pointer;flex-shrink:0;}
.Qixian-signdel{cursor:pointer;color:#aaa;margin-left:auto;padding:4px;transition:color .2s;}
.Qixian-signdel:active{color:#666;}
.Qixian-cp-things,.Qixian-cp-days{display:flex;flex-direction:column;gap:8px;}
.Qixian-cp-thing{display:flex;align-items:center;gap:10px;font-size:13px;color:#333;padding:10px 14px;background:rgba(255,255,255,.8);border-radius:12px;font-weight:400;}
.Qixian-cp-thing .dot{width:16px;height:16px;border-radius:50%;border:1.5px solid #ccc;flex-shrink:0;cursor:pointer;}
.Qixian-cp-thing.done{opacity:.4;} .Qixian-cp-thing.done .dot{background:#ccc;border-color:#ccc;}
.Qixian-cp-addrow{display:flex;align-items:center;background:rgba(0,0,0,.02);border-radius:14px;padding:6px;margin-top:12px;gap:6px;flex-wrap:wrap;border:.5px solid rgba(0,0,0,.03);}
.Qixian-cp-addrow input,.Qixian-cp-addrow select{flex:1;min-width:60px;border:none;background:#fff;border-radius:10px;padding:8px 10px;font-size:12px;outline:none;color:#222;}
.Qixian-cp-addrow button{height:32px;padding:0 16px;border:none;border-radius:10px;background:#222;color:#fff;font-size:12px;font-weight:500;cursor:pointer;}
.Qixian-cp-day{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,.8);border-radius:14px;}
.Qixian-cp-day span{font-size:14px;font-weight:500;color:#222;max-width:60%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.Qixian-cp-day b{color:#555;font-size:11px;font-weight:400;background:rgba(0,0,0,.03);padding:6px 12px;border-radius:20px;}
.Qixian-cp-albums{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:6px 0;}
.Qixian-cp-album-card{position:relative;background:rgba(255,255,255,.8);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;cursor:pointer;border:.5px solid rgba(0,0,0,.03);}
.Qixian-cp-album-img{width:100%;aspect-ratio:1;background-size:cover;background-position:center;border:none;}
.Qixian-cp-album-txt{padding:8px 10px;font-size:11px;color:#333;font-weight:400;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#fff;}
.Qixian-cp-album-txt-only{padding:14px;font-size:13px;color:#222;text-align:center;display:flex;align-items:center;justify-content:center;height:100%;aspect-ratio:1;background:#fff;font-weight:400;word-wrap:break-word;white-space:pre-wrap;overflow-y:auto;scrollbar-width:none;line-height:1.5;border:none;}
.Qixian-cp-album-who{position:absolute;top:6px;right:6px;background:rgba(0,0,0,.2);color:#fff;font-size:10px;padding:4px 8px;border-radius:10px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);pointer-events:none;font-weight:300;}
.Qixian-pyq-panel{position:absolute;inset:0;background:#fdfdfd;z-index:60;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s cubic-bezier(.2,.8,.2,1);}
.Qixian-pyq-panel.show{transform:translateX(0);}
.Qixian-pyq-hd{padding:24px 20px 12px;display:flex;align-items:center;justify-content:space-between;background:rgba(253,253,253,.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:26;border-bottom:.5px solid rgba(0,0,0,.03);}
.Qixian-pyq-back{cursor:pointer;display:flex;align-items:center;color:#222;}
.Qixian-pyq-back svg{width:24px;height:24px;stroke:currentColor;stroke-width:1.5;fill:none;}
.Qixian-pyq-addbtn{width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.03);display:flex;justify-content:center;align-items:center;cursor:pointer;}
.Qixian-pyq-addbtn svg{width:18px;height:18px;stroke:#222;stroke-width:1.5;fill:none;}
.Qixian-pyq-scroll{flex:1;overflow-y:auto;scrollbar-width:none;padding-bottom:20px;}
.Qixian-pyq-cover{height:200px;background-color:#f0f0f0;background-size:cover;background-position:center;position:relative;cursor:pointer;}
.Qixian-pyq-user{position:absolute;right:20px;bottom:-24px;display:flex;align-items:flex-end;gap:14px;}
.Qixian-pyq-uname{font-size:16px;font-weight:600;color:#fff;text-shadow:0 1px 6px rgba(0,0,0,.4);margin-bottom:28px;letter-spacing:.5px;}
.Qixian-pyq-uav{width:72px;height:72px;border-radius:16px;background-size:cover;cursor:pointer;transition:border-radius .3s;border:1px solid rgba(255,255,255,.8);}
.Qixian-pyq-list{padding:48px 20px 20px;display:flex;flex-direction:column;gap:24px;}
.Qixian-pyq-item{display:flex;gap:12px;padding-bottom:20px;position:relative;border-bottom:.5px solid rgba(0,0,0,.03);}
.Qixian-pyq-delbtn{position:absolute;right:0;top:0;padding:6px;color:#ccc;cursor:pointer;transition:color .2s;}
.Qixian-pyq-delbtn:active{color:#888;}
.Qixian-pyq-delbtn svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;}
.Qixian-pyq-iav{width:44px;height:44px;border-radius:12px;background-size:cover;flex-shrink:0;transition:border-radius .3s;border:.5px solid rgba(0,0,0,.03);}
.Qixian-pyq-ict{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px;}
.Qixian-pyq-inm{font-size:14px;font-weight:500;color:#222;letter-spacing:.2px;}
.Qixian-pyq-itxt{font-size:13px;color:#444;line-height:1.6;white-space:pre-wrap;word-break:break-word;font-weight:300;}
.Qixian-pyq-iimg{max-width:80%;border-radius:12px;margin-top:4px;display:block;border:.5px solid rgba(0,0,0,.03);}
.Qixian-pyq-txtimg{display:flex!important;justify-content:center!important;align-items:center!important;width:130px!important;aspect-ratio:1!important;background:rgba(0,0,0,.02)!important;border-radius:16px!important;padding:14px!important;font-size:14px!important;font-weight:400!important;color:#222!important;text-align:center!important;word-wrap:break-word!important;white-space:pre-wrap!important;line-height:1.5!important;cursor:pointer!important;overflow:hidden!important;margin-top:4px;border:.5px solid rgba(0,0,0,.03)!important;box-shadow:none!important;}
.Qixian-pyq-ibot{display:flex;justify-content:space-between;align-items:center;margin-top:6px;font-size:11px;color:#999;font-weight:300;}
.Qixian-pyq-iacts{display:flex;gap:16px;}
.Qixian-pyq-btn{display:flex;align-items:center;gap:4px;cursor:pointer;color:#888;transition:color .2s;}
.Qixian-pyq-btn:active{color:#222;}
.Qixian-pyq-btn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.5;}
.Qixian-pyq-ints{background:rgba(0,0,0,.02);border-radius:12px;margin-top:10px;font-size:12px;color:#444;border:.5px solid rgba(0,0,0,.02);}
.Qixian-pyq-likes{padding:8px 12px;display:flex;align-items:center;gap:8px;color:#222;font-weight:500;border:none;}
.Qixian-pyq-likes svg{width:14px;height:14px;fill:currentColor;}
.Qixian-pyq-coms{padding:8px 12px;display:flex;flex-direction:column;gap:6px;border-top:.5px solid rgba(0,0,0,.03);}
.Qixian-pyq-com{cursor:pointer;transition:opacity .2s;font-weight:300;}
.Qixian-pyq-com:active{opacity:.6;}
.Qixian-pyq-com span{font-weight:500;color:#222;}
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = phoneCSS;
  document.head.appendChild(styleEl);

  // ===================== 2. 注入 HTML 结构 =====================
  const phoneHTML = `
<div class="Qixian-stage"><div class="Qixian-phone-wrap" id="Qx-Phone-Wrapper"><div class="Qixian-phone"><div class="Qixian-home-screen Qixian-jhome"><div class="Qixian-ios-statusbar"><div class="Qixian-jhome-time">12:00</div><div class="Qixian-ios-statusbar-right"><svg viewBox="0 0 24 24"><path d="M12 20h2V10h-2v10zm-4 0h2v-6H8v6zm8-14v14h2V6h-2zM4 20h2v-3H4v3z"/></svg><svg viewBox="0 0 24 24"><path d="M12 3c-4.8 0-9.1 1.9-12.3 5l1.4 1.4C4.1 6.5 7.9 4.8 12 4.8s7.9 1.7 10.9 4.6l1.4-1.4C21.1 4.9 16.8 3 12 3zm0 5.5c-3.2 0-6.2 1.2-8.5 3.3l1.4 1.4c1.9-1.7 4.4-2.7 7.1-2.7s5.2 1 7.1 2.7l1.4-1.4C18.2 9.7 15.2 8.5 12 8.5zm0 5c-1.6 0-3.1.6-4.2 1.6l1.4 1.4c.8-.7 1.8-1 2.8-1s2 .3 2.8 1l1.4-1.4c-1.1-1-2.6-1.6-4.2-1.6zm0 4.5c-.8 0-1.5.7-1.5 1.5S11.2 21 12 21s1.5-.7 1.5-1.5S12.8 18 12 18z"/></svg><div class="Qixian-ios-battery"><div class="Qixian-ios-battery-level"></div></div></div></div><div class="Qixian-sticky-note"><div class="Qixian-sticky-tape"></div><textarea class="Qixian-sticky-textarea Qixian-jsticky-txt" placeholder="在这里写下便签..."></textarea><button class="Qixian-sticky-btn Qixian-jsticky-save">保存更新</button></div><div class="Qixian-dock"><div class="Qixian-dock-icon" id="app-wechat"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div><div class="Qixian-dock-icon" id="app-phone"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div></div></div><div class="Qixian-sys-app Qixian-japp-panel"><div class="Qixian-sys-app-hd"><div class="Qixian-japp-back" style="cursor:pointer;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div><span class="Qixian-japp-title" style="flex:1; text-align:center; padding-right:24px;">电话</span></div><div class="Qixian-sys-app-body Qixian-japp-body"><div class="Qixian-phone-app-container"><div class="Qixian-phone-content" id="phone-content"></div><div class="Qixian-phone-tabbar"><div class="Qixian-ptab active" data-target="recents"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>最近通话</div><div class="Qixian-ptab" data-target="contacts"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>联系人</div><div class="Qixian-ptab" data-target="dialpad"><svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2"></circle><circle cx="12" cy="6" r="2"></circle><circle cx="18" cy="6" r="2"></circle><circle cx="6" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="18" cy="12" r="2"></circle><circle cx="6" cy="18" r="2"></circle><circle cx="12" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle></svg>拨号键盘</div></div></div></div></div><div class="Qixian-content-layer Qixian-root"><div class="Qixian-bg Qixian-jbg"></div><div class="Qixian-call Qixian-jcall state-out"><div class="Qixian-call-mini-hint"></div><div class="Qixian-call-vbg Qixian-bind-lav-bg"></div><div class="Qixian-call-pip Qixian-bind-rav-bg"></div><div class="Qixian-call-mini-top Qixian-jcall-mini-top"><svg viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg></div><div class="Qixian-call-ct"><div class="Qixian-call-avs"><div class="Qixian-call-av Qixian-jcall-lav Qixian-bind-lav"></div><div class="Qixian-call-av Qixian-jcall-rav Qixian-bind-rav"></div></div><div class="Qixian-call-nm Qixian-jcall-nm Qixian-bind-lnm"></div><div class="Qixian-call-timer Qixian-jcall-timer">00:00</div><div class="Qixian-call-st Qixian-jcall-st">正在呼叫...</div><div class="Qixian-call-bubs Qixian-jcall-bubs"></div><div class="Qixian-call-ft"><div class="Qixian-call-btns btns-in"><div class="Qixian-call-btn hangup Qixian-jcall-reject"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><div class="Qixian-call-btn answer Qixian-jcall-answer"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div></div><div class="Qixian-call-btns btns-out"><div class="Qixian-call-btn cancel Qixian-jcall-cancel"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div></div><div class="Qixian-call-inrow"><div class="Qixian-call-btn hangup mini Qixian-jcall-end" title="挂断"><svg viewBox="0 0 24 24"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><input type="text" class="Qixian-call-in Qixian-jcall-in" placeholder="发送实时消息..."><button class="Qixian-call-send Qixian-jcall-send">发送</button></div></div></div></div><div class="Qixian-hd Qixian-jhd"><div class="Qixian-notch"></div><div class="Qixian-hd-back Qixian-jhd-back" title="返回主界面"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></div><div class="Qixian-hd-ph" style="display:none;"></div><div class="Qixian-hd-mid"><div class="Qixian-ubox Qixian-jpat-l"><div class="Qixian-uav Qixian-bind-lav" title="点击修改拍一拍"></div><div class="Qixian-uname Qixian-bind-lnm" title="点击修改对方备注"></div></div><div class="Qixian-waves"><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span></div><div class="Qixian-ubox Qixian-jpat-r"><div class="Qixian-uav Qixian-bind-rav" title="点击修改拍一拍"></div><div class="Qixian-uname Qixian-bind-rnm" title="点击修改自己备注"></div></div></div><div class="Qixian-icons-rt"><div class="Qixian-icbtn pyq Qixian-jpyqbtn" title="朋友圈"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div class="Qixian-icbtn Qixian-jset-open" title="设置"><svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="19" r="2.5"/></svg></div></div><div class="Qixian-hd-pull Qixian-jhd-toggle"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div><div class="Qixian-chat Qixian-jchat"></div><div class="Qixian-pyq-panel Qixian-jpyqpanel"><div class="Qixian-pyq-hd"><div class="Qixian-pyq-back Qixian-jpyqback" title="返回"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg></div><div class="Qixian-pyq-addbtn Qixian-jpyqadd"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div></div><div class="Qixian-pyq-scroll"><div class="Qixian-pyq-cover Qixian-jpyq-cover" title="点击更换背景"><div class="Qixian-pyq-user"><div class="Qixian-pyq-uname Qixian-bind-rnm"></div><div class="Qixian-pyq-uav Qixian-jpyq-uav" title="点击更换头像"></div></div></div><div class="Qixian-pyq-list Qixian-jpyqlist"></div></div></div><div class="Qixian-txt-zoom Qixian-jtxtzoom"><div class="Qixian-txt-zoom-in Qixian-jtxtzoomin"></div></div><div class="Qixian-set Qixian-jset"><div class="Qixian-set-h">视觉控制台<span class="Qixian-set-x Qixian-jset-close">&times;</span></div><div class="Qixian-set-r"><label>左侧名称</label><div class="Qixian-color-wrap"><input type="text" class="Qixian-hex-in Qixian-jset-lnm" placeholder="输入名称" style="width:100px;"></div></div><div class="Qixian-set-r"><label>右侧名称</label><div class="Qixian-color-wrap"><input type="text" class="Qixian-hex-in Qixian-jset-rnm" placeholder="输入名称" style="width:100px;"></div></div><div class="Qixian-set-r"><label>拉黑拦截控制</label><div class="Qixian-color-wrap"><button class="Qixian-bg-btn Qixian-jblk-l" title="右侧拉黑左侧，左侧发出的消息带叹号">右侧拉黑左侧</button><button class="Qixian-bg-btn Qixian-jblk-r" title="左侧拉黑右侧，右侧发出的消息带叹号">左侧拉黑右侧</button></div></div><div class="Qixian-set-r"><label>主页/聊天背景</label><div class="Qixian-color-wrap"><button class="Qixian-bg-btn Qixian-jbg-upload">上传/更换</button><button class="Qixian-bg-btn Qixian-jbg-clear">恢复默认</button></div></div><div class="Qixian-set-r"><label>头像形状</label><div class="Qixian-color-wrap"><button class="Qixian-bg-btn Qixian-jav-rnd active">圆形</button><button class="Qixian-bg-btn Qixian-jav-sq">方形</button></div></div><div class="Qixian-set-r"><label>质感风格</label><div class="Qixian-color-wrap"><button class="Qixian-bg-btn Qixian-jglass-glass active">毛玻璃</button><button class="Qixian-bg-btn Qixian-jglass-solid">纯实色</button></div></div><div class="Qixian-set-r"><label>手机外壳</label><div class="Qixian-color-wrap"><input type="text" id="Qx-wrap-txt" class="Qixian-hex-in"><input type="color" id="Qx-wrap"></div></div><div class="Qixian-set-r"><label>顶部栏背景</label><div class="Qixian-color-wrap"><input type="text" id="Qx-hdr-txt" class="Qixian-hex-in"><input type="color" id="Qx-hdr"></div></div><div class="Qixian-set-r"><label>顶部下拉键</label><div class="Qixian-color-wrap"><input type="text" id="Qx-pull-txt" class="Qixian-hex-in"><input type="color" id="Qx-pull"></div></div><div class="Qixian-set-r"><label>波浪呼吸条</label><div class="Qixian-color-wrap"><input type="text" id="Qx-wv-txt" class="Qixian-hex-in"><input type="color" id="Qx-wv"></div></div><div class="Qixian-set-r"><label>交互卡片底色</label><div class="Qixian-color-wrap"><input type="text" id="Qx-card-txt" class="Qixian-hex-in"><input type="color" id="Qx-card"></div></div><div class="Qixian-set-r"><label>底部输入区</label><div class="Qixian-color-wrap"><input type="text" id="Qx-ftr-txt" class="Qixian-hex-in"><input type="color" id="Qx-ftr"></div></div><div class="Qixian-set-r"><label>我方气泡</label><div class="Qixian-color-wrap"><input type="text" id="Qx-bub-txt" class="Qixian-hex-in"><input type="color" id="Qx-bub"></div></div><div class="Qixian-set-r"><label>对方气泡</label><div class="Qixian-color-wrap"><input type="text" id="Qx-bubl-txt" class="Qixian-hex-in"><input type="color" id="Qx-bubl"></div></div><div class="Qixian-set-r"><label>气泡文字</label><div class="Qixian-color-wrap"><input type="text" id="Qx-tm-txt" class="Qixian-hex-in"><input type="color" id="Qx-tm"></div></div><div class="Qixian-set-r"><label>交互卡片字</label><div class="Qixian-color-wrap"><input type="text" id="Qx-cdt-txt" class="Qixian-hex-in"><input type="color" id="Qx-cdt"></div></div><div class="Qixian-set-r"><label>交互卡片图标</label><div class="Qixian-color-wrap"><input type="text" id="Qx-cic-txt" class="Qixian-hex-in"><input type="color" id="Qx-cic"></div></div><div class="Qixian-set-r"><label>顶部栏文字</label><div class="Qixian-color-wrap"><input type="text" id="Qx-hdt-txt" class="Qixian-hex-in"><input type="color" id="Qx-hdt"></div></div><div class="Qixian-set-r"><label>顶部栏图标</label><div class="Qixian-color-wrap"><input type="text" id="Qx-hdi-txt" class="Qixian-hex-in"><input type="color" id="Qx-hdi"></div></div><div class="Qixian-set-r"><label>系统提示字</label><div class="Qixian-color-wrap"><input type="text" id="Qx-sys-txt" class="Qixian-hex-in"><input type="color" id="Qx-sys"></div></div><div class="Qixian-set-r"><label>通话左气泡</label><div class="Qixian-color-wrap"><input type="text" id="Qx-cbubl-txt" class="Qixian-hex-in"><input type="color" id="Qx-cbubl"></div></div><div class="Qixian-set-r"><label>通话右气泡</label><div class="Qixian-color-wrap"><input type="text" id="Qx-cbub-txt" class="Qixian-hex-in"><input type="color" id="Qx-cbub"></div></div><div class="Qixian-set-r"><label>通话气泡字</label><div class="Qixian-color-wrap"><input type="text" id="Qx-cbtxt-txt" class="Qixian-hex-in"><input type="color" id="Qx-cbtxt"></div></div></div><div class="Qixian-ft"><div class="Qixian-reply-bar Qixian-jrepbar"><span class="Qixian-reply-txt Qixian-jreptxt"></span><div class="Qixian-reply-close Qixian-jrepclose">×</div></div><div class="Qixian-in-area"><div class="Qixian-lang Qixian-jlang">CN</div><div class="Qixian-plus Qixian-jplus"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div><input type="text" class="Qixian-input Qixian-jinput" placeholder="输入文字发送..."><div class="Qixian-mic Qixian-jmic"><svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg></div><div class="Qixian-send Qixian-jsend"><svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></div></div><div class="Qixian-panel Qixian-jpanel"><div class="Qixian-pi Qixian-jbtn-voice"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div class="Qixian-ptx">语音呼叫</div></div><div class="Qixian-pi Qixian-jbtn-video"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></div><div class="Qixian-ptx">视频呼叫</div></div><div class="Qixian-pi Qixian-jimgbtn"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div><div class="Qixian-ptx">发原图</div></div><div class="Qixian-pi Qixian-jtxtimg"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg></div><div class="Qixian-ptx">发文字图</div></div><div class="Qixian-pi Qixian-jgiftbtn"><div class="Qixian-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg></div><div class="Qixian-ptx">送礼物</div></div><div class="Qixian-pi Qixian-jlinkbtn"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><div class="Qixian-ptx">发链接</div></div><div class="Qixian-pi Qixian-jtf"><div class="Qixian-pic"><svg viewBox="0 0 24 24" class="fl"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg></div><div class="Qixian-ptx">转账</div></div><div class="Qixian-pi Qixian-jemo"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div><div class="Qixian-ptx">表情包</div></div><div class="Qixian-pi Qixian-jmusic"><div class="Qixian-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></div><div class="Qixian-ptx">一起听歌</div></div><div class="Qixian-pi Qixian-jcp"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><div class="Qixian-ptx">情侣空间</div></div><div class="Qixian-pi Qixian-jbtn-loc"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="Qixian-ptx">共享位置</div></div><div class="Qixian-pi Qixian-jbtn-food"><div class="Qixian-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div><div class="Qixian-ptx">点外卖</div></div><div class="Qixian-pi Qixian-jbtn-draw"><div class="Qixian-pic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></div><div class="Qixian-ptx">手绘便签</div></div></div></div><div class="Qixian-mf Qixian-jmsgact"><div class="Qixian-mbox" style="height:auto; padding-bottom:24px;"><div class="Qixian-act-btn Qixian-jact-reply">引用回复</div><div class="Qixian-act-btn Qixian-jact-revoke" style="display:none; color:#222;">撤回消息</div><div class="Qixian-act-space"></div><div class="Qixian-act-btn Qixian-jact-cancel" style="color:#888;">取消</div></div></div><div class="Qixian-cen Qixian-jaddfriendmodal w260"><div class="Qixian-cen-box"><h4>重新添加好友</h4><input type="text" class="Qixian-cen-inp Qixian-jaddgreet" placeholder="打个招呼吧..."><div class="Qixian-cen-btns"><button class="cc Qixian-jaddfcancel">取消</button><button class="ok Qixian-jaddfok">发送申请</button></div></div></div><div class="Qixian-cen Qixian-jtfactmodal w260"><div class="Qixian-cen-box"><h4>转账处理</h4><div style="font-size:13px;color:#888;text-align:center;font-weight:300;">请选择对该笔转账的操作</div><div class="Qixian-cen-btns"><button class="cc Qixian-jtfact-return">退回</button><button class="ok Qixian-jtfact-receive">收款</button></div><div class="Qixian-cen-btns" style="margin-top:-6px;"><button class="cc Qixian-jtfact-cancel" style="width:100%;">取消</button></div></div></div><div class="Qixian-cen Qixian-jlocinputmodal w260"><div class="Qixian-cen-box"><h4>发送位置分享</h4><input type="text" class="Qixian-cen-inp Qixian-jlocin-pos" placeholder="我的位置 (如:朝阳区)"><input type="text" class="Qixian-cen-inp Qixian-jlocin-dist" placeholder="相距距离 (如:12.5 km)"><div class="Qixian-cen-btns"><button class="cc Qixian-jlocincancel">取消</button><button class="ok Qixian-jlocinok">发送</button></div></div></div><div class="Qixian-cen Qixian-jdrawmodal w260"><div class="Qixian-cen-box" style="width:290px; padding:20px;"><h4>手绘涂鸦</h4><canvas class="Qixian-draw-canvas Qixian-jdrawcanvas" width="246" height="246"></canvas><div class="Qixian-draw-tools"><input type="color" class="Qixian-draw-color Qixian-jdrawcolor" value="#222222"><input type="range" class="Qixian-draw-range Qixian-jdrawwidth" min="1" max="20" value="3"><div class="Qixian-draw-btn-icon Qixian-jdraweraser" title="橡皮擦"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L20 9C20.5 9.5 20.5 10.5 20 11L11 20H20V20Z"/></svg></div><div class="Qixian-draw-btn-icon Qixian-jdrawundo" title="撤销"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h10a5 5 0 0 1 5 5v2"/><polyline points="7 6 3 10 7 14"/></svg></div><div class="Qixian-draw-btn-icon Qixian-jdrawclear" title="清空画布"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div></div><div class="Qixian-cen-btns"><button class="cc Qixian-jdrawcancel">取消</button><button class="ok Qixian-jdrawok">发送</button></div></div></div><div class="Qixian-cen Qixian-jgiftmodal w260"><div class="Qixian-cen-box"><h4>送专属礼物</h4><input type="text" class="Qixian-cen-inp Qixian-jgiftdesc" placeholder="礼物名称或描述"><div class="Qixian-tf-grp"><span>¥</span><input type="number" class="Qixian-jgiftpr" placeholder="0.00"></div><input type="text" class="Qixian-cen-inp Qixian-jgiftnote" placeholder="备注留言"><div class="Qixian-cen-btns"><button class="cc Qixian-jgiftcancel">取消</button><button class="ok Qixian-jgiftok">送出</button></div></div></div><div class="Qixian-cen Qixian-jlinkmodal w260"><div class="Qixian-cen-box"><h4>分享外链</h4><input type="text" class="Qixian-cen-inp Qixian-jlinkurl" placeholder="网址URL..."><input type="text" class="Qixian-cen-inp Qixian-jlinktitle" placeholder="分享标题..."><div class="Qixian-cen-btns"><button class="cc Qixian-jlinkcancel">取消</button><button class="ok Qixian-jlinkok">分享</button></div></div></div><div class="Qixian-cen Qixian-jtfmodal"><div class="Qixian-cen-box"><h4>发起转账</h4><div class="Qixian-tf-grp"><span>¥</span><input type="number" class="Qixian-jtfamt" placeholder="0.00"></div><input type="text" class="Qixian-cen-inp Qixian-jtftitle" placeholder="转账说明"><div class="Qixian-cen-btns"><button class="cc Qixian-jtfcancel">取消</button><button class="ok Qixian-jtfok">确认</button></div></div></div><div class="Qixian-cen Qixian-jimgmodal w260"><div class="Qixian-cen-box"><h4>发送原图直链</h4><input type="text" class="Qixian-cen-inp Qixian-jimgurl" placeholder="图片URL直链/AI提示词..."><input type="text" class="Qixian-cen-inp Qixian-jimgdesc" placeholder="图片描述"><div class="Qixian-cen-btns"><button class="cc Qixian-jimgcancel">取消</button><button class="ok Qixian-jimgok">发送直链</button></div></div></div><div class="Qixian-cen Qixian-jtxtimgmodal w260"><div class="Qixian-cen-box"><h4>文字图气泡</h4><textarea class="Qixian-jtxtimgin" rows="3" placeholder="输入气泡中的文字..."></textarea><div class="Qixian-cen-btns"><button class="cc Qixian-jtxtimgcancel">取消</button><button class="ok Qixian-jtxtimgok">发送</button></div></div></div><div class="Qixian-cen Qixian-jfoodmodal w260"><div class="Qixian-cen-box"><h4>高级外卖</h4><input type="text" class="Qixian-cen-inp Qixian-jfoodshop" placeholder="店铺名称 (如: 肯德基)"><input type="text" class="Qixian-cen-inp Qixian-jfooditems" placeholder="外卖内容 (如: 炸鸡套餐)"><input type="text" class="Qixian-cen-inp Qixian-jfoodaddr" placeholder="配送地址"><input type="text" class="Qixian-cen-inp Qixian-jfoodname" placeholder="收件人姓名"><input type="text" class="Qixian-cen-inp Qixian-jfoodphone" placeholder="收件人电话"><div class="Qixian-cen-btns"><button class="cc Qixian-jfoodcancel">取消</button><button class="ok Qixian-jfoodok">下单并发送</button></div></div></div><div class="Qixian-cen Qixian-jvoicemodal w260"><div class="Qixian-cen-box"><h4>语音异常/降级</h4><textarea class="Qixian-jvoicetxt" rows="3" placeholder="麦克风受限，请输入文字..."></textarea><div class="Qixian-cen-btns"><button class="cc Qixian-jvoicecancel">取消</button><button class="ok Qixian-jvoiceok">生成语音条</button></div></div></div><div class="Qixian-cen Qixian-jpatmodal w260"><div class="Qixian-cen-box"><h4>修改拍一拍后缀</h4><div style="font-size:12px;color:#888;text-align:center;font-weight:300;">双击头像时生效</div><input type="text" class="Qixian-cen-inp Qixian-jpatin" placeholder="例如：的脑袋"><div class="Qixian-cen-btns"><button class="cc Qixian-jpatcancel">取消</button><button class="ok Qixian-jpatok">确定</button></div></div></div><div class="Qixian-cen Qixian-jaddemomodal w260"><div class="Qixian-cen-box"><h4>添加自定义表情</h4><input type="text" class="Qixian-cen-inp Qixian-jaddemourl" placeholder="图片URL直链..."><input type="text" class="Qixian-cen-inp Qixian-jaddemotxt" placeholder="说明文字"><div class="Qixian-cen-btns"><button class="cc Qixian-jaddemocancel">取消</button><button class="ok Qixian-jaddemook">保存</button></div></div></div><div class="Qixian-cen Qixian-jviewmodal w260"><div class="Qixian-cen-box"><h4>撤回原文</h4><textarea class="Qixian-cen-inp Qixian-jviewtxt" rows="4" readonly style="background:rgba(255,255,255,.8);"></textarea><div class="Qixian-cen-btns"><button class="ok Qixian-jviewclose" style="width:100%;">关闭</button></div></div></div><div class="Qixian-cen Qixian-jpyqsendmodal w260"><div class="Qixian-cen-box"><h4>发朋友圈</h4><textarea class="Qixian-cen-inp Qixian-jpyqsendtxt" rows="3" placeholder="这一刻的想法..."></textarea><input type="text" class="Qixian-cen-inp Qixian-jpyqsendimg" placeholder="配图URL直链 (可选)"><textarea class="Qixian-cen-inp Qixian-jpyqsendtxtimg" rows="2" placeholder="或者直接发文字图，输入内容..."></textarea><div class="Qixian-cen-btns"><button class="cc Qixian-jpyqsendcancel">取消</button><button class="ok Qixian-jpyqsendok">发表</button></div></div></div><div class="Qixian-cen Qixian-jpyqcommodal w260"><div class="Qixian-cen-box"><h4>评论动态</h4><textarea class="Qixian-cen-inp Qixian-jpyqcomtxt" rows="3" placeholder="说点什么..."></textarea><div class="Qixian-cen-btns"><button class="cc Qixian-jpyqcomcancel">取消</button><button class="ok Qixian-jpyqcomok">评论</button></div></div></div><div class="Qixian-mf Qixian-jlocmodal"><div class="Qixian-mbox"><div class="Qixian-mh"><span>位置共享</span><div class="Qixian-mc Qixian-jlocclose">&times;</div></div><div class="Qixian-loc-wrap"><div class="Qixian-cp-top" style="z-index:10;"><div class="Qixian-cp-avs"><div class="Qixian-cp-face Qixian-bind-lav"></div><div class="Qixian-cp-face Qixian-jcpf2 Qixian-bind-rav"></div></div><div class="Qixian-loc-dist">相距 <span id="Qx-loc-dist">未知</span></div></div><div class="Qixian-radar"><div class="Qixian-radar-wave"></div><div class="Qixian-radar-wave w2"></div><div class="Qixian-anchor a1"><div class="Qixian-anchor-av Qixian-bind-lav"></div><div class="Qixian-anchor-tip t1">未获取位置</div></div><div class="Qixian-anchor a2"><div class="Qixian-anchor-av Qixian-bind-rav"></div><div class="Qixian-anchor-tip t2">未获取位置</div></div></div><button class="Qixian-loc-send Qixian-jlocsend">发送当前定位</button></div></div></div><div class="Qixian-mf Qixian-jemomodal"><div class="Qixian-mbox"><div class="Qixian-mh"><span>选择表情与互动</span><div class="Qixian-mc Qixian-jemoclose">&times;</div></div><div class="Qixian-emo-games"><div class="Qixian-emo-gamebtn jemo-poke"><svg viewBox="0 0 24 24"><path d="M11 2a2 2 0 0 0-2 2v5H6a2 2 0 0 0-2 2v2c0 4.4 3.6 8 8 8h3a5 5 0 0 0 5-5v-6a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2z"/></svg>戳一戳</div><div class="Qixian-emo-gamebtn jemo-dice"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/></svg>摇骰子</div><div class="Qixian-emo-gamebtn jemo-rps"><svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>猜拳</div><div class="Qixian-emo-addbtn Qixian-jaddemobtn" title="添加表情"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div></div><div class="Qixian-emo Qixian-jemolist"></div></div></div><div class="Qixian-mf Qixian-jmumodal"><div class="Qixian-mbox"><div class="Qixian-mh"><span>一起听歌</span><div class="Qixian-mc Qixian-jmuclose">&times;</div></div><div class="Qixian-mu"><div class="Qixian-mu-stage"><div class="Qixian-mu-face Qixian-jmuf1 Qixian-bind-lav"></div><div class="Qixian-mu-waves Qixian-jmuwaves"><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span></div><div class="Qixian-mu-face Qixian-jmuf2 Qixian-bind-rav"></div></div><div class="Qixian-mu-time-disp">累计听歌: <span id="Qx-mutime-val">0</span> 分钟</div><div class="Qixian-mu-now Qixian-jmunow" style="text-align:center;font-size:13px;color:#555;font-weight:400;">未在播放</div><div class="Qixian-mu-ctrl"><div class="Qixian-mu-btn Qixian-jmuprev"><svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20" fill="none" stroke="#222" stroke-width="1.5"/><line x1="5" y1="19" x2="5" y2="5" stroke="#222" stroke-width="1.5"/></svg></div><div class="Qixian-mu-btn main Qixian-jmuplay"><svg class="Qixian-jmuicon" viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4" fill="#222"/></svg></div><div class="Qixian-mu-btn Qixian-jmunext"><svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4" fill="none" stroke="#222" stroke-width="1.5"/><line x1="19" y1="5" x2="19" y2="19" stroke="#222" stroke-width="1.5"/></svg></div></div><div class="Qixian-mu-inp-wrap"><input type="text" class="Qixian-mu-name Qixian-jmuname" placeholder="歌曲名称"><input type="text" class="Qixian-mu-artist Qixian-jmuartist" placeholder="歌手名"></div><div class="Qixian-mu-inp-wrap" style="margin-top:-8px;"><input type="text" class="Qixian-mu-cover Qixian-jmucover" placeholder="专辑封面URL直链 (可选)"></div><div class="Qixian-mu-inp-wrap" style="margin-top:-8px;"><input type="text" class="Qixian-mu-inp Qixian-jmuinp" placeholder="单曲直链或网易云ID"><button class="Qixian-mu-add Qixian-jmuaddbtn">添加</button></div><div class="Qixian-mu-list Qixian-jmulist"></div><button class="Qixian-mu-invbtn Qixian-jmuinv">发送一起听歌邀请</button></div></div></div><div class="Qixian-mf Qixian-jcpmodal"><div class="Qixian-mbox"><div class="Qixian-mh"><span>情侣空间</span><div class="Qixian-mc Qixian-jcpclose">&times;</div></div><div class="Qixian-cp"><div class="Qixian-cp-top"><div class="Qixian-cp-avs"><div class="Qixian-cp-face Qixian-bind-lav"></div><div class="Qixian-cp-face Qixian-jcpf2 Qixian-bind-rav"></div></div><div class="Qixian-cp-id-group"><span class="Qixian-bind-lnm"></span> & <span class="Qixian-bind-rnm"></span></div></div><div class="Qixian-cp-rel Qixian-jcprel"></div><div class="Qixian-cp-sec"><div class="Qixian-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> 个性签名</div><div class="Qixian-sign-mod"><div class="Qixian-sign-hd"><div class="Qixian-cp-face Qixian-bind-lav" style="width:30px;height:30px;border-width:.5px;"></div><div class="Qixian-cp-id-group Qixian-bind-lnm" style="font-size:12px;"></div></div><div class="Qixian-sign-bd Qixian-jcsign"></div></div><div class="Qixian-sign-mod" style="margin-top:12px; background:rgba(255,255,255,.9); border:.5px solid rgba(0,0,0,.03);"><div class="Qixian-sign-hd"><div class="Qixian-cp-face Qixian-bind-rav" style="width:30px;height:30px;margin-left:0;border-width:.5px;"></div><div class="Qixian-cp-id-group Qixian-bind-rnm" style="font-size:12px;"></div><div class="Qixian-signdel Qixian-jsigndel" title="删除个签"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div></div><div class="Qixian-sign-bd Qixian-jusign-disp"></div><div class="Qixian-sign-act"><input type="text" class="Qixian-jusignin" placeholder="输入新签名..."><button class="Qixian-jusignsave">发布更新</button></div></div></div><div class="Qixian-cp-sec"><div class="Qixian-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 想做的小事</div><div class="Qixian-cp-things Qixian-jcpthings"></div><div class="Qixian-cp-addrow"><select class="Qixian-jcpwho"><option value="Me">我</option><option value="You">对方</option></select><input type="text" class="Qixian-jcpthingin" placeholder="添加待办..."><button class="Qixian-jcpthingadd">加</button></div></div><div class="Qixian-cp-sec"><div class="Qixian-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 纪念日</div><div class="Qixian-cp-days Qixian-jcpdays"></div><div class="Qixian-cp-addrow"><input type="text" class="Qixian-jcpdayname" placeholder="事件名称"><input type="date" class="Qixian-jcpdaydate"><button class="Qixian-jcpdayadd">加</button></div></div><div class="Qixian-cp-sec"><div class="Qixian-cp-h"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 相册与图文</div><div class="Qixian-cp-albums Qixian-jcpalbums"></div><div class="Qixian-cp-addrow"><input type="text" class="Qixian-jcpalbumtxt" placeholder="这一刻的想法..." style="min-width:30px;"><input type="text" class="Qixian-jcpalbumimg" placeholder="图片URL直链(可选)" style="min-width:50px;"><button class="Qixian-jcpalbumadd">上传</button></div></div></div></div></div></div></div></div>
  `;

    // 创建根容器
  const mount = document.createElement('div');
  mount.id = 'Qixian-Phone-Root';
  mount.innerHTML = phoneHTML;

  // 默认样式：固定右下角，不占用文档流
  mount.style.cssText = `
    position: fixed;
    right: 30px;
    bottom: 30px;
    z-index: 999;
    transform: scale(0.9);
    transform-origin: right bottom;
  `;

  // 支持指定挂载容器，默认挂 body
  const customMount = document.currentScript?.dataset?.mount;
  const targetContainer = customMount ? document.querySelector(customMount) : document.body;
  targetContainer.appendChild(mount);

  const scope = mount;

  // ===================== 3. 核心业务逻辑 =====================
  const $ = (sel) => scope.querySelector(sel);
  const $$ = (sel) => scope.querySelectorAll(sel);

  // 默认昵称与状态
  const leftName = '对方';
  const rightName = '我';
  let blockLeft = false;
  let blockRight = false;
  let replyTarget = null;
  let activeMsgId = 0;
  let msgMap = {};
  let leftPat = '的肩膀';
  let rightPat = '的脑袋';

  // 本地存储封装
  const QxStore = {
    get(k) {
      try { return window.parent.localStorage.getItem(k) || localStorage.getItem(k); }
      catch(e) { try { return localStorage.getItem(k); } catch(e2) { return null; } }
    },
    set(k, v) {
      try { window.parent.localStorage.setItem(k, v); } catch(e){}
      try { localStorage.setItem(k, v); } catch(e2) {}
    }
  };

  // 酒馆输入框同步指令
  function appendCmd(cmd) {
    const inputEl = window.parent.document.querySelector('#mufy_chat_input_box textarea') 
      || window.parent.document.querySelector('.commentInput') 
      || window.parent.document.querySelector('textarea');
    if(!inputEl) return;
    const setter = Object.getOwnPropertyDescriptor(window.parent.HTMLTextAreaElement.prototype, "value").set;
    const cur = inputEl.value || '';
    const nv = cur ? (cur + '\n' + cmd) : cmd;
    if(setter) setter.call(inputEl, nv);
    else inputEl.value = nv;
    inputEl.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // 头像自动同步酒馆
  function resolveAvatar(isChar) {
    try {
      const doc = window.parent.document;
      if (isChar) {
        const img = doc.querySelector('#avatar, .char-avatar img, .avatar img, [data-testid="char-avatar"]');
        if (img && img.src) return img.src;
        const bg = doc.querySelector('.char-avatar, .character-avatar');
        if (bg) {
          const m = getComputedStyle(bg).backgroundImage.match(/url\(["']?([^"']+)["']?\)/);
          if (m && m[1]) return m[1];
        }
      } else {
        const img = doc.querySelector('#user_avatar, .user-avatar img, [data-testid="user-avatar"]');
        if (img && img.src) return img.src;
        const bg = doc.querySelector('.user-avatar, .user-icon');
        if (bg) {
          const m = getComputedStyle(bg).backgroundImage.match(/url\(["']?([^"']+)["']?\)/);
          if (m && m[1]) return m[1];
        }
      }
    } catch(e) {}
    return '';
  }

  // 初始化名称与头像
  function initNames() {
    $$('.Qixian-bind-lnm').forEach(el => el.textContent = leftName);
    $$('.Qixian-bind-rnm').forEach(el => el.textContent = rightName);
    $('.Qixian-jset-lnm').value = leftName;
    $('.Qixian-jset-rnm').value = rightName;

    const leftAv = resolveAvatar(true);
    const rightAv = resolveAvatar(false);
    if (leftAv) {
      $$('.Qixian-bind-lav, .Qixian-bind-lav-bg').forEach(el => {
        el.style.backgroundImage = `url('${leftAv}')`;
      });
    }
    if (rightAv) {
      $$('.Qixian-bind-rav, .Qixian-bind-rav-bg').forEach(el => {
        el.style.backgroundImage = `url('${rightAv}')`;
      });
    }
  }

  // 时间工具
  function nowTime() {
    const d = new Date();
    return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  }

  // 音效
  let actx = null;
  function getCtx() {
    if(!actx) try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
    return actx;
  }
  function playSwoosh() {
    const c = getCtx(); if(!c) return;
    try {
      if(c.state === 'suspended') c.resume();
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(600, c.currentTime);
      o.frequency.exponentialRampToValueAtTime(1200, c.currentTime + 0.1);
      g.gain.setValueAtTime(0, c.currentTime);
      g.gain.linearRampToValueAtTime(0.2, c.currentTime + 0.05);
      g.gain.linearRampToValueAtTime(0, c.currentTime + 0.1);
      o.connect(g); g.connect(c.destination);
      o.start(); o.stop(c.currentTime + 0.1);
    } catch(e){}
  }

  // 完整铃声地址
  const customRingUrl = 'https://img.tofaka.com/autoupload/fr/FEa8MSJpCzGxfJi7iutvFIt1IPL8766yrPDdOXw-v_Gyl5f0KlZfm6UsKj-HyTuv/20260710/p0sY/fbeb6ae52fc3e760622f341158564a53.mp3';
  let callRingMp3 = null;
  try { callRingMp3 = new window.parent.Audio(customRingUrl); callRingMp3.loop = true; }
  catch(e) { callRingMp3 = new Audio(customRingUrl); callRingMp3.loop = true; }
  function playRing() { if(callRingMp3) callRingMp3.play().catch(()=>{}); }
  function stopRing() { if(callRingMp3) { callRingMp3.pause(); callRingMp3.currentTime = 0; } }

  // 系统消息
  function renderSysMsg(text) {
    const chatEl = $('.Qixian-jchat');
    const m = document.createElement('div');
    m.className = 'Qixian-sys-msg';
    m.innerHTML = text;
    chatEl.appendChild(m);
    setTimeout(() => chatEl.scrollTop = chatEl.scrollHeight, 60);
  }

  // 追加消息（核心公开方法）
  function appendMessage(side, text, options = {}) {
    const chatEl = $('.Qixian-jchat');
    const row = document.createElement('div');
    const msgId = ++activeMsgId;
    row.className = `Qixian-row ${side}`;
    row.dataset.msgId = msgId;
    msgMap[msgId] = { side, text, revoked: false };

    const avatarClass = side === 'left' ? 'Qixian-lav Qixian-bind-lav' : 'Qixian-rav Qixian-bind-rav';
    const hasError = (side === 'left' && blockLeft) || (side === 'right' && blockRight);
    if (hasError) row.classList.add('has-err');

    let quoteHtml = '';
    if (options.replyId && msgMap[options.replyId]) {
      const replyText = msgMap[options.replyId].text;
      quoteHtml = `<div class="Qixian-quote-box">${replyText.slice(0, 50)}</div>`;
    }

    row.innerHTML = `
      <div class="${avatarClass}"></div>
      <div class="Qixian-ct">
        ${quoteHtml}
        <div class="Qixian-bub">${text}</div>
        <div class="Qixian-meta">${nowTime()} <span class="Qixian-tick">✓✓</span></div>
      </div>
      <div class="Qixian-err-icon" title="消息已被拦截">!</div>
    `;

    // 右键菜单
    row.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      activeMsgId = msgId;
      $('.Qixian-jact-revoke').style.display = side === 'right' ? 'block' : 'none';
      $('.Qixian-jmsgact').classList.add('show');
    });

    // 双击撤回
    row.addEventListener('dblclick', () => {
      if (side === 'right') revokeMessage(msgId);
    });

    chatEl.appendChild(row);
    chatEl.scrollTop = chatEl.scrollHeight;
    return msgId;
  }

  // 撤回消息
  function revokeMessage(msgId) {
    const row = scope.querySelector(`[data-msg-id="${msgId}"]`);
    if (!row || !msgMap[msgId]) return;
    msgMap[msgId].revoked = true;
    const m = document.createElement('div');
    m.className = 'Qixian-sys-msg';
    m.innerHTML = `${rightName} 撤回了一条消息 <span class="Qixian-view-rev" data-txt="${msgMap[msgId].text.replace(/"/g, '&quot;')}">重新编辑</span>`;
    row.parentNode.replaceChild(m, row);
    appendCmd(`$[撤回:${rightName}|${msgMap[msgId].text}]`);
  }

  // ========== 主屏幕与电话应用 ==========
  const homeScreen = $('.Qixian-jhome');
  const appPanel = $('.Qixian-japp-panel');
  const phoneContent = $('#phone-content');

  let phoneContacts = [
    { id: '1', name: leftName, phone: '13800138000' },
    { id: '2', name: rightName + ' (我)', phone: '13900139000' }
  ];
  let phoneHistory = [];

  // 状态栏时间
  setInterval(() => {
    const t = $('.Qixian-jhome-time');
    if(t) {
      const d = new Date();
      t.textContent = String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
    }
  }, 1000);

  // 便签功能
  const stickyTxt = $('.Qixian-jsticky-txt');
  const stickyBtn = $('.Qixian-jsticky-save');
  if (stickyTxt && stickyBtn) {
    const saved = QxStore.get('Qx-sticky-note');
    if(saved) stickyTxt.value = saved;
    stickyBtn.addEventListener('click', () => {
      QxStore.set('Qx-sticky-note', stickyTxt.value);
      playSwoosh();
      appendCmd(`$[更新便签:${stickyTxt.value}]`);
      renderSysMsg('主界面便签已更新并同步');
      stickyTxt.blur();
    });
  }

  // 界面导航
  $('.Qixian-jhd-back').addEventListener('click', () => homeScreen.classList.add('active'));
  $('#app-wechat').addEventListener('click', () => homeScreen.classList.remove('active'));
  $('.Qixian-japp-back').addEventListener('click', () => appPanel.classList.remove('show'));

  $('#app-phone').addEventListener('click', () => {
    appPanel.classList.add('show');
    renderPhoneTab('recents');
  });

  $$('.Qixian-ptab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.Qixian-ptab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderPhoneTab(tab.getAttribute('data-target'));
    });
  });

  function renderPhoneTab(type) {
    phoneContent.innerHTML = '';
    if(type === 'recents') {
      if(phoneHistory.length === 0) {
        phoneContent.innerHTML = '<div style="text-align:center;padding-top:100px;color:#aaa;font-size:14px;">暂无通话记录</div>';
      } else {
        let html = '';
        phoneHistory.forEach(h => {
          html += `<div class="Qixian-list-item">
            <div>
              <div class="Qixian-item-title" style="color:${h.type==='out'?'#222':'#555'};">${h.name}</div>
              <div class="Qixian-item-sub">手机 - ${h.time}</div>
            </div>
            <div class="Qixian-item-arrow"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
          </div>`;
        });
        phoneContent.innerHTML = html;
      }
    } else if(type === 'contacts') {
      let html = '';
      phoneContacts.forEach((c, i) => {
        html += `<div class="Qixian-list-item j-contact" data-idx="${i}"><div class="Qixian-item-title">${c.name}</div></div>`;
      });
      phoneContent.innerHTML = html;
      $$('.j-contact').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.getAttribute('data-idx'));
          renderContactDetail(phoneContacts[idx], idx);
        });
      });
    } else if(type === 'dialpad') {
      let html = `<div style="text-align:center;font-size:32px;font-weight:300;margin:30px 0 20px;height:40px;letter-spacing:2px;color:#222;" id="dial-disp"></div>
        <div class="Qixian-dial-grid">`;
      ['1','2','3','4','5','6','7','8','9','*','0','#'].forEach(k => {
        html += `<div class="Qixian-dial-key">${k}</div>`;
      });
      html += `</div><div class="Qixian-dial-callbtn"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>`;
      phoneContent.innerHTML = html;
      const ddisp = $('#dial-disp');
      $$('.Qixian-dial-key').forEach(el => {
        el.addEventListener('click', () => { ddisp.textContent += el.textContent; playSwoosh(); });
      });
      $('.Qixian-dial-callbtn').addEventListener('click', () => {
        const num = ddisp.textContent;
        if(!num) return;
        const match = phoneContacts.find(c => c.phone === num);
        triggerCall(match ? match.name : num, num);
      });
    }
  }

  function renderContactDetail(contact, idx) {
    const letter = contact.name.charAt(0).toUpperCase();
    phoneContent.innerHTML = `
      <div class="Qixian-contact-detail">
        <div class="Qixian-c-av-wrap"><div class="Qixian-c-av">${letter}</div></div>
        <div class="Qixian-c-input-grp"><label>姓名</label><input type="text" class="Qixian-c-input" id="c-edit-name" value="${contact.name}"></div>
        <div class="Qixian-c-input-grp"><label>手机号</label><input type="text" class="Qixian-c-input" id="c-edit-phone" value="${contact.phone}"></div>
        <div class="Qixian-c-btns">
          <button class="Qixian-c-btn save j-c-save">保存</button>
          <button class="Qixian-c-btn call j-c-call">呼叫</button>
        </div>
      </div>`;
    $('.j-c-save').addEventListener('click', () => {
      const nn = $('#c-edit-name').value.trim();
      const np = $('#c-edit-phone').value.trim();
      if(nn && np) {
        phoneContacts[idx].name = nn;
        phoneContacts[idx].phone = np;
        playSwoosh();
        renderPhoneTab('contacts');
      }
    });
    $('.j-c-call').addEventListener('click', () => triggerCall(contact.name, contact.phone));
  }

  function triggerCall(name, num) {
    phoneHistory.unshift({ name, phone: num, time: nowTime(), type: 'out' });
    appPanel.classList.remove('show');
    homeScreen.classList.remove('active');
    openCallUI('voice', 'out');
    appendCmd(blockRight ? '$[呼叫失败，拒收]' : '$[呼叫:语音通话]');
  }

  // ========== 顶部栏与设置 ==========
  $('.Qixian-jhd-toggle').addEventListener('click', () => {
    $('.Qixian-jhd').classList.toggle('collapsed');
    $('.Qixian-jchat').classList.toggle('collapsed');
  });

  $('.Qixian-jset-open').addEventListener('click', () => $('.Qixian-jset').classList.add('show'));
  $('.Qixian-jset-close').addEventListener('click', () => $('.Qixian-jset').classList.remove('show'));

  // 颜色自定义
  const colorMap = [
    { id: 'Qx-wrap', v: '--wrap-bg' }, { id: 'Qx-hdr', v: '--hdr-bg' }, { id: 'Qx-pull', v: '--pull-bg' },
    { id: 'Qx-wv', v: '--wv-bg' }, { id: 'Qx-card', v: '--card-bg' }, { id: 'Qx-ftr', v: '--ftr-bg' },
    { id: 'Qx-bub', v: '--bub-r' }, { id: 'Qx-bubl', v: '--bub-l' }, { id: 'Qx-tm', v: '--txt-main' },
    { id: 'Qx-cdt', v: '--card-txt' }, { id: 'Qx-cic', v: '--card-ic' }, { id: 'Qx-hdt', v: '--hdr-txt' },
    { id: 'Qx-hdi', v: '--hdr-ic' }, { id: 'Qx-sys', v: '--sys-txt' }, { id: 'Qx-cbubl', v: '--call-bub-l' },
    { id: 'Qx-cbub', v: '--call-bub-r' }, { id: 'Qx-cbtxt', v: '--call-bub-txt' }
  ];
  const root = $('.Qixian-root');
  colorMap.forEach(c => {
    const picker = $('#' + c.id);
    const txtInp = $('#' + c.id + '-txt');
    if(!picker || !txtInp) return;
    const saved = QxStore.get(c.id);
    if(saved) {
      root.style.setProperty(c.v, saved, 'important');
      picker.value = saved.length === 7 ? saved : '#ffffff';
      txtInp.value = saved;
    }
    picker.addEventListener('input', () => {
      root.style.setProperty(c.v, picker.value, 'important');
      txtInp.value = picker.value;
      QxStore.set(c.id, picker.value);
    });
    txtInp.addEventListener('change', () => {
      if(/^#[0-9A-Fa-f]{6}$/.test(txtInp.value.trim())) {
        root.style.setProperty(c.v, txtInp.value.trim(), 'important');
        picker.value = txtInp.value.trim();
        QxStore.set(c.id, txtInp.value.trim());
      } else {
        txtInp.value = QxStore.get(c.id) || '#ffffff';
      }
    });
  });

  // 头像形状
  const btnRnd = $('.Qixian-jav-rnd'), btnSq = $('.Qixian-jav-sq');
  if(QxStore.get('Qx-av-shape') === 'sq') {
    root.classList.add('av-sq');
    btnRnd.classList.remove('active');
    btnSq.classList.add('active');
  }
  btnRnd.addEventListener('click', () => {
    root.classList.remove('av-sq'); btnRnd.classList.add('active'); btnSq.classList.remove('active');
    QxStore.set('Qx-av-shape', 'rnd');
  });
  btnSq.addEventListener('click', () => {
    root.classList.add('av-sq'); btnSq.classList.add('active'); btnRnd.classList.remove('active');
    QxStore.set('Qx-av-shape', 'sq');
  });

  // 毛玻璃/实色
  const btnGlass = $('.Qixian-jglass-glass'), btnSolid = $('.Qixian-jglass-solid');
  if(QxStore.get('Qx-glass-mode') === 'solid') {
    root.classList.add('solid-mode');
    btnGlass.classList.remove('active');
    btnSolid.classList.add('active');
  }
  btnGlass.addEventListener('click', () => {
    root.classList.remove('solid-mode'); btnGlass.classList.add('active'); btnSolid.classList.remove('active');
    QxStore.set('Qx-glass-mode', 'glass');
  });
  btnSolid.addEventListener('click', () => {
    root.classList.add('solid-mode'); btnSolid.classList.add('active'); btnGlass.classList.remove('active');
    QxStore.set('Qx-glass-mode', 'solid');
  });

  // 背景上传
  $('.Qixian-jbg-upload').addEventListener('click', () => {
    const fileInp = document.createElement('input');
    fileInp.type = 'file';
    fileInp.accept = 'image/*';
    fileInp.onchange = e => {
      const f = e.target.files[0]; if(!f) return;
      const reader = new FileReader();
      reader.onload = re => {
        const b64 = re.target.result;
        QxStore.set('Qx-bg-img', b64);
        $$('.Qixian-jbg, .Qixian-jhome').forEach(el => el.style.backgroundImage = `url('${b64}')`);
      };
      reader.readAsDataURL(f);
    };
    fileInp.click();
  });
  $('.Qixian-jbg-clear').addEventListener('click', () => {
    QxStore.set('Qx-bg-img', 'none');
    $$('.Qixian-jbg, .Qixian-jhome').forEach(el => el.style.backgroundImage = 'none');
  });

  // 名称设置
  $('.Qixian-jset-lnm').addEventListener('input', e => {
    $$('.Qixian-bind-lnm').forEach(el => el.textContent = e.target.value || '对方');
  });
  $('.Qixian-jset-rnm').addEventListener('input', e => {
    $$('.Qixian-bind-rnm').forEach(el => el.textContent = e.target.value || '我');
  });

  // 拉黑拦截
  $('.Qixian-jblk-l').addEventListener('click', function() {
    blockLeft = !blockLeft;
    this.classList.toggle('active', blockLeft);
    renderSysMsg(blockLeft ? `已被 ${leftName} 拉入黑名单` : `已移出黑名单`);
  });
  $('.Qixian-jblk-r').addEventListener('click', function() {
    blockRight = !blockRight;
    this.classList.toggle('active', blockRight);
    renderSysMsg(blockRight ? `已将 ${leftName} 加入黑名单` : `已将 ${leftName} 移出黑名单`);
  });

  // 拍一拍
  let curPatTarget = 'left';
  $('.Qixian-jpat-l').addEventListener('click', e => {
    if(e.target.classList.contains('Qixian-uav')) {
      curPatTarget = 'left';
      $('.Qixian-jpatin').value = leftPat;
      $('.Qixian-jpatmodal').classList.add('show');
    }
  });
  $('.Qixian-jpat-r').addEventListener('click', e => {
    if(e.target.classList.contains('Qixian-uav')) {
      curPatTarget = 'right';
      $('.Qixian-jpatin').value = rightPat;
      $('.Qixian-jpatmodal').classList.add('show');
    }
  });
  $('.Qixian-jpatcancel').addEventListener('click', () => $('.Qixian-jpatmodal').classList.remove('show'));
  $('.Qixian-jpatok').addEventListener('click', () => {
    const val = $('.Qixian-jpatin').value.trim() || '的肩膀';
    if(curPatTarget === 'left') { leftPat = val; appendCmd(`$[${leftName} 的拍一拍后缀设为:${val}]`); }
    else { rightPat = val; appendCmd(`$[${rightName} 的拍一拍后缀设为:${val}]`); }
    $('.Qixian-jpatmodal').classList.remove('show');
  });

  // 双击头像拍一拍
  let lastClickTime = 0, lastClickTarget = null;
  $('.Qixian-jchat').addEventListener('click', e => {
    const isLav = e.target.closest('.Qixian-lav, .Qixian-bind-lav');
    const isRav = e.target.closest('.Qixian-rav, .Qixian-bind-rav');
    const now = Date.now();
    if ((isLav || isRav) && now - lastClickTime < 300 && lastClickTarget === e.target) {
      if(isLav) {
        renderSysMsg(`${rightName} 拍了拍 ${leftName} ${leftPat}`);
        appendCmd(`$[拍一拍:${rightName} 拍了拍 ${leftName} ${leftPat}]`);
      } else {
        renderSysMsg(`${rightName} 拍了拍自己 ${rightPat}`);
        appendCmd(`$[拍一拍:${rightName} 拍了拍自己 ${rightPat}]`);
      }
      lastClickTime = 0;
      return;
    }
    lastClickTime = now;
    lastClickTarget = e.target;
  });

  // ========== 通话系统 ==========
  let callIntv = null, callSec = 0, callState = 'none';
  function formatTime(sec) {
    const m = String(Math.floor(sec/60)).padStart(2,'0');
    const s = String(sec%60).padStart(2,'0');
    return m+':'+s;
  }

  function openCallUI(type, state) {
    const c = $('.Qixian-jcall');
    c.className = `Qixian-call Qixian-jcall show state-${state} ${type==='video' ? 'video' : ''}`;
    callSec = 0; callState = state; clearInterval(callIntv);
    $('.Qixian-jpanel').classList.remove('show');
    $('.Qixian-jplus').classList.remove('on');
    if(state === 'in') playRing();
  }

  function setActiveCall() {
    if(callState === 'active') return;
    callState = 'active'; stopRing();
    const c = $('.Qixian-jcall');
    c.classList.remove('state-in', 'state-out', 'minimized');
    c.classList.add('active', 'show');
    $('.Qixian-jcall-timer').textContent = '00:00';
    callSec = 0; clearInterval(callIntv);
    callIntv = setInterval(() => {
      callSec++;
      $('.Qixian-jcall-timer').textContent = formatTime(callSec);
    }, 1000);
  }

  function closeCall() {
    stopRing(); clearInterval(callIntv);
    $('.Qixian-jcall').classList.remove('show', 'active', 'state-in', 'state-out', 'video', 'minimized');
    callState = 'none';
  }

  function addCallBubble(dir, text) {
    const wrap = document.createElement('div');
    wrap.className = `Qixian-cb-wrap ${dir}`;
    const bub = document.createElement('div');
    bub.className = 'Qixian-cb';
    bub.textContent = text;
    wrap.appendChild(bub);
    $('.Qixian-jcall-bubs').appendChild(wrap);
    $('.Qixian-jcall-bubs').scrollTop = $('.Qixian-jcall-bubs').scrollHeight;
  }

  // 通话按钮
  $('.Qixian-jbtn-voice').addEventListener('click', () => {
    openCallUI('voice', 'out');
    appendCmd(blockRight ? '$[呼叫失败，拒收]' : '$[呼叫:语音通话]');
  });
  $('.Qixian-jbtn-video').addEventListener('click', () => {
    openCallUI('video', 'out');
    appendCmd(blockRight ? '$[呼叫失败，拒收]' : '$[呼叫:视频通话]');
  });
  $('.Qixian-jcall-cancel').addEventListener('click', e => {
    e.stopPropagation(); closeCall(); appendCmd('$[挂断通话]');
  });
  $('.Qixian-jcall-answer').addEventListener('click', e => {
    e.stopPropagation(); setActiveCall(); appendCmd('$[接听通话]');
  });
  $('.Qixian-jcall-reject').addEventListener('click', e => {
    e.stopPropagation();
    closeCall();
    appendMessage('right', '<div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:18px;display:flex;align-items:center;justify-content:center;color:#666;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><span style="font-size:13px;color:#333;">已拒绝</span></div>', false);
    appendCmd('$[拒绝通话]');
  });
  $('.Qixian-jcall-end').addEventListener('click', e => {
    e.stopPropagation();
    const dur = formatTime(callSec);
    closeCall();
    appendCmd(`$[挂断通话:${dur}]`);
  });
  $('.Qixian-jcall-send').addEventListener('click', () => {
    const t = $('.Qixian-jcall-in').value.trim();
    if(!t) return;
    const isVid = $('.Qixian-jcall').classList.contains('video');
    addCallBubble('right', t);
    playSwoosh();
    appendCmd(isVid ? `$[视频:${t}]` : `$[通话:${t}]`);
    $('.Qixian-jcall-in').value = '';
  });

  // 通话悬浮窗拖拽
  const callDrag = $('.Qixian-jcall');
  let cDragging = false, cStartX = 0, cStartY = 0, cOffX = 0, cOffY = 0;
  function cDragStart(e) {
    if (!callDrag.classList.contains('minimized')) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    cStartX = cx - cOffX; cStartY = cy - cOffY;
    cDragging = true;
  }
  function cDragMove(e) {
    if (!cDragging) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    cOffX = cx - cStartX; cOffY = cy - cStartY;
    callDrag.style.transform = `translate(${cOffX}px, ${cOffY}px)`;
  }
  function cDragEnd() { cDragging = false; }
  callDrag.addEventListener('mousedown', cDragStart);
  document.addEventListener('mousemove', cDragMove);
  document.addEventListener('mouseup', cDragEnd);
  callDrag.addEventListener('touchstart', cDragStart, {passive: false});
  document.addEventListener('touchmove', cDragMove, {passive: false});
  document.addEventListener('touchend', cDragEnd);

  callDrag.addEventListener('click', e => {
    if(callDrag.classList.contains('minimized') && !cDragging) {
      callDrag.classList.remove('minimized');
      cOffX = 0; cOffY = 0;
      callDrag.style.transform = 'none';
    }
  });
  $('.Qixian-jcall-mini-top').addEventListener('click', e => {
    e.stopPropagation();
    $('.Qixian-jcall').classList.add('minimized');
  });

  // ========== 输入框与加号面板 ==========
  const textInput = $('.Qixian-jinput');
  const sendBtn = $('.Qixian-jsend');
  const plusBtn = $('.Qixian-jplus');
  const panel = $('.Qixian-jpanel');

  function sendText() {
    const v = textInput.value.trim();
    if(!v) return;
    appendMessage('right', v);
    appendCmd(blockRight ? '$[消息被拒收]' : `${rightName} | ${v}`);
    textInput.value = '';
    playSwoosh();
  }
  sendBtn.addEventListener('click', sendText);
  textInput.addEventListener('keydown', e => {
    if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); }
  });

  plusBtn.addEventListener('click', () => {
    plusBtn.classList.toggle('on');
    panel.classList.toggle('show');
  });

  function openModal(sel) {
    $$('.Qixian-mf, .Qixian-cen').forEach(el => el.classList.remove('show'));
    $(sel).classList.add('show');
    panel.classList.remove('show');
    plusBtn.classList.remove('on');
  }

  // 各功能入口
  $('.Qixian-jgiftbtn').addEventListener('click', () => openModal('.Qixian-jgiftmodal'));
  $('.Qixian-jlinkbtn').addEventListener('click', () => openModal('.Qixian-jlinkmodal'));
  $('.Qixian-jtf').addEventListener('click', () => openModal('.Qixian-jtfmodal'));
  $('.Qixian-jemo').addEventListener('click', () => openModal('.Qixian-jemomodal'));
  $('.Qixian-jmusic').addEventListener('click', () => openModal('.Qixian-jmumodal'));
  $('.Qixian-jcp').addEventListener('click', () => openModal('.Qixian-jcpmodal'));
  $('.Qixian-jtxtimg').addEventListener('click', () => openModal('.Qixian-jtxtimgmodal'));
  $('.Qixian-jimgbtn').addEventListener('click', () => openModal('.Qixian-jimgmodal'));
  $('.Qixian-jbtn-loc').addEventListener('click', () => openModal('.Qixian-jlocmodal'));
  $('.Qixian-jbtn-food').addEventListener('click', () => openModal('.Qixian-jfoodmodal'));
  $('.Qixian-jbtn-draw').addEventListener('click', () => openModal('.Qixian-jdrawmodal'));

  // 关闭所有弹窗
  $$('.Qixian-jgiftcancel, .Qixian-jlinkcancel, .Qixian-jtfcancel, .Qixian-jimgcancel, .Qixian-jtxtimgcancel, .Qixian-jfoodcancel, .Qixian-jlocincancel, .Qixian-jdrawcancel, .Qixian-jvoicecancel, .Qixian-jaddemocancel, .Qixian-jaddfcancel, .Qixian-jtfact-cancel, .Qixian-jact-cancel, .Qixian-jviewclose').forEach(el => {
    el.addEventListener('click', () => {
      el.closest('.Qixian-mf, .Qixian-cen').classList.remove('show');
    });
  });

  // 礼物
  $('.Qixian-jgiftok').addEventListener('click', () => {
    const pr = $('.Qixian-jgiftpr').value || '0';
    const desc = $('.Qixian-jgiftdesc').value || '精美礼物';
    const note = $('.Qixian-jgiftnote').value || '';
    appendMessage('right', `
      <div class="Qixian-link-card Qixian-gift-card">
        <div class="Qixian-link-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg></div>
        <div class="Qixian-tf-info">
          <div class="Qixian-tf-t">${desc}</div>
          <div class="Qixian-tf-a">¥ ${parseFloat(pr).toFixed(2)}${note ? ' - ' + note : ''}</div>
        </div>
      </div>`, true);
    playSwoosh();
    appendCmd(blockRight ? '$[发送失败]' : `$[礼物:${pr}|${desc}|${note}]`);
    $('.Qixian-jgiftmodal').classList.remove('show');
    $('.Qixian-jgiftpr').value = '';
    $('.Qixian-jgiftdesc').value = '';
    $('.Qixian-jgiftnote').value = '';
  });

  // 链接
  $('.Qixian-jlinkok').addEventListener('click', () => {
    const url = $('.Qixian-jlinkurl').value.trim();
    const title = $('.Qixian-jlinktitle').value.trim() || '网页链接';
    if(!url) return;
    appendMessage('right', `
      <a href="javascript:;" class="Qixian-link-card">
        <div class="Qixian-link-ic"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
        <div class="Qixian-tf-info">
          <div class="Qixian-tf-t">${title}</div>
          <div class="Qixian-tf-a">${url}</div>
        </div>
      </a>`, true);
    playSwoosh();
    appendCmd(blockRight ? '$[发送失败]' : `$[链接分享:${title}|${url}]`);
    $('.Qixian-jlinkmodal').classList.remove('show');
    $('.Qixian-jlinkurl').value = '';
    $('.Qixian-jlinktitle').value = '';
  });

  // 转账
  $('.Qixian-jtfok').addEventListener('click', () => {
    const amt = $('.Qixian-jtfamt').value;
    const title = $('.Qixian-jtftitle').value || '转账';
    if(amt <= 0) return;
    appendMessage('right', `
      <div class="Qixian-tf Qixian-j-pure-tf" data-amt="${parseFloat(amt).toFixed(2)}">
        <div class="Qixian-tf-ic">¥</div>
        <div class="Qixian-tf-info">
          <div class="Qixian-tf-t">${title}</div>
          <div class="Qixian-tf-a">¥ ${parseFloat(amt).toFixed(2)}</div>
          <div class="Qixian-tf-f">微信转账</div>
        </div>
      </div>`, true);
    playSwoosh();
    appendCmd(blockRight ? '$[发送失败]' : `$[转账:${parseFloat(amt).toFixed(2)}:${title}]`);
    $('.Qixian-jtfmodal').classList.remove('show');
    $('.Qixian-jtfamt').value = '';
    $('.Qixian-jtftitle').value = '';
  });

  // 转账操作弹窗
  let targetTfNode = null;
  $('.Qixian-jchat').addEventListener('click', e => {
    const tf = e.target.closest('.Qixian-j-pure-tf');
    if(tf && !tf.classList.contains('got') && !tf.classList.contains('returned')) {
      targetTfNode = tf;
      $('.Qixian-jtfactmodal').classList.add('show');
    }
  });
  $('.Qixian-jtfact-receive').addEventListener('click', () => {
    if(targetTfNode) {
      targetTfNode.classList.add('got');
      targetTfNode.querySelector('.Qixian-tf-t').textContent = '已收款';
      const amt = targetTfNode.getAttribute('data-amt') || '0.00';
      appendCmd(`$[收款:${amt}]`);
      playSwoosh();
    }
    $('.Qixian-jtfactmodal').classList.remove('show');
  });
  $('.Qixian-jtfact-return').addEventListener('click', () => {
    if(targetTfNode) {
      targetTfNode.classList.add('returned');
      targetTfNode.querySelector('.Qixian-tf-t').textContent = '已退回';
      const amt = targetTfNode.getAttribute('data-amt') || '0.00';
      appendCmd(`$[退回:${amt}]`);
      playSwoosh();
    }
    $('.Qixian-jtfactmodal').classList.remove('show');
  });

  // 图片
  $('.Qixian-jimgok').addEventListener('click', () => {
    const url = $('.Qixian-jimgurl').value.trim();
    const desc = $('.Qixian-jimgdesc').value.trim() || '图片';
    if(!url) return;
    appendMessage('right', `<img src="${url}" class="Qixian-img" alt="${desc}">`, true);
    playSwoosh();
    appendCmd(blockRight ? '$[发送失败]' : `$[图:${url}|${desc}]`);
    $('.Qixian-jimgmodal').classList.remove('show');
    $('.Qixian-jimgurl').value = '';
    $('.Qixian-jimgdesc').value = '';
  });

  // 文字图
  $('.Qixian-jtxtimgok').addEventListener('click', () => {
    const txt = $('.Qixian-jtxtimgin').value.trim();
    if(!txt) return;
    appendMessage('right', `<div class="Qixian-txt-img">${txt}</div>`, true);
    playSwoosh();
    appendCmd(blockRight ? '$[发送失败]' : `$[文图:${txt}]`);
    $('.Qixian-jtxtimgmodal').classList.remove('show');
    $('.Qixian-jtxtimgin').value = '';
  });

  // 外卖
  $('.Qixian-jfoodok').addEventListener('click', () => {
    const shop = $('.Qixian-jfoodshop').value.trim() || '外卖派送';
    const items = $('.Qixian-jfooditems').value.trim() || '神秘大餐';
    const addr = $('.Qixian-jfoodaddr').value.trim() || '默认地址';
    appendMessage('right', `
      <div class="Qixian-tf Qixian-food-card">
        <div class="Qixian-food-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg></div>
        <div class="Qixian-tf-info">
          <div class="Qixian-tf-t">${shop}</div>
          <div class="Qixian-tf-a">${items}</div>
          <div class="Qixian-tf-f">${addr}</div>
        </div>
      </div>`, true);
    playSwoosh();
    appendCmd(blockRight ? '$[发送失败]' : `$[外卖订单:${shop}|${items}|${addr}]`);
    $('.Qixian-jfoodmodal').classList.remove('show');
  });

  // 位置
  $('.Qixian-jlocsend').addEventListener('click', () => openModal('.Qixian-jlocinputmodal'));
  $('.Qixian-jlocinok').addEventListener('click', () => {
    const pos = $('.Qixian-jlocin-pos').value.trim() || '我的位置';
    const dist = $('.Qixian-jlocin-dist').value.trim() || '未知距离';
    appendMessage('right', `
      <div class="Qixian-tf Qixian-loc-card">
        <div class="Qixian-link-ic" style="border-radius:50%;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
        <div class="Qixian-tf-info">
          <div class="Qixian-tf-t">${pos}</div>
          <div class="Qixian-tf-a">${dist.includes('距离') ? dist : '距离 ' + dist}</div>
        </div>
      </div>`, true);
    playSwoosh();
    appendCmd(blockRight ? '$[发送失败]' : `$[定位分享:${pos}|${dist}]`);
    $('.Qixian-jlocinputmodal').classList.remove('show');
    $('.Qixian-jlocmodal').classList.remove('show');
  });

  // ========== 手绘涂鸦 ==========
  const drawCanvas = $('.Qixian-jdrawcanvas');
  const drawCtx = drawCanvas.getContext('2d');
  let isDrawing = false, drawLastX = 0, drawLastY = 0, isEraser = false;
  let drawHistory = [];

  function resetDrawBoard() {
    drawCtx.globalCompositeOperation = 'source-over';
    drawCtx.fillStyle = '#ffffff';
    drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
    drawHistory = [];
  }
  function saveDrawState() {
    drawHistory.push(drawCanvas.toDataURL());
    if(drawHistory.length > 20) drawHistory.shift();
  }
  function getDrawPos(e) {
    const r = drawCanvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: cx - r.left, y: cy - r.top };
  }
  function startDraw(e) {
    e.preventDefault();
    isDrawing = true;
    saveDrawState();
    const p = getDrawPos(e);
    drawLastX = p.x; drawLastY = p.y;
  }
  function runDraw(e) {
    if(!isDrawing) return;
    e.preventDefault();
    const p = getDrawPos(e);
    drawCtx.beginPath();
    drawCtx.moveTo(drawLastX, drawLastY);
    drawCtx.lineTo(p.x, p.y);
    drawCtx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
    drawCtx.strokeStyle = $('.Qixian-jdrawcolor').value;
    drawCtx.lineWidth = isEraser ? Math.max(10, $('.Qixian-jdrawwidth').value * 2) : $('.Qixian-jdrawwidth').value;
    drawCtx.lineCap = 'round';
    drawCtx.lineJoin = 'round';
    drawCtx.stroke();
    drawLastX = p.x; drawLastY = p.y;
  }
  function stopDraw(e) { e.preventDefault(); isDrawing = false; }

  drawCanvas.addEventListener('mousedown', startDraw);
  drawCanvas.addEventListener('mousemove', runDraw);
  drawCanvas.addEventListener('mouseup', stopDraw);
  drawCanvas.addEventListener('mouseout', stopDraw);
  drawCanvas.addEventListener('touchstart', startDraw, {passive: false});
  drawCanvas.addEventListener('touchmove', runDraw, {passive: false});
  drawCanvas.addEventListener('touchend', stopDraw);

  $('.Qixian-jdrawclear').addEventListener('click', resetDrawBoard);
  $('.Qixian-jdrawundo').addEventListener('click', () => {
    if(drawHistory.length > 0) {
      const img = new Image();
      img.src = drawHistory.pop();
      img.onload = () => {
        drawCtx.globalCompositeOperation = 'source-over';
        drawCtx.clearRect(0,0,drawCanvas.width,drawCanvas.height);
        drawCtx.drawImage(img,0,0);
      };
    } else resetDrawBoard();
  });
  $('.Qixian-jdraweraser').addEventListener('click', function() {
    isEraser = !isEraser;
    this.style.background = isEraser ? '#eeeeee' : '';
  });
  $('.Qixian-jdrawok').addEventListener('click', () => {
    drawCtx.globalCompositeOperation = 'source-over';
    const b64 = drawCanvas.toDataURL('image/jpeg', 0.6);
    const shortId = 'local-draw-' + Date.now();
    try { QxStore.set('Qx-' + shortId, b64); } catch(e){}
    appendMessage('right', `<img src="${b64}" class="Qixian-img" alt="手绘涂鸦">`, true);
    playSwoosh();
    appendCmd(blockRight ? '$[发送失败]' : `$[图:${shortId}|手绘涂鸦]`);
    $('.Qixian-jdrawmodal').classList.remove('show');
  });

  // ========== 表情包 ==========
  const baseEmojiArr = [
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/14bc30cf3153af0f.png', t: '不乘打屁屁咯' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/f28c9fdf5230efc0.png', t: '你也很为我着迷吧' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/603a9d2dd3ba1db1.png', t: '偶哭叻，你满意了吧' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/56d88bd75de484f0.png', t: '电你，在心跳吗' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/26/a2350084ec1eb9e1.jpg', t: '我要吃软饭' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/26/9638432efdd2a0dc.png', t: '哞哞哒' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/26/1a553718ed2b2347.png', t: '这个世界有问题' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/27/b68c231476fd9735.png', t: '愿意做我的坏坏臭宝贝吗' }
  ];
  let customEmoArr = [];
  try { customEmoArr = JSON.parse(QxStore.get('Qx-custom-emos') || '[]'); } catch(e){}

  function renderEmoList() {
    const all = customEmoArr.concat(baseEmojiArr);
    $('.Qixian-jemolist').innerHTML = all.map(x => 
      `<div class="Qixian-emo-card" data-url="${x.i}" data-txt="${x.t}">
        <img class="Qixian-emo-img" src="${x.i}">
        <div class="Qixian-emo-t">${x.t}</div>
      </div>`
    ).join('');
    $$('.Qixian-emo-card').forEach(c => {
      c.addEventListener('click', () => {
        appendMessage('right', `<img src="${c.getAttribute('data-url')}" class="Qixian-img" alt="${c.getAttribute('data-txt')}">`, true);
        playSwoosh();
        appendCmd(blockRight ? '$[发送失败]' : `![${c.getAttribute('data-txt')}](${c.getAttribute('data-url')})`);
        $('.Qixian-jemomodal').classList.remove('show');
      });
    });
  }
  renderEmoList();

  $('.Qixian-jaddemobtn').addEventListener('click', () => {
    $('.Qixian-jemomodal').classList.remove('show');
    $('.Qixian-jaddemomodal').classList.add('show');
  });
  $('.Qixian-jaddemook').addEventListener('click', () => {
    const u = $('.Qixian-jaddemourl').value.trim();
    const t = $('.Qixian-jaddemotxt').value.trim() || '自定义表情';
    if(u) {
      customEmoArr.unshift({i:u, t:t});
      QxStore.set('Qx-custom-emos', JSON.stringify(customEmoArr));
      renderEmoList();
      $('.Qixian-jaddemourl').value = '';
      $('.Qixian-jaddemotxt').value = '';
    }
    $('.Qixian-jaddemomodal').classList.remove('show');
    $('.Qixian-jemomodal').classList.add('show');
  });

  // 互动游戏
  $('.jemo-poke').addEventListener('click', () => {
    appendMessage('right', `<div class="Qixian-interact-item Qixian-anim-poke"><svg viewBox="0 0 24 24"><path d="M11 2a2 2 0 0 0-2 2v5H6a2 2 0 0 0-2 2v2c0 4.4 3.6 8 8 8h3a5 5 0 0 0 5-5v-6a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2z"/></svg></div>`, true);
    appendCmd(blockRight ? '$[发送失败]' : `$[戳一戳:${rightName} 戳了戳 ${leftName}]`);
    playSwoosh();
    $('.Qixian-jemomodal').classList.remove('show');
  });
  $('.jemo-dice').addEventListener('click', () => {
    const pt = Math.floor(Math.random() * 6) + 1;
    appendMessage('right', `<div class="Qixian-interact-item Qixian-anim-dice"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="12" cy="12" r="1.5"/></svg></div>`, true);
    appendCmd(blockRight ? '$[发送失败]' : `$[摇骰子:${pt}点]`);
    playSwoosh();
    $('.Qixian-jemomodal').classList.remove('show');
  });
  $('.jemo-rps').addEventListener('click', () => {
    const arr = ['剪刀', '石头', '布'];
    const res = arr[Math.floor(Math.random() * 3)];
    appendMessage('right', `<div class="Qixian-interact-item Qixian-anim-rps"><svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/></svg></div>`, true);
    appendCmd(blockRight ? '$[发送失败]' : `$[猜拳:${res}]`);
    playSwoosh();
    $('.Qixian-jemomodal').classList.remove('show');
  });

  // ========== 一起听歌 ==========
  let musicList = [];
  let curMusicIdx = -1;
  let isMusicPlaying = false;

  function renderMusicList() {
    const listEl = $('.Qixian-jmulist');
    if(musicList.length === 0) {
      listEl.innerHTML = '<div style="text-align:center;color:#aaa;font-size:12px;padding:20px 0;">暂无歌曲，添加一首吧</div>';
      return;
    }
    listEl.innerHTML = musicList.map((m, i) => 
      `<div class="Qixian-mu-item ${i===curMusicIdx?'active':''}" data-idx="${i}">
        <span>${m.name} - ${m.artist}</span>
        <span class="jmudel" style="color:#aaa;font-size:11px;cursor:pointer;">删除</span>
      </div>`
    ).join('');
    $$('.Qixian-mu-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-idx'));
        curMusicIdx = idx;
        isMusicPlaying = true;
        updateMusicUI();
      });
    });
  }

  function updateMusicUI() {
    const waves = $('.Qixian-jmuwaves');
    const nowEl = $('.Qixian-jmunow');
    const icon = $('.Qixian-jmuicon');
    if(curMusicIdx < 0 || !musicList[curMusicIdx]) {
      nowEl.textContent = '未在播放';
      waves.classList.remove('playing');
      icon.innerHTML = '<polygon points="7 4 19 12 7 20 7 4" fill="#222"/>';
      return;
    }
    const m = musicList[curMusicIdx];
    nowEl.textContent = `${m.name} - ${m.artist}`;
    if(isMusicPlaying) {
      waves.classList.add('playing');
      icon.innerHTML = '<rect x="6" y="4" width="4" height="16" fill="#222"/><rect x="14" y="4" width="4" height="16" fill="#222"/>';
    } else {
      waves.classList.remove('playing');
      icon.innerHTML = '<polygon points="7 4 19 12 7 20 7 4" fill="#222"/>';
    }
  }

  $('.Qixian-jmuaddbtn').addEventListener('click', () => {
    const name = $('.Qixian-jmuname').value.trim();
    const artist = $('.Qixian-jmuartist').value.trim() || '未知歌手';
    if(!name) return;
    musicList.push({ name, artist, url: $('.Qixian-jmuinp').value.trim(), cover: $('.Qixian-jmucover').value.trim() });
    renderMusicList();
    $('.Qixian-jmuname').value = '';
    $('.Qixian-jmuartist').value = '';
    $('.Qixian-jmuinp').value = '';
    $('.Qixian-jmucover').value = '';
    playSwoosh();
  });

  $('.Qixian-jmuplay').addEventListener('click', () => {
    if(curMusicIdx < 0 && musicList.length > 0) curMusicIdx = 0;
    if(curMusicIdx < 0) return;
    isMusicPlaying = !isMusicPlaying;
    updateMusicUI();
  });

  $('.Qixian-jmuprev').addEventListener('click', () => {
    if(musicList.length === 0) return;
    curMusicIdx = (curMusicIdx - 1 + musicList.length) % musicList.length;
    updateMusicUI();
  });
  $('.Qixian-jmunext').addEventListener('click', () => {
    if(musicList.length === 0) return;
    curMusicIdx = (curMusicIdx + 1) % musicList.length;
    updateMusicUI();
  });

  $('.Qixian-jmuinv').addEventListener('click', () => {
    if(curMusicIdx < 0) return;
    const m = musicList[curMusicIdx];
    appendMessage('right', `
      <div class="Qixian-tf Qixian-music-share-card">
        <div class="Qixian-msc-top">
          <div class="Qixian-msc-cover" style="background-image:url('${m.cover || ''}');">
            <div class="Qixian-msc-playic"><svg viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4"/></svg></div>
          </div>
          <div class="Qixian-msc-info">
            <div class="Qixian-msc-name">${m.name}</div>
            <div class="Qixian-msc-artist">${m.artist}</div>
          </div>
        </div>
        <div class="Qixian-msc-bot"><svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> 一起听歌</div>
      </div>`, true);
    playSwoosh();
    appendCmd(`$[一起听歌邀请:${m.name}|${m.artist}]`);
    $('.Qixian-jmumodal').classList.remove('show');
  });

  renderMusicList();

  // ========== 情侣空间 ==========
  let cpThings = [];
  let cpDays = [];
  let cpAlbums = [];
  let userSign = '';

  function renderCpThings() {
    const el = $('.Qixian-jcpthings');
    if(cpThings.length === 0) {
      el.innerHTML = '<div style="text-align:center;color:#aaa;font-size:12px;padding:10px 0;">还没有添加小事</div>';
      return;
    }
    el.innerHTML = cpThings.map((t, i) => 
      `<div class="Qixian-cp-thing ${t.done?'done':''}" data-idx="${i}">
        <div class="dot"></div>
        <span>${t.who}: ${t.text}</span>
      </div>`
    ).join('');
    $$('.Qixian-cp-thing .dot').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.closest('.Qixian-cp-thing').getAttribute('data-idx'));
        cpThings[idx].done = !cpThings[idx].done;
        renderCpThings();
      });
    });
  }

  function renderCpDays() {
    const el = $('.Qixian-jcpdays');
    if(cpDays.length === 0) {
      el.innerHTML = '<div style="text-align:center;color:#aaa;font-size:12px;padding:10px 0;">还没有纪念日</div>';
      return;
    }
    el.innerHTML = cpDays.map(d => {
      const diff = Math.ceil((new Date() - new Date(d.date)) / (1000*60*60*24));
      return `<div class="Qixian-cp-day"><span>${d.name}</span><b>${diff} 天</b></div>`;
    }).join('');
  }

  function renderCpAlbums() {
    const el = $('.Qixian-jcpalbums');
    if(cpAlbums.length === 0) {
      el.innerHTML = '<div style="text-align:center;color:#aaa;font-size:12px;padding:10px 0;grid-column:1/-1;">还没有照片</div>';
      return;
    }
    el.innerHTML = cpAlbums.map(a => 
      `<div class="Qixian-cp-album-card">
        ${a.img ? `<div class="Qixian-cp-album-img" style="background-image:url('${a.img}');"></div>` : `<div class="Qixian-cp-album-txt-only">${a.txt}</div>`}
        <div class="Qixian-cp-album-txt">${a.txt || '照片'}</div>
      </div>`
    ).join('');
  }

  $('.Qixian-jcpthingadd').addEventListener('click', () => {
    const who = $('.Qixian-jcpwho').value;
    const text = $('.Qixian-jcpthingin').value.trim();
    if(!text) return;
    cpThings.push({ who, text, done: false });
    renderCpThings();
    $('.Qixian-jcpthingin').value = '';
    playSwoosh();
  });

  $('.Qixian-jcpdayadd').addEventListener('click', () => {
    const name = $('.Qixian-jcpdayname').value.trim();
    const date = $('.Qixian-jcpdaydate').value;
    if(!name || !date) return;
    cpDays.push({ name, date });
    renderCpDays();
    $('.Qixian-jcpdayname').value = '';
    playSwoosh();
  });

  $('.Qixian-jcpalbumadd').addEventListener('click', () => {
    const txt = $('.Qixian-jcpalbumtxt').value.trim();
    const img = $('.Qixian-jcpalbumimg').value.trim();
    if(!txt && !img) return;
    cpAlbums.push({ txt, img });
    renderCpAlbums();
    $('.Qixian-jcpalbumtxt').value = '';
    $('.Qixian-jcpalbumimg').value = '';
    playSwoosh();
  });

  $('.Qixian-jusignsave').addEventListener('click', () => {
    userSign = $('.Qixian-jusignin').value.trim();
    $('.Qixian-jusign-disp').textContent = userSign;
    appendCmd(`$[更新个签:${userSign}]`);
    playSwoosh();
  });

  // 初始化情侣空间
  $('.Qixian-jcprel').textContent = '在一起';
  $('.Qixian-jcsign').textContent = '对方的个性签名';
  renderCpThings();
  renderCpDays();
  renderCpAlbums();

  // ========== 朋友圈 ==========
  let pyqList = [];

  function renderPyq() {
    const listEl = $('.Qixian-jpyqlist');
    if(pyqList.length === 0) {
      listEl.innerHTML = '<div style="text-align:center;color:#aaa;font-size:14px;padding:60px 0;">还没有动态</div>';
      return;
    }
    listEl.innerHTML = pyqList.map((p, i) => `
      <div class="Qixian-pyq-item">
        <div class="Qixian-pyq-delbtn jpyqdel" data-idx="${i}"><svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div>
        <div class="Qixian-pyq-iav Qixian-bind-rav"></div>
        <div class="Qixian-pyq-ict">
          <div class="Qixian-pyq-inm">${rightName}</div>
          ${p.txt ? `<div class="Qixian-pyq-itxt">${p.txt}</div>` : ''}
          ${p.img ? `<img src="${p.img}" class="Qixian-pyq-iimg">` : ''}
          ${p.txtImg ? `<div class="Qixian-pyq-txtimg Qixian-txt-img">${p.txtImg}</div>` : ''}
          <div class="Qixian-pyq-ibot">
            <span>${p.time}</span>
            <div class="Qixian-pyq-iacts">
              <div class="Qixian-pyq-btn jpyqlike" data-idx="${i}"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
              <div class="Qixian-pyq-btn jpyqcom" data-idx="${i}"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
            </div>
          </div>
          ${p.likes || p.comments ? `
          <div class="Qixian-pyq-ints">
            ${p.likes ? `<div class="Qixian-pyq-likes"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> ${p.likes} 人觉得很赞</div>` : ''}
            ${p.comments && p.comments.length ? `<div class="Qixian-pyq-coms">${p.comments.map(c => `<div class="Qixian-pyq-com"><span>${c.name}</span>：${c.text}</div>`).join('')}</div>` : ''}
          </div>` : ''}
        </div>
      </div>
    `).join('');

    $$('.jpyqlike').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        pyqList[idx].likes = (pyqList[idx].likes || 0) + 1;
        renderPyq();
        playSwoosh();
        appendCmd('$[点赞朋友圈]');
      });
    });

    $$('.jpyqcom').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        curPyqIdx = idx;
        $('.Qixian-jpyqcommodal').classList.add('show');
      });
    });

    $$('.jpyqdel').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        pyqList.splice(idx, 1);
        renderPyq();
        playSwoosh();
        appendCmd('$[删除朋友圈]');
      });
    });
  }

  let curPyqIdx = -1;

  $('.Qixian-jpyqbtn').addEventListener('click', () => $('.Qixian-jpyqpanel').classList.add('show'));
  $('.Qixian-jpyqback').addEventListener('click', () => $('.Qixian-jpyqpanel').classList.remove('show'));
  $('.Qixian-jpyqadd').addEventListener('click', () => $('.Qixian-jpyqsendmodal').classList.add('show'));

  $('.Qixian-jpyqsendok').addEventListener('click', () => {
    const txt = $('.Qixian-jpyqsendtxt').value.trim();
    const img = $('.Qixian-jpyqsendimg').value.trim();
    const txtImg = $('.Qixian-jpyqsendtxtimg').value.trim();
    if(!txt && !img && !txtImg) return;
    pyqList.unshift({ txt, img, txtImg, time: '刚刚', likes: 0, comments: [] });
    renderPyq();
    playSwoosh();
    appendCmd(`$[发布朋友圈:${txt || ''}]`);
    $('.Qixian-jpyqsendmodal').classList.remove('show');
    $('.Qixian-jpyqsendtxt').value = '';
    $('.Qixian-jpyqsendimg').value = '';
    $('.Qixian-jpyqsendtxtimg').value = '';
  });

  $('.Qixian-jpyqcomok').addEventListener('click', () => {
    const t = $('.Qixian-jpyqcomtxt').value.trim();
    if(!t || curPyqIdx < 0) return;
    if(!pyqList[curPyqIdx].comments) pyqList[curPyqIdx].comments = [];
    pyqList[curPyqIdx].comments.push({ name: rightName, text: t });
    renderPyq();
    playSwoosh();
    appendCmd(`$[评论朋友圈:${t}]`);
    $('.Qixian-jpyqcommodal').classList.remove('show');
    $('.Qixian-jpyqcomtxt').value = '';
  });

  renderPyq();

  // ========== 语音功能 ==========
  const micBtn = $('.Qixian-jmic');
  let isRec = false;
  const SR = window.parent.SpeechRecognition || window.parent.webkitSpeechRecognition || window.SpeechRecognition || window.webkitSpeechRecognition;
  let voiceObj = null;
  let finalVoiceTxt = '';

  function voiceBubble(txt, dur) {
    appendMessage('right', `
      <div class="Qixian-au" data-txt="${txt}">
        <div class="Qixian-au-main">
          <div class="Qixian-au-play"></div>
          <div class="Qixian-au-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
          <div class="Qixian-au-dur">${dur}</div>
        </div>
        <div class="Qixian-au-wrap"><div class="Qixian-au-txt">${txt}</div></div>
      </div>`, true);
    playSwoosh();
    appendCmd(blockRight ? '$[发送失败]' : `$[语音:${dur}|${txt}]`);
  }

  function voiceFallback(err) {
    $('.Qixian-jvoicemodal').classList.add('show');
    $('.Qixian-jvoicetxt').placeholder = (err ? err + '，' : '') + '麦克风降级，请手动输入语音文字...';
  }

  function setupSR() {
    if(voiceObj) return true;
    if(!SR) return false;
    try {
      voiceObj = new SR();
      voiceObj.continuous = true;
      voiceObj.interimResults = true;
      voiceObj.onresult = ev => {
        for(let i = ev.resultIndex; i < ev.results.length; i++) {
          if(ev.results[i].isFinal) finalVoiceTxt += ev.results[i][0].transcript;
        }
      };
      voiceObj.onerror = ev => {
        if(ev.error !== 'no-speech') {
          isRec = false;
          micBtn.classList.remove('rec');
          voiceFallback(ev.error === 'not-allowed' ? '权限被拒' : '识别中断');
        }
      };
      voiceObj.onend = () => {
        if(isRec) { try { voiceObj.start(); } catch(e){} }
        else {
          micBtn.classList.remove('rec');
          if(finalVoiceTxt.trim()) voiceBubble(finalVoiceTxt.trim(), Math.max(1, Math.round(finalVoiceTxt.length/4)) + '"');
        }
      };
      return true;
    } catch(e) { return false; }
  }

  micBtn.addEventListener('click', e => {
    e.preventDefault();
    if(isRec) {
      isRec = false;
      micBtn.classList.remove('rec');
      if(voiceObj) { try { voiceObj.stop(); } catch(err){} }
    } else {
      if(SR && setupSR()) {
        finalVoiceTxt = '';
        try {
          voiceObj.start();
          isRec = true;
          micBtn.classList.add('rec');
        } catch(err) {
          isRec = false;
          micBtn.classList.remove('rec');
          voiceFallback('引擎启动失败');
        }
      } else {
        voiceFallback('设备不支持语音识别');
      }
    }
  });

  $('.Qixian-jvoiceok').addEventListener('click', () => {
    const txt = $('.Qixian-jvoicetxt').value.trim();
    if(txt) voiceBubble(txt, Math.max(1, Math.round(txt.length/4)) + '"');
    $('.Qixian-jvoicemodal').classList.remove('show');
  });

  // ========== 消息右键菜单 ==========
  $('.Qixian-jact-reply').addEventListener('click', () => {
    if(msgMap[activeMsgId]) {
      replyTarget = activeMsgId;
      $('.Qixian-jreptxt').textContent = msgMap[activeMsgId].text.slice(0, 30);
      $('.Qixian-jrepbar').classList.add('show');
    }
    $('.Qixian-jmsgact').classList.remove('show');
  });

  $('.Qixian-jact-revoke').addEventListener('click', () => {
    revokeMessage(activeMsgId);
    $('.Qixian-jmsgact').classList.remove('show');
  });

  $('.Qixian-jrepclose').addEventListener('click', () => {
    replyTarget = null;
    $('.Qixian-jrepbar').classList.remove('show');
  });

  // 点击叹号加好友
  $('.Qixian-jchat').addEventListener('click', e => {
    if(e.target.closest('.Qixian-err-icon')) {
      e.stopPropagation();
      $('.Qixian-jaddfriendmodal').classList.add('show');
    }
  });

  $('.Qixian-jaddfok').addEventListener('click', () => {
    const greet = $('.Qixian-jaddgreet').value.trim() || '你好，加个好友吧';
    playSwoosh();
    renderSysMsg('已发送好友请求');
    appendCmd(`$[发送好友请求:${greet}]`);
    $('.Qixian-jaddfriendmodal').classList.remove('show');
    $('.Qixian-jaddgreet').value = '';
  });

  // 查看撤回原文
  $('.Qixian-jchat').addEventListener('click', e => {
    const rev = e.target.closest('.Qixian-view-rev');
    if(rev) {
      e.stopPropagation();
      $('.Qixian-jviewtxt').value = rev.getAttribute('data-txt') || '';
      $('.Qixian-jviewmodal').classList.add('show');
    }
  });

  // 文字放大
  const zoom = $('.Qixian-jtxtzoom');
  const zoomIn = $('.Qixian-jtxtzoomin');
  $('.Qixian-jchat').addEventListener('click', e => {
    const txt = e.target.closest('.Qixian-txt-img');
    const gift = e.target.closest('.Qixian-gift-card');
    if(txt) {
      zoomIn.innerHTML = txt.innerHTML;
      zoomIn.className = 'Qixian-txt-zoom-in txt-img-zoom';
      zoom.classList.add('show');
    } else if(gift) {
      zoomIn.innerHTML = gift.innerHTML;
      zoomIn.className = 'Qixian-txt-zoom-in gift-zoom';
      zoom.classList.add('show');
    }
  });
  zoom.addEventListener('click', e => { if(e.target === zoom) zoom.classList.remove('show'); });

  // ========== 悬浮拖拽（整机） ==========
  function enableDrag() {
    const el = mount;
    let isDragging = false;
    let startX = 0, startY = 0;
    let initLeft = 0, initTop = 0;
    let hasMoved = false;

    // 读取保存位置
    let savedPos = null;
    try {
      const raw = localStorage.getItem('QixianPhone_Pos');
      if(raw) savedPos = JSON.parse(raw);
    } catch(e) {}

    if(savedPos && typeof savedPos.left === 'number') {
      el.style.right = 'auto';
      el.style.bottom = 'auto';
      el.style.left = savedPos.left + 'px';
      el.style.top = savedPos.top + 'px';
    }

    function savePos() {
      const rect = el.getBoundingClientRect();
      try {
        localStorage.setItem('QixianPhone_Pos', JSON.stringify({
          left: rect.left,
          top: rect.top
        }));
      } catch(e) {}
    }

    function clampPosition(left, top) {
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxLeft = vw - rect.width;
      const maxTop = vh - rect.height;
      return {
        left: Math.max(0, Math.min(left, maxLeft)),
        top: Math.max(0, Math.min(top, maxTop))
      };
    }

    function onStart(e) {
      // 忽略可交互元素
      const target = e.target;
      if(target.closest('input, textarea, button, .Qixian-dial-key, .Qixian-list-item, .Qixian-mu-item, .Qixian-emo-card')) return;
      
      isDragging = true;
      hasMoved = false;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      
      const rect = el.getBoundingClientRect();
      initLeft = rect.left;
      initTop = rect.top;
      startX = cx - initLeft;
      startY = cy - initTop;

      el.style.right = 'auto';
      el.style.bottom = 'auto';
      el.style.opacity = '0.92';
      document.body.style.userSelect = 'none';
    }

    function onMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      
      let newLeft = cx - startX;
      let newTop = cy - startY;
      const clamped = clampPosition(newLeft, newTop);
      
      if (Math.abs(newLeft - initLeft) > 5 || Math.abs(newTop - initTop) > 5) {
        hasMoved = true;
      }

      el.style.left = clamped.left + 'px';
      el.style.top = clamped.top + 'px';
    }

    function onEnd() {
      if (!isDragging) return;
      isDragging = false;
      el.style.opacity = '1';
      document.body.style.userSelect = '';
      if (hasMoved) savePos();
    }

    el.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    el.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);

    window.addEventListener('resize', () => {
      const rect = el.getBoundingClientRect();
      const clamped = clampPosition(rect.left, rect.top);
      el.style.left = clamped.left + 'px';
      el.style.top = clamped.top + 'px';
      savePos();
    });
  }

  // ========== 初始化执行 ==========
  initNames();

  // 恢复背景
  const savedBg = QxStore.get('Qx-bg-img');
  if(savedBg && savedBg !== 'none') {
    $$('.Qixian-jbg, .Qixian-jhome').forEach(el => el.style.backgroundImage = `url('${savedBg}')`);
  }

  // 默认欢迎消息
  appendMessage('left', '你好呀～');

  // ========== 对外暴露 API ==========
  window.QixianPhone = {
    /**
     * 将手机挂载到指定容器
     * @param {HTMLElement} container 目标DOM容器
     */
    mount(container) {
      if (container && mount.parentNode !== container) {
        container.appendChild(mount);
      }
    },

    getRoot() {
      return mount;
    },

    /**
     * 添加一条聊天消息
     * @param {'left'|'right'} side 左右侧
     * @param {string} text 消息内容
     * @param {object} options 可选参数
     */
    addMessage(side, text, options = {}) {
      return appendMessage(side, text, options);
    },

    /**
     * 添加系统提示
     * @param {string} text 提示文字
     */
    addSystemTip(text) {
      renderSysMsg(text);
    },

    /**
     * 启用整机悬浮拖拽
     */
    enableDrag
  };
})();

/* ================================================
 *  nicoPhone 酒馆专属适配启动逻辑
 *  追加在 nicoPhone.js 代码末尾即可生效
 * ================================================ */
(function tavernAdapter() {
  // 防止重复加载
  if (window.QixianPhoneTavernReady) return;
  window.QixianPhoneTavernReady = true;

  const phoneRoot = document.getElementById('Qixian-Phone-Root');
  if (!phoneRoot || !window.QixianPhone) return;

  // ---------- 1. 界面适配：避开酒馆底部输入栏 ----------
  phoneRoot.style.cssText += `
    bottom: 120px !important;
    right: 16px !important;
    z-index: 9998 !important;
    transform: scale(0.82) !important;
    transform-origin: right bottom;
    transition: opacity .2s;
    cursor: grab;
  `;

  // ---------- 2. 启用整机悬浮拖拽 ----------
  if (typeof window.QixianPhone.enableDrag === 'function') {
    window.QixianPhone.enableDrag();
  }

  // ---------- 3. 自动同步当前角色名称 ----------
  function syncCharacterName() {
    const charName = window.SillyTavern?.character?.name;
    if (!charName) return;
    document.querySelectorAll('.Qixian-bind-lnm').forEach(el => {
      el.textContent = charName;
    });
  }

  // 初始加载 + 切换角色时同步
  syncCharacterName();
  $(document).on('character_loaded', syncCharacterName);

  // ---------- 4. 酒馆消息自动同步到手机 ----------
  $(document).on('chat_message_received', (_event, msg) => {
    if (!msg?.message || msg.is_system || msg.is_cmd) return;
    
    // 剥离 HTML 标签取纯文本
    const pureText = msg.message.replace(/<[^>]+>/g, '').trim();
    if (!pureText) return;

    const side = msg.is_user ? 'right' : 'left';
    window.QixianPhone.addMessage(side, pureText);
  });

  // ---------- 5. 切换对话时清空手机聊天记录 ----------
  $(document).on('chat_changed', () => {
    const chatBox = document.querySelector('.Qixian-jchat');
    if (chatBox) chatBox.innerHTML = '';
    window.QixianPhone.addSystemTip('已切换对话');
    syncCharacterName();
  });

  // ---------- 6. 快捷键：Ctrl+P 显示/隐藏手机 ----------
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      phoneRoot.style.display = phoneRoot.style.display === 'none' ? 'block' : 'none';
    }
  });

  console.log('[QixianPhone] 酒馆适配已加载，支持拖拽移动，Ctrl+P 切换显示');
})();

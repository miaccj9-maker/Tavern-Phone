/* ================================================================
 *  Qixian 手机组件 - SillyTavern 扩展正式版
 *  自动适配酒馆角色/用户头像，嵌入聊天窗口，暴露全局API
 *  安装方式：放入 extensions 目录，或通过 GitHub 扩展链接安装
 * ================================================================ */
(function () {
    'use strict';

    const COMPONENT_ID = 'qixian-phone-extension';
    const CSS_ID = 'qixian-phone-styles';
    const CONTAINER_ID = 'qixian-phone-float';

    // ===================== 1. 完整 CSS 样式 =====================
    const fullCSS = `
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
*{box-sizing:border-box;margin:0;padding:0;}
.Qixian-stage{width:100%;display:flex;justify-content:center;padding:10px 0;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;touch-action:pan-y;--wrap-bg:#e0e0e0;--hdr-bg:rgba(255,255,255,.85);--ftr-bg:rgba(255,255,255,.9);--bub-r:rgba(245,245,245,.9);--bub-l:rgba(255,255,255,.9);--txt-main:#222;--wv-bg:#aaa;--sys-txt:#888;--card-txt:#222;--hdr-txt:#333;--hdr-ic:#333;--card-ic:#333;--pull-bg:rgba(200,200,200,.3);--card-bg:rgba(255,255,255,.7);--call-bub-l:rgba(250,250,250,.9);--call-bub-r:rgba(240,240,240,.9);--call-bub-txt:#222;--blur-val:16px;}
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
input[type=number]{-moz-appearance:textfield;}
::-webkit-scrollbar{display:none;width:0;height:0;}
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
.Qixian-call .Qixian-call-ft{display:flex!important;flex-direction:column;gap:20px;z-index:99999!important;padding-bottom:10px;}
.Qixian-call-btns{display:none!important;justify-content:space-evenly!important;padding:0 30px!important;animation:Qixian-pop .3s!important;}
.Qixian-call.state-out .btns-out{display:flex!important;}
.Qixian-call.state-in .btns-in{display:flex!important;}
.Qixian-call-btn{width:64px!important;height:64px!important;border-radius:50%!important;display:flex!important;justify-content:center!important;align-items:center!important;cursor:pointer!important;transition:transform .1s, background .2s!important;}
.Qixian-call-btn:active{transform:scale(.92)!important;}
.Qixian-call-btn.hangup{background:#ffffff!important;color:#222222!important;box-shadow:0 2px 8px rgba(0,0,0,.15)!important;border:1px solid rgba(0,0,0,.1)!important;}
.Qixian-call-btn.answer{background:#ffffff!important;color:#222222!important;box-shadow:0 2px 8px rgba(0,0,0,.15)!important;border:1px solid rgba(0,0,0,.1)!important;}
.Qixian-call-btn.cancel{background:#f5f5f5!important;color:#666666!important;box-shadow:0 2px 8px rgba(0,0,0,.1)!important;border:1px solid rgba(0,0,0,.08)!important;}
.Qixian-call-btn svg{width:28px!important;height:28px!important;stroke:currentColor!important;stroke-width:1.8!important;fill:none!important;}
.Qixian-call-inrow{display:none!important;gap:10px;align-items:center;background:rgba(250, 250, 250, 0.9)!important;backdrop-filter:blur(10px);padding:6px 8px!important;height:36px!important;border-radius:22px;animation:Qixian-pop .3s;border:.5px solid rgba(0, 0, 0, .03);z-index:99999!important;}
.Qixian-call.active .Qixian-call-inrow{display:flex!important;}
.Qixian-call-in{flex:1;border:none;background:transparent;padding:0 8px!important;height:24px!important;font-size:12px!important;outline:none;color:#222;min-width:0;font-weight:400;}
.Qixian-call.active .Qixian-call-btn.mini{width:28px!important;height:28px!important;flex-shrink:0;box-shadow:none!important;}
.Qixian-call.active .Qixian-call-btn.mini svg{width:16px!important;height:16px!important;}
.Qixian-call.active .Qixian-call-send{height:24px!important;padding:0 12px!important;font-size:11px!important;background:#222;color:#fff;border-radius:16px;font-weight:500;cursor:pointer;transition:background .2s;border:none;}
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
.Qixian-cen-btns .cc{background:rgba(0,0,0,.04);color:#555;} .Qixian-cen-btns .ok{background:#222;color:#fff;}
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

/* 浮动容器样式 */
#qixian-phone-float{
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 99999;
    user-select: none;
    transition: transform .2s, opacity .2s;
}
#qixian-phone-float.hidden{
    transform: translateX(calc(100% + 30px));
    opacity: 0;
    pointer-events: none;
}
#qixian-toggle-btn{
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #222;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 99998;
    box-shadow: 0 4px 12px rgba(0,0,0,.15);
    transition: transform .2s, opacity .2s;
}
#qixian-toggle-btn:hover{ transform: scale(1.05); }
#qixian-toggle-btn.hidden{ opacity: 0; pointer-events: none; }
#qixian-toggle-btn svg{ width: 24px; height: 24px; stroke: currentColor; fill: none; stroke-width: 1.5; }
`;

    // ===================== 2. 工具函数与全局变量 =====================
    let scope = null;
    let finalLName = '角色';
    let finalRName = '我';
    let finalLAv = '';
    let finalRAv = '';
    let safeLAv = '';
    let safeRAv = '';
    let isBlkRight = false;
    let isBlkLeft = false;
    let chatBox = null;
    let callBubsBox = null;
    let pendingReply = '';
    let rawRel = '', rawCSign = '', rawUSign = '';
    let langMap = [{ l: 'zh-CN', n: '中' }];
    let langIdx = 0;

    // 本地存储封装
    const QxStore = {
        get: function(k) {
            try { return localStorage.getItem(k); } catch(e) { return null; }
        },
        set: function(k, v) {
            try { localStorage.setItem(k, v); } catch(e) {}
        },
        removeItem: function(k) {
            try { localStorage.removeItem(k); } catch(e) {}
        }
    };

    // DOM 查询封装（限定在组件内）
    function Q(s) {
        if(!scope) return null;
        return scope.querySelector(s);
    }
    function QA(s) {
        if(!scope) return [];
        return scope.querySelectorAll(s);
    }
    function nowTime() {
        var d = new Date();
        return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
    }

    function getRealImgUrl(url) {
        if(url && url.startsWith('local-draw-')){
            return QxStore.get('Qx-' + url) || url;
        }
        return url;
    }

    // 音效
    let actx = null;
    function getCtx(){
        if(!actx){
            try { actx = new (window.AudioContext || window.webkitAudioContext)(); }
            catch(e){}
        }
        return actx;
    }
    function playSwoosh(){
        var c = getCtx(); if(!c) return;
        try {
            if(c.state === 'suspended') c.resume();
            var o = c.createOscillator(), g = c.createGain();
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

    function stopRing() {}
    // ===================== 3. 酒馆环境适配 =====================
    // 获取当前角色信息
    function getTavernCharacter() {
        try {
            if (window.SillyTavern && window.SillyTavern.getContext) {
                const ctx = window.SillyTavern.getContext();
                if (ctx && ctx.character) {
                    return {
                        name: ctx.character.name || '角色',
                        avatar: ctx.character.avatar || ''
                    };
                }
            }
            // 兜底：从DOM读取
            const av = document.querySelector('.char-avatar img, #avatar');
            const nm = document.querySelector('.charname, .character-name');
            return {
                name: nm ? nm.textContent.trim() : '角色',
                avatar: av ? av.src : ''
            };
        } catch(e) {
            return { name: '角色', avatar: '' };
        }
    }

    // 获取用户信息
    function getTavernUser() {
        try {
            if (window.SillyTavern && window.SillyTavern.getContext) {
                const ctx = window.SillyTavern.getContext();
                if (ctx && ctx.user) {
                    return {
                        name: ctx.user.name || '我',
                        avatar: ctx.user.avatar || ''
                    };
                }
            }
            const av = document.querySelector('.user-avatar img, #user_avatar');
            return {
                name: '我',
                avatar: av ? av.src : ''
            };
        } catch(e) {
            return { name: '我', avatar: '' };
        }
    }

    // 同步酒馆消息到手机组件
    function syncTavernMessage(data) {
        if (!data || !data.message) return;
        const isUser = data.is_user || false;
        const msg = data.message.trim();
        if (!msg) return;

        if (isUser) {
            renderRight(msg, false, isBlkRight);
        } else {
            parseIncomingCmd(msg);
        }
    }

    // 发送消息到酒馆输入框
    function sendToTavern(text) {
        try {
            const input = document.querySelector('#send_textarea');
            if (!input) return;
            const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
            if (setter) {
                setter.call(input, text);
            } else {
                input.value = text;
            }
            input.dispatchEvent(new Event('input', { bubbles: true }));
            // 触发发送
            const sendBtn = document.querySelector('#send_but');
            if (sendBtn) sendBtn.click();
        } catch(e) {}
    }

    // 核心：发送指令/消息到酒馆（补全缺失函数）
    function appendCmd(text) {
        if (!text) return;
        sendToTavern(text);
    }

    // ===================== 4. 核心渲染函数 =====================
    function renderSysMsg(text) {
        var m = document.createElement('div');
        m.className = 'Qixian-sys-msg';
        m.innerHTML = text;
        chatBox.appendChild(m);
        setTimeout(function(){ chatBox.scrollTop = chatBox.scrollHeight; }, 60);
    }

    function renderRight(inner, isRaw, hasErr) {
        var row = document.createElement('div');
        row.className = 'Qixian-row right' + (hasErr ? ' has-err' : '');
        var body = isRaw ? inner : '<div class="Qixian-bub">'+inner+'</div>';
        var avStyle = safeRAv ? ' style="background-image:url(\''+safeRAv+'\')"' : '';
        row.innerHTML = '<div class="Qixian-rav Qixian-bind-rav user-avatar"'+avStyle+'></div><div class="Qixian-ct">'+body+'<div class="Qixian-meta">'+nowTime()+' <span class="Qixian-tick">✓✓</span></div></div><div class="Qixian-err-icon Qixian-jerr" title="消息被拒收">!</div>';
        chatBox.appendChild(row);
        setTimeout(function(){ chatBox.scrollTop = chatBox.scrollHeight; }, 60);
        if (hasErr) {
            setTimeout(function(){
                renderSysMsg('对方开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。<span class="Qixian-view-rev">发送朋友验证</span>');
            }, 150);
        }
    }

    function renderLeft(inner, isRaw) {
        var row = document.createElement('div');
        row.className = 'Qixian-row left';
        var body = isRaw ? inner : '<div class="Qixian-bub">'+inner+'</div>';
        var avStyle = safeLAv ? ' style="background-image:url(\''+safeLAv+'\')"' : '';
        row.innerHTML = '<div class="Qixian-lav Qixian-bind-lav char-avatar"'+avStyle+'></div><div class="Qixian-ct">'+body+'<div class="Qixian-meta">'+nowTime()+'</div></div>';
        chatBox.appendChild(row);
        setTimeout(function(){ chatBox.scrollTop = chatBox.scrollHeight; }, 60);
    }

    // 指令解析（角色发的指令）
    function parseIncomingCmd(text) {
        var m = text.match(/^\$\[(.+?)\]/);
        if(!m) {
            renderLeft(text);
            return;
        }
        var cmd = m[1],
            sep = cmd.indexOf(':'),
            type = sep>0 ? cmd.substring(0, sep) : cmd,
            content = sep>0 ? cmd.substring(sep+1) : '';

        switch(type) {
            case '呼叫':
                openCallUI(content==='视频通话'?'video':'voice', 'in');
                renderSysMsg(finalLName+' 发起了'+content);
                break;
            case '挂断通话':
                closeCall();
                renderSysMsg('通话已结束');
                break;
            case '接听通话':
                setActiveCall();
                renderSysMsg('对方已接听');
                break;
            case '拒绝通话':
                closeCall();
                renderSysMsg('对方已拒绝');
                break;
            case '通话':
            case '视频':
                addCallBubble('left', content, false);
                break;
            case '图':
                var p = content.split('|'),
                    u = getRealImgUrl(p[0]),
                    d = p[1]||'图片';
                renderLeft('<img src="'+u+'" class="Qixian-img" alt="'+d+'">', true);
                break;
            case '文图':
                renderLeft('<div class="Qixian-txt-img">'+content+'</div>', true);
                break;
            case '转账':
                var tp = content.split(':'),
                    amt = tp[0],
                    tit = tp[1]||'转账';
                renderLeft('<div class="Qixian-tf Qixian-j-pure-tf" data-amt="'+amt+'"><div class="Qixian-tf-ic">¥</div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+tit+'</div><div class="Qixian-tf-a">¥ '+amt+'</div><div class="Qixian-tf-f">微信转账</div></div></div>', true);
                break;
            case '收款':
                renderSysMsg('对方已收款 ¥'+content);
                break;
            case '退回':
                renderSysMsg('对方已退回转账 ¥'+content);
                break;
            case '语音':
                var vp = content.split('|'),
                    dur = vp[0],
                    txt = vp[1]||'';
                renderLeft('<div class="Qixian-au" data-txt="'+txt+'"><div class="Qixian-au-main"><div class="Qixian-au-play"></div><div class="Qixian-au-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="Qixian-au-dur">'+dur+'</div></div><div class="Qixian-au-wrap"><div class="Qixian-au-txt">'+txt+'</div></div></div>', true);
                break;
            case '拍一拍':
                renderSysMsg(content);
                break;
            case '撤回':
                var rp = content.split('|');
                renderSysMsg(rp[0]+' 撤回了一条消息 <span class="Qixian-view-rev" data-txt="'+(rp[1]||'').replace(/"/g,'&quot;')+'">查看</span>');
                break;
            case '拉黑拒收':
            case '消息被拒收':
                renderSysMsg('消息已发出，但被对方拒收了');
                break;
            case '发送好友请求':
                renderSysMsg('收到好友请求：'+content);
                break;
            case '一起听歌邀请':
                var sp = content.split('|');
                renderSysMsg(finalLName+' 邀请你一起听：'+(sp[0]||'未知歌曲'));
                break;
            case '定位分享':
                var lp = content.split('|');
                renderSysMsg(finalLName+' 分享了位置：'+(lp[0]||'未知位置'));
                break;
            default:
                renderLeft(text);
        }
    }

    // ===================== 5. 功能模块 =====================
    // 通话模块
    let callIntv = null, callSec = 0, callState = 'none';
    function formatTime(sec){
        var m = String(Math.floor(sec/60)).padStart(2,'0');
        var s = String(sec%60).padStart(2,'0');
        return m+':'+s;
    }

    function openCallUI(type, state) {
        var c = Q('.Qixian-jcall');
        c.className = 'Qixian-call Qixian-jcall show state-' + state + (type==='video' ? ' video' : '');
        c.style.transform = 'none';

        if (type === 'video') {
            Q('.Qixian-call-vbg').style.backgroundImage = 'url(\''+safeRAv+'\')';
            Q('.Qixian-bind-rav-bg').style.backgroundImage = 'url(\''+safeLAv+'\')';
        } else {
            var savedBg = QxStore.get('Qx-bg-img');
            if (savedBg && savedBg !== 'none') {
                Q('.Qixian-call-vbg').style.backgroundImage = 'url(\''+savedBg.replace(/'/g,'%27')+'\')';
            } else {
                Q('.Qixian-call-vbg').style.backgroundImage = '';
            }
        }

        callSec = 0; callState = state; clearInterval(callIntv);
        var panel = Q('.Qixian-jpanel'); var plusBtn = Q('.Qixian-jplus');
        if(panel) panel.classList.remove('show');
        if(plusBtn) plusBtn.classList.remove('on');
    }

    function setActiveCall(forceType) {
        if(callState === 'active') return;
        callState = 'active';
        var c = Q('.Qixian-jcall');
        c.classList.remove('state-in', 'state-out', 'minimized');
        c.classList.add('active', 'show');

        if(forceType === 'video') {
            c.classList.add('video');
            Q('.Qixian-call-vbg').style.backgroundImage = 'url(\''+safeRAv+'\')';
            Q('.Qixian-bind-rav-bg').style.backgroundImage = 'url(\''+safeLAv+'\')';
        }

        Q('.Qixian-jcall-timer').textContent = '00:00';
        callSec = 0; clearInterval(callIntv);
        callIntv = setInterval(function(){
            callSec++;
            Q('.Qixian-jcall-timer').textContent = formatTime(callSec);
        }, 1000);
    }

    function closeCall() {
        clearInterval(callIntv);
        Q('.Qixian-jcall').classList.remove('show', 'active', 'state-in', 'state-out', 'video', 'minimized');
        callState = 'none';
    }

    function addCallBubble(dir, text, doType) {
        var wrap = document.createElement('div');
        wrap.className = 'Qixian-cb-wrap ' + dir;
        var bub = document.createElement('div');
        bub.className = 'Qixian-cb';
        wrap.appendChild(bub);
        callBubsBox.appendChild(wrap);
        if(doType) {
            var i = 0;
            var timer = setInterval(function() {
                if(i < text.length) {
                    bub.innerHTML += text.charAt(i);
                    i++;
                    callBubsBox.scrollTop = callBubsBox.scrollHeight;
                } else { clearInterval(timer); }
            }, 60);
        } else {
            bub.innerHTML = text;
            setTimeout(function(){ callBubsBox.scrollTop = callBubsBox.scrollHeight; }, 50);
        }
    }

    // 位置共享
    function updateLoc(p1, p2, dist) {
        var t1 = Q('.Qixian-anchor-tip.t1'), t2 = Q('.Qixian-anchor-tip.t2'), d = Q('#Qx-loc-dist');
        if(t1) t1.textContent = p1 || '未获取位置';
        if(t2) t2.textContent = p2 || '未获取位置';
        if(d) d.textContent = dist || '未知';
    }

    // 一起听歌模块
    var muList = [], muIndex = -1, muPlaying = false, muTimer = null, muTotalMin = 0;
    function renderMuList() {
        var el = Q('.Qixian-jmulist');
        if(!el) return;
        if(muList.length === 0) {
            el.innerHTML = '<div style="text-align:center;color:#aaa;font-size:12px;padding:20px 0;">暂无歌曲</div>';
            return;
        }
        var html = '';
        muList.forEach(function(s, i){
            html += '<div class="Qixian-mu-item'+(i===muIndex?' active':'')+'" data-idx="'+i+'"><div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:500;color:#222;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+s.name+'</div><div style="font-size:11px;color:#888;margin-top:2px;">'+s.artist+'</div></div><div class="jmudel" style="font-size:11px;color:#aaa;cursor:pointer;padding:4px;" data-idx="'+i+'">删除</div></div>';
        });
        el.innerHTML = html;
        QA('.Qixian-mu-item').forEach(function(el){
            el.addEventListener('click', function(){ playMuIdx(parseInt(this.getAttribute('data-idx'))); });
        });
        QA('.jmudel').forEach(function(el){
            el.addEventListener('click', function(e){
                e.stopPropagation();
                var i = parseInt(this.getAttribute('data-idx'));
                muList.splice(i,1);
                if(muIndex===i){
                    muIndex=-1;
                    muPlaying=false;
                    updateMuPlayState();
                }else if(muIndex>i) muIndex--;
                renderMuList();
            });
        });
    }

    function playMuIdx(i) {
        if(i<0||i>=muList.length) return;
        muIndex = i;
        muPlaying = true;
        updateMuPlayState();
        renderMuList();
        clearInterval(muTimer);
        muTimer = setInterval(function(){
            muTotalMin++;
            var el = Q('#Qx-mutime-val');
            if(el) el.textContent = muTotalMin;
        }, 60000);
    }

    function updateMuPlayState() {
        var w = Q('.Qixian-jmuwaves'), ic = Q('.Qixian-jmuicon'), n = Q('.Qixian-jmunow');
        if(!w||!ic||!n) return;
        if(muPlaying && muIndex>=0) {
            w.classList.add('playing');
            ic.innerHTML = '<polygon points="5 4 19 12 5 20 5 4" fill="#222"/>';
            n.textContent = '正在播放：'+muList[muIndex].name;
        } else {
            w.classList.remove('playing');
            ic.innerHTML = '<polygon points="7 4 19 12 7 20 7 4" fill="#222"/>';
            n.textContent = muIndex>=0 ? '已暂停：'+muList[muIndex].name : '未在播放';
        }
    }

    // 情侣空间模块
    var cpThings = [], cpDays = [], cpAlbums = [];
    function renderCpThings() {
        var el = Q('.Qixian-jcpthings');
        if(!el) return;
        if(cpThings.length===0) {
            el.innerHTML = '<div style="text-align:center;color:#aaa;font-size:12px;padding:10px 0;">暂无待办</div>';
            return;
        }
        var h = '';
        cpThings.forEach(function(it, i){
            h += '<div class="Qixian-cp-thing'+(it.done?' done':'')+'" data-idx="'+i+'"><div class="dot"></div><span>'+it.who+'：'+it.text+'</span></div>';
        });
        el.innerHTML = h;
        QA('.Qixian-cp-thing .dot').forEach(function(d, i){
            d.addEventListener('click', function(){
                cpThings[i].done = !cpThings[i].done;
                renderCpThings();
                playSwoosh();
            });
        });
    }
    function renderCpDays() {
        var el = Q('.Qixian-jcpdays');
        if(!el) return;
        if(cpDays.length===0) {
            el.innerHTML = '<div style="text-align:center;color:#aaa;font-size:12px;padding:10px 0;">暂无纪念日</div>';
            return;
        }
        var h = '', now = new Date();
        cpDays.forEach(function(it){
            var d = Math.ceil((now - new Date(it.date)) / 86400000);
            var t = d>=0 ? (d+' 天') : ('还有 '+Math.abs(d)+' 天');
            h += '<div class="Qixian-cp-day"><span>'+it.name+'</span><b>'+t+'</b></div>';
        });
        el.innerHTML = h;
    }

    function renderCpAlbums() {
        var el = Q('.Qixian-jcpalbums');
        if(!el) return;
        if(cpAlbums.length===0) {
            el.innerHTML = '<div style="text-align:center;color:#aaa;font-size:12px;padding:10px 0;grid-column:1/-1;">相册为空</div>';
            return;
        }
        var h = '';
        cpAlbums.forEach(function(it){
            if(it.img) {
                h += '<div class="Qixian-cp-album-card"><div class="Qixian-cp-album-img" style="background-image:url(\''+it.img+'\');"></div><div class="Qixian-cp-album-who">'+it.who+'</div><div class="Qixian-cp-album-txt">'+it.txt+'</div></div>';
            } else {
                h += '<div class="Qixian-cp-album-card"><div class="Qixian-cp-album-txt-only">'+it.txt+'</div><div class="Qixian-cp-album-who">'+it.who+'</div></div>';
            }
        });
        el.innerHTML = h;
    }

    function initCpData() {
        var relEl = Q('.Qixian-jcprel');
        if(relEl) relEl.textContent = '恋爱中';
        var csEl = Q('.Qixian-jcsign');
        if(csEl) csEl.textContent = '对方还没有填写个签';
        var saved = QxStore.get('Qx-cp-usign') || '';
        var usEl = Q('.Qixian-jusign-disp');
        if(usEl) usEl.textContent = saved;
        renderCpThings();
        renderCpDays();
        renderCpAlbums();
    }

    // ===================== 6. 事件绑定与初始化 =====================
    function bindAllEvents() {
        // 顶部栏
        Q('.Qixian-jhd-toggle').addEventListener('click', function(){
            Q('.Qixian-jhd').classList.toggle('collapsed');
            Q('.Qixian-jchat').classList.toggle('collapsed');
        });
        Q('.Qixian-jset-open').addEventListener('click', function(){
            Q('.Qixian-jset').classList.add('show');
        });
        Q('.Qixian-jset-close').addEventListener('click', function(){
            Q('.Qixian-jset').classList.remove('show');
        });

        // 输入与发送
        var textInput = Q('.Qixian-jinput'), sendBtn = Q('.Qixian-jsend');
        function sendText() {
            var v = textInput.value.trim();
            if(!v) return;
            if(pendingReply) {
                renderRight('<div class="Qixian-quote-box">' + pendingReply + '</div>' + v, false, isBlkRight);
                sendToTavern('[引用:' + pendingReply + '] ' + v);
                Q('.Qixian-jrepclose').click();
            } else {
                renderRight(v, false, isBlkRight);
                sendToTavern(v);
            }
            textInput.value='';
            playSwoosh();
        }
        sendBtn.addEventListener('click', sendText);
        textInput.addEventListener('keydown', function(e){
            if(e.key === 'Enter') { e.preventDefault(); sendText(); }
        });

        // 加号面板
        var plusBtn = Q('.Qixian-jplus'), panel = Q('.Qixian-jpanel');
        plusBtn.addEventListener('click', function(){
            plusBtn.classList.toggle('on');
            panel.classList.toggle('show');
        });

        function openModal(sel){
            Q(sel).classList.add('show');
            panel.classList.remove('show');
            plusBtn.classList.remove('on');
        }

       // 各功能入口 - 续写开始
Q('.Qixian-jbtn-voice').addEventListener('click', function(){
    openCallUI('voice', 'out');
    appendCmd(isBlkRight ? '$[呼叫失败，拒收]' : '$[呼叫:语音通话]');
});

Q('.Qixian-jbtn-video').addEventListener('click', function(){
    openCallUI('video', 'out');
    appendCmd(isBlkRight ? '$[呼叫失败，拒收]' : '$[呼叫:视频通话]');
});

Q('.Qixian-jimgbtn').addEventListener('click', function(){
    openModal('.Qixian-jimgmodal');
});

Q('.Qixian-jtxtimg').addEventListener('click', function(){
    openModal('.Qixian-jtxtimgmodal');
});

Q('.Qixian-jgiftbtn').addEventListener('click', function(){
    openModal('.Qixian-jgiftmodal');
});

Q('.Qixian-jlinkbtn').addEventListener('click', function(){
    openModal('.Qixian-jlinkmodal');
});

Q('.Qixian-jtf').addEventListener('click', function(){
    openModal('.Qixian-jtfmodal');
});

Q('.Qixian-jemo').addEventListener('click', function(){
    openModal('.Qixian-jemomodal');
});

Q('.Qixian-jmusic').addEventListener('click', function(){
    openModal('.Qixian-jmumodal');
});

Q('.Qixian-jcp').addEventListener('click', function(){
    openModal('.Qixian-jcpmodal');
});

Q('.Qixian-jbtn-loc').addEventListener('click', function(){
    openModal('.Qixian-jlocmodal');
});

Q('.Qixian-jbtn-food').addEventListener('click', function(){
    openModal('.Qixian-jfoodmodal');
});

Q('.Qixian-jbtn-draw').addEventListener('click', function(){
    openModal('.Qixian-jdrawmodal');
    setTimeout(resetDrawBoard, 50);
});

// ========== 模态框交互逻辑 ==========
// 礼物模态框
Q('.Qixian-jgiftcancel').addEventListener('click', function(){
    Q('.Qixian-jgiftmodal').classList.remove('show');
});
Q('.Qixian-jgiftok').addEventListener('click', function(){
    var pr = Q('.Qixian-jgiftpr').value || '0',
        desc = Q('.Qixian-jgiftdesc').value || '精美礼物',
        note = Q('.Qixian-jgiftnote').value || '';
    renderRight('<div class="Qixian-link-card Qixian-gift-card"><div class="Qixian-link-ic" style="background:rgba(255,255,255,0.6);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg></div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+desc+'</div><div class="Qixian-tf-a" style="color:var(--sys-txt);">¥ '+parseFloat(pr).toFixed(2)+(note?' - '+note:'')+'</div></div></div>', true, isBlkRight);
    playSwoosh();
    appendCmd(isBlkRight ? '$[发送失败]' : '$[礼物:'+pr+'|'+desc+'|'+note+']');
    Q('.Qixian-jgiftmodal').classList.remove('show');
    Q('.Qixian-jgiftpr').value='';
    Q('.Qixian-jgiftdesc').value='';
    Q('.Qixian-jgiftnote').value='';
});

// 链接分享模态框
Q('.Qixian-jlinkcancel').addEventListener('click', function(){
    Q('.Qixian-jlinkmodal').classList.remove('show');
});
Q('.Qixian-jlinkok').addEventListener('click', function(){
    var url = Q('.Qixian-jlinkurl').value.trim(),
        title = Q('.Qixian-jlinktitle').value.trim() || '网页链接';
    if(url){
        renderRight('<a href="javascript:;" class="Qixian-link-card"><div class="Qixian-link-ic"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+title+'</div><div class="Qixian-tf-a" style="color:var(--sys-txt);">'+url+'</div></div></a>', true, isBlkRight);
        playSwoosh();
        appendCmd(isBlkRight ? '$[发送失败]' : '$[链接分享:'+title+'|'+url+']');
        Q('.Qixian-jlinkmodal').classList.remove('show');
        Q('.Qixian-jlinkurl').value='';
        Q('.Qixian-jlinktitle').value='';
    }
});

// 转账模态框
Q('.Qixian-jtfcancel').addEventListener('click', function(){
    Q('.Qixian-jtfmodal').classList.remove('show');
});
Q('.Qixian-jtfok').addEventListener('click', function(){
    var amt = Q('.Qixian-jtfamt').value,
        title = Q('.Qixian-jtftitle').value || '转账';
    if(amt>0){
        renderRight('<div class="Qixian-tf Qixian-j-pure-tf" data-amt="'+parseFloat(amt).toFixed(2)+'"><div class="Qixian-tf-ic">¥</div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+title+'</div><div class="Qixian-tf-a">¥ '+parseFloat(amt).toFixed(2)+'</div><div class="Qixian-tf-f">微信转账</div></div></div>', true, isBlkRight);
        playSwoosh();
        appendCmd(isBlkRight ? '$[发送失败]' : '$[转账:'+parseFloat(amt).toFixed(2)+':'+title+']');
        Q('.Qixian-jtfmodal').classList.remove('show');
        Q('.Qixian-jtfamt').value='';
        Q('.Qixian-jtftitle').value='';
    }
});

// 原图发送模态框
Q('.Qixian-jimgcancel').addEventListener('click', function(){
    Q('.Qixian-jimgmodal').classList.remove('show');
    Q('.Qixian-jimgurl').value='';
    Q('.Qixian-jimgdesc').value='';
});
Q('.Qixian-jimgok').addEventListener('click', function(){
    var url = Q('.Qixian-jimgurl').value.trim(),
        desc = Q('.Qixian-jimgdesc').value.trim() || '图片';
    if(url){
        var realUrl = getRealImgUrl(url);
        renderRight('<img src="'+realUrl+'" class="Qixian-img" alt="'+desc+'">', true, isBlkRight);
        playSwoosh();
        appendCmd(isBlkRight ? '$[发送失败]' : '$[图:'+url+'|'+desc+']');
        Q('.Qixian-jimgmodal').classList.remove('show');
        Q('.Qixian-jimgurl').value='';
        Q('.Qixian-jimgdesc').value='';
    }
});

// 文字图气泡模态框
Q('.Qixian-jtxtimgcancel').addEventListener('click', function(){
    Q('.Qixian-jtxtimgmodal').classList.remove('show');
    Q('.Qixian-jtxtimgin').value='';
});
Q('.Qixian-jtxtimgok').addEventListener('click', function(){
    var txt = Q('.Qixian-jtxtimgin').value.trim();
    if(txt) {
        renderRight('<div class="Qixian-txt-img">'+txt+'</div>', true, isBlkRight);
        playSwoosh();
        appendCmd(isBlkRight ? '$[发送失败]' : '$[文图:'+txt+']');
        Q('.Qixian-jtxtimgmodal').classList.remove('show');
        Q('.Qixian-jtxtimgin').value='';
    }
});

// 外卖下单模态框
Q('.Qixian-jfoodcancel').addEventListener('click', function(){
    Q('.Qixian-jfoodmodal').classList.remove('show');
});
Q('.Qixian-jfoodok').addEventListener('click', function(){
    var shop = Q('.Qixian-jfoodshop').value.trim() || '外卖派送',
        items = Q('.Qixian-jfooditems').value.trim() || '神秘大餐',
        addr = Q('.Qixian-jfoodaddr').value.trim() || '默认地址',
        name = Q('.Qixian-jfoodname').value.trim() || '收件人',
        phone = Q('.Qixian-jfoodphone').value.trim() || '138****0000';
    renderRight('<div class="Qixian-tf Qixian-food-card"><div class="Qixian-food-ic" style="background:rgba(255,255,255,0.6);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"></path><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg></div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+shop+'</div><div class="Qixian-tf-a" style="color:var(--sys-txt);">'+items+'</div><div class="Qixian-tf-f" style="margin-top:2px;padding-top:2px;">'+addr+'</div></div></div>', true, isBlkRight);
    playSwoosh();
    appendCmd(isBlkRight ? '$[发送失败]' : '$[外卖订单:'+shop+'|'+items+'|'+name+' '+phone+' '+addr+']');
    Q('.Qixian-jfoodmodal').classList.remove('show');
    Q('.Qixian-jfoodshop').value='';
    Q('.Qixian-jfooditems').value='';
    Q('.Qixian-jfoodaddr').value='';
    Q('.Qixian-jfoodname').value='';
    Q('.Qixian-jfoodphone').value='';
});

// 位置共享模态框
Q('.Qixian-jlocclose').addEventListener('click', function(){
    Q('.Qixian-jlocmodal').classList.remove('show');
});
Q('.Qixian-jlocsend').addEventListener('click', function(){
    Q('.Qixian-jlocinputmodal').classList.add('show');
});
Q('.Qixian-jlocincancel').addEventListener('click', function(){
    Q('.Qixian-jlocinputmodal').classList.remove('show');
});
Q('.Qixian-jlocinok').addEventListener('click', function(){
    var p = Q('.Qixian-jlocin-pos').value.trim() || '我的位置',
        d = Q('.Qixian-jlocin-dist').value.trim() || '未知距离';
    renderRight('<div class="Qixian-tf Qixian-loc-card"><div class="Qixian-link-ic" style="border-radius:50%;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="Qixian-tf-info"><div class="Qixian-tf-t">'+p+'</div><div class="Qixian-tf-a" style="color:var(--sys-txt);">'+(d.includes('距离')?d:'距离 '+d)+'</div></div></div>', true, isBlkRight);
    playSwoosh();
    appendCmd(isBlkRight ? '$[发送失败]' : '$[定位分享:'+p+'|'+(d.includes('距离')?d:'距离 '+d)+']');
    Q('.Qixian-jlocinputmodal').classList.remove('show');
    Q('.Qixian-jlocmodal').classList.remove('show');
    Q('.Qixian-jlocin-pos').value='';
    Q('.Qixian-jlocin-dist').value='';
});

// ========== 手绘涂鸦核心逻辑 ==========
var drawCanvas = Q('.Qixian-jdrawcanvas'),
    drawCtx = drawCanvas.getContext('2d'),
    isDrawing = false,
    lastX = 0, lastY = 0,
    isEraser = false,
    drawHistory = [];

function saveDrawState() {
    drawHistory.push(drawCanvas.toDataURL());
    if(drawHistory.length > 20) drawHistory.shift();
}
function resetDrawBoard(){
    drawCtx.globalCompositeOperation = 'source-over';
    drawCtx.fillStyle = '#ffffff';
    drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
    drawHistory = [];
}
function getDrawPos(e) {
    var r = drawCanvas.getBoundingClientRect();
    var cx = e.touches ? e.touches[0].clientX : e.clientX;
    var cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: cx - r.left, y: cy - r.top };
}
function startDraw(e) {
    e.preventDefault();
    isDrawing = true;
    saveDrawState();
    var p = getDrawPos(e);
    lastX = p.x; lastY = p.y;
}
function runDraw(e) {
    if(!isDrawing) return;
    e.preventDefault();
    var p = getDrawPos(e);
    drawCtx.beginPath();
    drawCtx.moveTo(lastX, lastY);
    drawCtx.lineTo(p.x, p.y);
    drawCtx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
    drawCtx.strokeStyle = Q('.Qixian-jdrawcolor').value;
    drawCtx.lineWidth = Q('.Qixian-jdrawwidth').value;
    if(isEraser) drawCtx.lineWidth = Math.max(10, Q('.Qixian-jdrawwidth').value * 2);
    drawCtx.lineCap = 'round';
    drawCtx.lineJoin = 'round';
    drawCtx.stroke();
    lastX = p.x; lastY = p.y;
}
function stopDraw(e) {
    e.preventDefault();
    isDrawing = false;
}

// 绑定画布事件
drawCanvas.addEventListener('mousedown', startDraw);
drawCanvas.addEventListener('mousemove', runDraw);
drawCanvas.addEventListener('mouseup', stopDraw);
drawCanvas.addEventListener('mouseout', stopDraw);
drawCanvas.addEventListener('touchstart', startDraw, {passive: false});
drawCanvas.addEventListener('touchmove', runDraw, {passive: false});
drawCanvas.addEventListener('touchend', stopDraw, {passive: false});

// 涂鸦工具栏
Q('.Qixian-jdrawclear').addEventListener('click', resetDrawBoard);
Q('.Qixian-jdrawundo').addEventListener('click', function(){
    if(drawHistory.length > 0) {
        var img = new Image();
        img.src = drawHistory.pop();
        img.onload = function() {
            drawCtx.globalCompositeOperation = 'source-over';
            drawCtx.clearRect(0,0,drawCanvas.width,drawCanvas.height);
            drawCtx.drawImage(img,0,0);
        };
    } else {
        resetDrawBoard();
    }
});
Q('.Qixian-jdraweraser').addEventListener('click', function(){
    isEraser = !isEraser;
    this.style.background = isEraser ? '#eeeeee' : '';
    this.style.color = isEraser ? '#333' : '';
});
Q('.Qixian-jdrawcancel').addEventListener('click', function(){
    Q('.Qixian-jdrawmodal').classList.remove('show');
});
Q('.Qixian-jdrawok').addEventListener('click', function(){
    drawCtx.globalCompositeOperation = 'source-over';
    var b64 = drawCanvas.toDataURL('image/jpeg', 0.6);
    var shortId = 'local-draw-' + Date.now();
    try { QxStore.set('Qx-' + shortId, b64); } catch(e){}
    renderRight('<img src="'+b64+'" class="Qixian-img" alt="手绘涂鸦">', true, isBlkRight);
    playSwoosh();
    appendCmd(isBlkRight ? '$[发送失败]' : '$[图:'+shortId+'|手绘涂鸦]');
    Q('.Qixian-jdrawmodal').classList.remove('show');
});


// 通话按钮事件绑定
Q('.Qixian-jcall-cancel').addEventListener('click', function(e){
    e.stopPropagation();
    closeCall();
    appendCmd('$[挂断通话]');
});
Q('.Qixian-jcall-answer').addEventListener('click', function(e){
    e.stopPropagation();
    setActiveCall();
    appendCmd('$[接听通话]');
});
Q('.Qixian-jcall-reject').addEventListener('click', function(e){
    e.stopPropagation();
    closeCall();
    renderRight('<div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:18px;display:flex;align-items:center;justify-content:center;color:#666;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 4.5l-2-2a2 2 0 0 0-2.83 0l-2 2a2 2 0 0 0 0 2.83l9 9a2 2 0 0 0 2.83 0l2-2a2 2 0 0 0 0-2.83z"/><path d="M14 8h5v5"/><path d="M19 8l-5 5"/></svg></div><span style="font-size:13px;color:#333;">已拒绝</span></div>', false, false);
    appendCmd('$[拒绝通话]');
});
Q('.Qixian-jcall-end').addEventListener('click', function(e){
    e.stopPropagation();
    var dur = formatTime(callSec);
    closeCall();
    appendCmd('$[挂断通话:' + dur + ']');
});
Q('.Qixian-jcall-send').addEventListener('click', function(e){
    e.stopPropagation();
    var t = Q('.Qixian-jcall-in').value.trim();
    if(t) {
        var isVid = Q('.Qixian-jcall').classList.contains('video');
        addCallBubble('right', t, false);
        playSwoosh();
        appendCmd((isVid ? '$[视频:' : '$[通话:') + t + ']');
        Q('.Qixian-jcall-in').value = '';
    }
});

// 通话最小化与拖拽
var callDragItem = Q('.Qixian-jcall'),
    cDragging = false,
    cStartX = 0, cStartY = 0,
    cInitX = 0, cInitY = 0,
    cxOff = 0, cyOff = 0,
    cCurrX = 0, cCurrY = 0,
    cDragMoved = false;

function cDragStart(e) {
    if (!callDragItem.classList.contains('minimized')) return;
    cStartX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    cStartY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    cInitX = cStartX - cxOff;
    cInitY = cStartY - cyOff;
    cDragging = true;
    cDragMoved = false;
}
function cDrag(e) {
    if (!cDragging) return;
    var cx = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    var cy = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
    if(Math.abs(cx - cStartX) > 5 || Math.abs(cy - cStartY) > 5) cDragMoved = true;
    if(cDragMoved) e.preventDefault();
    cCurrX = cx - cInitX;
    cCurrY = cy - cInitY;
    cxOff = cCurrX;
    cyOff = cCurrY;
    callDragItem.style.transform = "translate3d(" + cCurrX + "px, " + cCurrY + "px, 0)";
}
function cDragEnd(e) {
    cInitX = cCurrX;
    cInitY = cCurrY;
    cDragging = false;
}

callDragItem.addEventListener("touchstart", cDragStart, {passive: false});
document.addEventListener("touchmove", cDrag, {passive: false});
document.addEventListener("touchend", cDragEnd);
callDragItem.addEventListener("mousedown", cDragStart);
document.addEventListener("mousemove", cDrag);
document.addEventListener("mouseup", cDragEnd);

callDragItem.addEventListener('click', function(e){
    if(this.classList.contains('minimized') && !cDragMoved){
        this.classList.remove('minimized');
        cxOff = 0; cyOff = 0;
        this.style.transform = 'none';
    }
});
Q('.Qixian-jcall-mini-top').addEventListener('click', function(e){
    e.stopPropagation();
    Q('.Qixian-jcall').classList.add('minimized');
});

// ========== 表情包与互动游戏 ==========
var baseEmojiArr = [
    { i: 'https://tuchuang.org.cn/imgs/2026/03/26/8abc1e15982dce90.png', t: '宝宝我惹你了吗？' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/28482bc17ee1902a.png', t: '兄弟，我长得太帅被人打了' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/c8edbc471b99ec2d.png', t: '分享位置，床上' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/108aa5ff7f102a0f.png', t: '听说你要洗澡' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/14bc30cf3153af0f.png', t: '不乘，打屁屁咯' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/f28c9fdf5230efc0.png', t: '你也很为我着迷吧？' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/603a9d2dd3ba1db1.png', t: '偶哭叻，你满意了吧？' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/29/56d88bd75de484f0.png', t: '电你，在心跳吗？' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/26/a2350084ec1eb9e1.jpg', t: '淦他妈的，我要吃软饭' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/26/9638432efdd2a0dc.png', t: '哞哞哒[么么哒]' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/26/ecc00661053e774d.png', t: '吐舌' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/26/1a553718ed2b2347.png', t: '这个世界有问题' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/27/d38af7021b9631f1.png', t: '让我喊出我爱你' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/27/b68c231476fd9735.png', t: '叼花表情包' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/27/29907ae552edde90.png', t: '抽象人物' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/27/a082ed0adae88380.png', t: '龙图拿杯子' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/27/ca976c11387dc5e8.png', t: '龙图鄙夷' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/27/422696afc246a494.png', t: '猴子搓手' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/27/c21b68dbdf340f36.png', t: '搞怪龙图' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/28/f369ba2676f4283c.png', t: '沸羊羊耍帅' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/28/be2862ca6b4b0c3a.png', t: '抽象简笔画' },
    { i: 'https://tuchuang.org.cn/imgs/2026/03/28/e7362ce1784f5c46.png', t: '我要去找上帝告状' },
    { i: 'https://pic1.imgdb.cn/item/6a4cab64531aaa3c3f265491.jpg', t: '简笔画龙图' },
    { i: 'https://pic1.imgdb.cn/item/6a4caf33531aaa3c3f26590d.jpg', t: '出来亲嘴' }
];
var customEmoStr = QxStore.get('Qx-custom-emos');
var customEmoArr = customEmoStr ? JSON.parse(customEmoStr) : [];

function renderEmoList() {
    var all = customEmoArr.concat(baseEmojiArr);
    var html = all.map(function(x){
        return '<div class="Qixian-emo-card" data-url="'+x.i+'" data-txt="'+x.t+'"><img class="Qixian-emo-img" src="'+x.i+'"><div class="Qixian-emo-t">'+x.t+'</div></div>';
    }).join('');
    Q('.Qixian-jemolist').innerHTML = html;
    QA('.Qixian-emo-card').forEach(function(c){
        c.addEventListener('click', function(){
            renderRight('<img src="'+this.getAttribute('data-url')+'" class="Qixian-img" alt="'+this.getAttribute('data-txt')+'">', true, isBlkRight);
            playSwoosh();
            appendCmd(isBlkRight ? '!['+this.getAttribute('data-txt')+'](发送失败)' : '!['+this.getAttribute('data-txt')+']('+this.getAttribute('data-url')+')');
            Q('.Qixian-jemomodal').classList.remove('show');
        });
    });
}
renderEmoList();

Q('.Qixian-jemoclose').addEventListener('click', function(){
    Q('.Qixian-jemomodal').classList.remove('show');
});
Q('.Qixian-jaddemobtn').addEventListener('click', function(){
    Q('.Qixian-jaddemomodal').classList.add('show');
    Q('.Qixian-jemomodal').classList.remove('show');
});
Q('.Qixian-jaddemocancel').addEventListener('click', function(){
    Q('.Qixian-jaddemomodal').classList.remove('show');
    Q('.Qixian-jemomodal').classList.add('show');
});
Q('.Qixian-jaddemook').addEventListener('click', function(){
    var u = Q('.Qixian-jaddemourl').value.trim(),
        t = Q('.Qixian-jaddemotxt').value.trim() || '自定义表情';
    if(u) {
        customEmoArr.unshift({i:u, t:t});
        QxStore.set('Qx-custom-emos', JSON.stringify(customEmoArr));
        renderEmoList();
        Q('.Qixian-jaddemourl').value='';
        Q('.Qixian-jaddemotxt').value='';
    }
    Q('.Qixian-jaddemomodal').classList.remove('show');
    Q('.Qixian-jemomodal').classList.add('show');
});

// 互动小游戏
Q('.jemo-poke').addEventListener('click', function(){
    var ic = '<div class="Qixian-interact-item Qixian-anim-poke"><svg viewBox="0 0 24 24"><path d="M11 2a2 2 0 0 0-2 2v5H6a2 2 0 0 0-2 2v2c0 4.4 3.6 8 8 8h3a5 5 0 0 0 5-5v-6a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2z"/></svg></div>';
    renderRight(ic, true, isBlkRight);
    appendCmd(isBlkRight ? '$[发送失败]' : '$[戳一戳:' + finalRName + ' 戳了戳 ' + finalLName + ']');
    playSwoosh();
    Q('.Qixian-jemomodal').classList.remove('show');
});
Q('.jemo-dice').addEventListener('click', function(){
    var pt = Math.floor(Math.random() * 6) + 1;
    var dots='';
    if(pt==1) dots='<circle cx="12" cy="12" r="1.5"/>';
    else if(pt==2) dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/>';
    else if(pt==3) dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/>';
    else if(pt==4) dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/>';
    else if(pt==5) dots='<circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/>';
    else dots='<circle cx="8.5" cy="7" r="1.5"/><circle cx="15.5" cy="7" r="1.5"/><circle cx="8.5" cy="12" r="1.5"/><circle cx="15.5" cy="12" r="1.5"/><circle cx="8.5" cy="17" r="1.5"/><circle cx="15.5" cy="17" r="1.5"/>';
    var ic = '<div class="Qixian-interact-item Qixian-anim-dice"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>'+dots+'</svg></div>';
    renderRight(ic, true, isBlkRight);
    appendCmd(isBlkRight ? '$[发送失败]' : '$[摇骰子:'+pt+'点]');
    playSwoosh();
    Q('.Qixian-jemomodal').classList.remove('show');
});
Q('.jemo-rps').addEventListener('click', function(){
    var arr = ['剪刀', '石头', '布'];
    var res = arr[Math.floor(Math.random() * 3)];
    var qSvg = '';
    if(res==='剪刀') qSvg = '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>';
    else if(res==='石头') qSvg = '<svg viewBox="0 0 24 24"><path d="M10 15v-5a2 2 0 0 1 4 0v5"/><path d="M14 15v-4a2 2 0 0 1 4 0v4"/><path d="M6 15v-3a2 2 0 0 1 4 0v3"/><path d="M18 15v-2a2 2 0 0 1 4 0v3c0 4-3 7-7 7H9c-4 0-7-3-7-7v-3a2 2 0 0 1 4 0v4"/></svg>';
    else qSvg = '<svg viewBox="0 0 24 24"><path d="M10 15V4a2 2 0 0 1 4 0v11"/><path d="M14 15V5a2 2 0 0 1 4 0v10"/><path d="M6 15V6a2 2 0 0 1 4 0v9"/><path d="M18 15v-2a2 2 0 0 1 4 0v3c0 4-3 7-7 7H9c-4 0-7-3-7-7V9a2 2 0 0 1 4 0v6"/></svg>';
    var ic = '<div class="Qixian-interact-item Qixian-anim-rps">'+qSvg+'</div>';
    renderRight(ic, true, isBlkRight);
    appendCmd(isBlkRight ? '$[发送失败]' : '$[猜拳:'+res+']');
    playSwoosh();
    Q('.Qixian-jemomodal').classList.remove('show');
});


// 语音输入与录音降级
var micBtn = Q('.Qixian-jmic'),
    isRec = false,
    finalTxt = '',
    pWin = window.parent,
    SR = pWin.SpeechRecognition || pWin.webkitSpeechRecognition || window.SpeechRecognition || window.webkitSpeechRecognition,
    pNav = pWin.navigator || navigator,
    mediaRec = null,
    recStartTime = 0,
    tempVoiceDur = null;

function voiceBubble(txt, dur){
    renderRight('<div class="Qixian-au" data-txt="'+txt+'"><div class="Qixian-au-main"><div class="Qixian-au-play"></div><div class="Qixian-au-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="Qixian-au-dur">'+dur+'</div></div><div class="Qixian-au-wrap"><div class="Qixian-au-txt">'+txt+'</div></div></div>', true, isBlkRight);
    playSwoosh();
    appendCmd(isBlkRight ? '$[发送失败]' : '$[语音:'+dur+'|'+txt+']');
}
function fallback(err){
    var modal = Q('.Qixian-jvoicemodal');
    var txtArea = Q('.Qixian-jvoicetxt');
    modal.classList.add('show');
    txtArea.value = '';
    txtArea.placeholder = (err?err+'，':'') + '麦克风降级，请手动输入刚刚语音内容的文字...';
    setTimeout(function(){ txtArea.focus(); }, 100);
}

Q('.Qixian-jvoicecancel').addEventListener('click', function(){
    Q('.Qixian-jvoicemodal').classList.remove('show');
    tempVoiceDur = null;
});
Q('.Qixian-jvoiceok').addEventListener('click', function(){
    var txt = Q('.Qixian-jvoicetxt').value.trim();
    if(txt) {
        var dur = tempVoiceDur || (Math.max(1, Math.round(txt.length/4))+'"');
        voiceBubble(txt, dur);
    }
    Q('.Qixian-jvoicemodal').classList.remove('show');
    tempVoiceDur = null;
});

function setupSR() {
    if(window.voiceObj) return true;
    if(!SR) return false;
    try {
        window.voiceObj = new SR();
        window.voiceObj.continuous = true;
        window.voiceObj.interimResults = true;
        window.voiceObj.onresult = function(ev){
            for(var i=ev.resultIndex; i<ev.results.length; i++) {
                if(ev.results[i].isFinal) finalTxt += ev.results[i][0].transcript;
            }
        };
        window.voiceObj.onerror = function(ev){
            if(ev.error !== 'no-speech') {
                isRec=false;
                micBtn.classList.remove('rec');
                fallback(ev.error==='not-allowed'?'权限被拒':'识别被中断');
            }
        };
        window.voiceObj.onend = function(){
            if(isRec) {
                try{ window.voiceObj.start(); }catch(e){}
            } else {
                micBtn.classList.remove('rec');
                if(finalTxt.trim()) voiceBubble(finalTxt.trim(), Math.max(1, Math.round(finalTxt.length/4))+'"');
            }
        };
        return true;
    } catch(e) { return false; }
}

function startMediaRecord() {
    if(pNav.mediaDevices && pNav.mediaDevices.getUserMedia) {
        pNav.mediaDevices.getUserMedia({audio: true}).then(function(stream){
            var MR = pWin.MediaRecorder || window.MediaRecorder;
            mediaRec = new MR(stream);
            mediaRec.onstop = function(){
                var dur = Math.max(1, Math.round((Date.now() - recStartTime)/1000));
                stream.getTracks().forEach(function(t){ t.stop(); });
                tempVoiceDur = dur + '"';
                fallback('语音录制完毕 (真实时长: ' + dur + '秒)');
            };
            recStartTime = Date.now();
            mediaRec.start();
            isRec = true;
            micBtn.classList.add('rec');
        }).catch(function(){
            fallback('麦克风被占用或拒绝');
        });
    } else {
        fallback('浏览器环境不支持录音');
    }
}

micBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(isRec){
        isRec = false;
        micBtn.classList.remove('rec');
        if(window.voiceObj) {
            try{ window.voiceObj.stop(); }catch(err){}
        }
        if(mediaRec && mediaRec.state !== 'inactive') {
            try{ mediaRec.stop(); }catch(err){}
        }
    } else {
        var isEdgeAndroid = navigator.userAgent.includes('EdgA');
        if(SR && !isEdgeAndroid && setupSR()) {
            finalTxt = '';
            try {
                window.voiceObj.lang = langMap[langIdx].l;
                window.voiceObj.start();
                isRec = true;
                micBtn.classList.add('rec');
            } catch(err) {
                isRec = false;
                micBtn.classList.remove('rec');
                fallback('引擎启动异常');
            }
        } else {
            startMediaRecord();
        }
    }
});

    var song = muList[muIndex];
    Q('.Qixian-jmunow').textContent = song.name + ' - ' + song.artist;
    if(muPlaying) {
        Q('.Qixian-jmuwaves').classList.add('playing');
        Q('.Qixian-jmuicon').innerHTML = '<rect x="6" y="4" width="4" height="16" fill="#222"/><rect x="14" y="4" width="4" height="16" fill="#222"/>';
        if(!muTimer) {
            muTimer = setInterval(function(){
                muTotalMin++;
                Q('#Qx-mutime-val').textContent = muTotalMin;
            }, 60000);
        }
    } else {
        Q('.Qixian-jmuwaves').classList.remove('playing');
        Q('.Qixian-jmuicon').innerHTML = '<polygon points="7 4 19 12 7 20 7 4" fill="#222"/>';
    }
}

function bindExtraEvents() {
Q('.Qixian-jmuaddbtn').addEventListener('click', function(){
    var name = Q('.Qixian-jmuname').value.trim() || '未知歌曲';
    var artist = Q('.Qixian-jmuartist').value.trim() || '未知歌手';
    var cover = Q('.Qixian-jmucover').value.trim() || '';
    var url = Q('.Qixian-jmuinp').value.trim() || '';
    if(name) {
        muList.push({ name: name, artist: artist, cover: cover, url: url });
        renderMuList();
        Q('.Qixian-jmuname').value = '';
        Q('.Qixian-jmuartist').value = '';
        Q('.Qixian-jmucover').value = '';
        Q('.Qixian-jmuinp').value = '';
    }
});

Q('.Qixian-jmuplay').addEventListener('click', function(){
    if(muList.length === 0) return;
    if(muIndex < 0) muIndex = 0;
    muPlaying = !muPlaying;
            updateMuPlayState();
});
Q('.Qixian-jmuprev').addEventListener('click', function(){
    if(muList.length === 0) return;
    muIndex = (muIndex - 1 + muList.length) % muList.length;
            updateMuPlayState();
    renderMuList();
});
Q('.Qixian-jmunext').addEventListener('click', function(){
    if(muList.length === 0) return;
    muIndex = (muIndex + 1) % muList.length;
            updateMuPlayState();
    renderMuList();
});

Q('.Qixian-jmuinv').addEventListener('click', function(){
    if(muIndex < 0) return;
    var song = muList[muIndex];
    renderRight('<div class="Qixian-music-share-card Qixian-tf"><div class="Qixian-msc-top"><div class="Qixian-msc-cover" style="background-image:url(\''+(song.cover || safeRAv)+'\');"><div class="Qixian-msc-playic"><svg viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4"/></svg></div></div><div class="Qixian-msc-info"><div class="Qixian-msc-name">'+song.name+'</div><div class="Qixian-msc-artist">'+song.artist+'</div></div></div><div class="Qixian-msc-bot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"></path></svg>一起听歌</div></div>', true, isBlkRight);
    playSwoosh();
    appendCmd(isBlkRight ? '$[发送失败]' : '$[一起听歌邀请:'+song.name+'|'+song.artist+']');
    Q('.Qixian-jmumodal').classList.remove('show');
});



Q('.Qixian-jcpthingadd').addEventListener('click', function(){
    var who = Q('.Qixian-jcpwho').value;
    var text = Q('.Qixian-jcpthingin').value.trim();
    if(text) {
        cpThings.push({ who: who, text: text, done: false });
        renderCpThings();
        Q('.Qixian-jcpthingin').value = '';
    }
});

Q('.Qixian-jcpdayadd').addEventListener('click', function(){
    var name = Q('.Qixian-jcpdayname').value.trim();
    var date = Q('.Qixian-jcpdaydate').value;
    if(name && date) {
        cpDays.push({ name: name, date: date });
        renderCpDays();
        Q('.Qixian-jcpdayname').value = '';
        Q('.Qixian-jcpdaydate').value = '';
    }
});

Q('.Qixian-jcpalbumadd').addEventListener('click', function(){
    var txt = Q('.Qixian-jcpalbumtxt').value.trim();
    var img = Q('.Qixian-jcpalbumimg').value.trim();
    if(txt || img) {
        cpAlbums.push({ txt: txt, img: img, who: finalRName });
        renderCpAlbums();
        Q('.Qixian-jcpalbumtxt').value = '';
        Q('.Qixian-jcpalbumimg').value = '';
    }
});

// 情侣空间初始化
Q('.Qixian-jcprel').textContent = rawRel || '相恋中';
Q('.Qixian-jcsign').textContent = rawCSign || '暂无签名';
Q('.Qixian-jusign-disp').textContent = rawUSign || '点击下方发布你的个签';
Q('.Qixian-jusignsave').addEventListener('click', function(){
    var val = Q('.Qixian-jusignin').value.trim();
    if(val) {
        Q('.Qixian-jusign-disp').textContent = val;
        appendCmd('$[更新个签:'+val+']');
        playSwoosh();
        Q('.Qixian-jusignin').value = '';
    }
});

// ========== 朋友圈模块 ==========
var pyqList = [];
var curPyqIdx = -1;
var curReplyTarget = '';

function renderPyqList() {
    var html = '';
    pyqList.forEach(function(item, i){
        html += '<div class="Qixian-pyq-item" data-idx="'+i+'" data-txt="'+item.txt+'"><div class="Qixian-pyq-delbtn jpyqdel" data-idx="'+i+'" title="删除"><svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div><div class="Qixian-pyq-iav user-avatar" style="background-image:url(\''+safeRAv+'\');"></div><div class="Qixian-pyq-ict"><div class="Qixian-pyq-inm">'+finalRName+'</div>';
        if(item.txt) html += '<div class="Qixian-pyq-itxt">'+item.txt+'</div>';
        if(item.img) {
            if(item.img.startsWith('text:')) {
                html += '<div class="Qixian-pyq-txtimg Qixian-txt-img">'+item.img.replace('text:','')+'</div>';
            } else {
                html += '<img src="'+getRealImgUrl(item.img)+'" class="Qixian-pyq-iimg">';
            }
        }
        html += '<div class="Qixian-pyq-ibot"><span>'+item.time+'</span><div class="Qixian-pyq-iacts"><div class="Qixian-pyq-btn jpyqlike" data-idx="'+i+'"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><div class="Qixian-pyq-btn jpyqcom" data-idx="'+i+'"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div></div></div>';
        if(item.likes || item.comments) {
            html += '<div class="Qixian-pyq-ints">';
            if(item.likes) {
                html += '<div class="Qixian-pyq-likes"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'+item.likes+' 人觉得很赞</div>';
            }
            if(item.comments && item.comments.length) {
                html += '<div class="Qixian-pyq-coms">';
                item.comments.forEach(function(c){
                    html += '<div class="Qixian-pyq-com"><span>'+c.name+'</span>：'+c.txt+'</div>';
                });
                html += '</div>';
            }
            html += '</div>';
        }
        html += '</div></div>';
    });
    Q('.Qixian-jpyqlist').innerHTML = html;
    
    QA('.jpyqlike').forEach(function(btn){
        btn.addEventListener('click', function(){
            var idx = parseInt(this.getAttribute('data-idx'));
            playSwoosh();
            appendCmd('$[点赞朋友圈:'+pyqList[idx].time+']');
            this.style.color='#222';
            this.querySelector('svg').style.fill='#222';
            var item = this.closest('.Qixian-pyq-item');
            var ints = item.querySelector('.Qixian-pyq-ints');
            if(!ints) {
                ints = document.createElement('div');
                ints.className='Qixian-pyq-ints';
                item.querySelector('.Qixian-pyq-ict').appendChild(ints);
            }
            var likes = ints.querySelector('.Qixian-pyq-likes');
            if(!likes) {
                likes = document.createElement('div');
                likes.className='Qixian-pyq-likes';
                likes.innerHTML='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>你觉得很赞';
                ints.insertBefore(likes, ints.firstChild);
            }
        });
    });
    
    QA('.jpyqcom').forEach(function(btn){
        btn.addEventListener('click', function(){
            curPyqIdx = parseInt(this.getAttribute('data-idx'));
            curReplyTarget = '';
            Q('.Qixian-jpyqcomtxt').placeholder = '说点什么...';
            Q('.Qixian-jpyqcommodal').classList.add('show');
        });
    });
    
    QA('.jpyqdel').forEach(function(btn){
        btn.addEventListener('click', function(){
            var idx = parseInt(this.getAttribute('data-idx'));
            pyqList.splice(idx, 1);
            renderPyqList();
            playSwoosh();
            appendCmd('$[删除朋友圈]');
        });
    });
}

Q('.Qixian-jpyqsendok').addEventListener('click', function(){
    var t = Q('.Qixian-jpyqsendtxt').value.trim();
    var i = Q('.Qixian-jpyqsendimg').value.trim();
    var ti = Q('.Qixian-jpyqsendtxtimg').value.trim();
    if(t || i || ti){
        playSwoosh();
        var payloadI = i ? i : (ti ? 'text:'+ti : '');
        appendCmd('$[发布朋友圈:'+t+'|'+payloadI+']');
        pyqList.unshift({
            txt: t,
            img: payloadI,
            time: '刚刚',
            likes: 0,
            comments: []
        });
        renderPyqList();
        Q('.Qixian-jpyqsendmodal').classList.remove('show');
        Q('.Qixian-jpyqsendtxt').value='';
        Q('.Qixian-jpyqsendimg').value='';
        Q('.Qixian-jpyqsendtxtimg').value='';
    }
});
Q('.Qixian-jpyqsendcancel').addEventListener('click', function(){
    Q('.Qixian-jpyqsendmodal').classList.remove('show');
});
Q('.Qixian-jpyqcomcancel').addEventListener('click', function(){
    Q('.Qixian-jpyqcommodal').classList.remove('show');
});
Q('.Qixian-jpyqcomok').addEventListener('click', function(){
    var t = Q('.Qixian-jpyqcomtxt').value.trim();
    if(t){
        playSwoosh();
        appendCmd('$[评论朋友圈:'+t+']');
        if(curPyqIdx >= 0 && pyqList[curPyqIdx]) {
            if(!pyqList[curPyqIdx].comments) pyqList[curPyqIdx].comments = [];
            pyqList[curPyqIdx].comments.push({ name: finalRName, txt: t });
            renderPyqList();
        }
        Q('.Qixian-jpyqcommodal').classList.remove('show');
        Q('.Qixian-jpyqcomtxt').value='';
    }
});

// 朋友圈头像与背景自定义
Q('.Qixian-jpyq-uav').addEventListener('click', function(){
    var fileInp = document.createElement('input');
    fileInp.type = 'file';
    fileInp.accept = 'image/*';
    fileInp.onchange = function(e){
        var f = e.target.files[0];
        if(!f) return;
        var reader = new FileReader();
        reader.onload = function(re){
            var b64 = re.target.result;
            QxStore.set('Qx-pyq-uav', b64);
            QA('.Qixian-pyq-uav, .Qixian-pyq-iav').forEach(function(el){
                el.style.backgroundImage = 'url(\''+b64.replace(/'/g,'%27')+'\')';
            });
        };
        reader.readAsDataURL(f);
    };
    fileInp.click();
});
Q('.Qixian-jpyq-cover').addEventListener('click', function(){
    var fileInp = document.createElement('input');
    fileInp.type = 'file';
    fileInp.accept = 'image/*';
    fileInp.onchange = function(e){
        var f = e.target.files[0];
        if(!f) return;
        var reader = new FileReader();
        reader.onload = function(re){
            var b64 = re.target.result;
            QxStore.set('Qx-pyq-cover', b64);
            Q('.Qixian-jpyq-cover').style.backgroundImage = 'url(\''+b64.replace(/'/g,'%27')+'\')';
        };
        reader.readAsDataURL(f);
    };
    fileInp.click();
});

// 初始化朋友圈本地缓存
var savedPyqCover = QxStore.get('Qx-pyq-cover');
if(savedPyqCover) Q('.Qixian-jpyq-cover').style.backgroundImage = 'url(\''+savedPyqCover.replace(/'/g,'%27')+'\')';
var savedPyqUav = QxStore.get('Qx-pyq-uav');
if(savedPyqUav) {
    QA('.Qixian-pyq-uav, .Qixian-pyq-iav').forEach(function(el){
        el.style.backgroundImage = 'url(\''+savedPyqUav.replace(/'/g,'%27')+'\')';
    });
}
   }
      // ===================== 7. 主入口 =====================

    function buildHTML() {
        var wrap = document.createElement('div');
        wrap.id = CONTAINER_ID;
        wrap.innerHTML = '<div class="Qixian-root Qixian-stage" id="qixian-root">' +
            '<div class="Qixian-phone-wrap"><div class="Qixian-phone">' +
            '<div class="Qixian-bg Qixian-jbg"></div>' +
            '<div class="Qixian-notch"></div>' +
            // 顶部栏
            '<div class="Qixian-hd Qixian-jhd">' +
            '<div class="Qixian-hd-pull Qixian-jhd-toggle"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></div>' +
            '<div class="Qixian-hd-mid">' +
            '<div class="Qixian-ubox"><div class="Qixian-uav Qixian-bind-lav char-avatar"></div><div class="Qixian-uname" contenteditable="true">角色</div></div>' +
            '<div class="Qixian-waves"><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span></div>' +
            '</div>' +
            '<div class="Qixian-icons-rt"><div class="Qixian-icbtn Qixian-jset-open"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div></div>' +
            '</div>' +
            // 聊天区
            '<div class="Qixian-chat Qixian-jchat"></div>' +
            // 底部输入区
            '<div class="Qixian-ft">' +
            '<div class="Qixian-reply-bar"><span class="Qixian-reply-txt"></span><span class="Qixian-reply-close Qixian-jrepclose">×</span></div>' +
            '<div class="Qixian-in-area">' +
            '<div class="Qixian-lang">中</div>' +
            '<input class="Qixian-input Qixian-jinput" placeholder="说点什么..." />' +
            '<div class="Qixian-mic Qixian-jmic"><svg viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></div>' +
            '<div class="Qixian-plus Qixian-jplus"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>' +
            '<div class="Qixian-send Qixian-jsend"><svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></div>' +
            '</div>' +
            // 加号面板
            '<div class="Qixian-panel Qixian-jpanel">' +
            '<div class="Qixian-pi Qixian-jbtn-voice"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div class="Qixian-ptx">语音通话</div></div>' +
            '<div class="Qixian-pi Qixian-jbtn-video"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></div><div class="Qixian-ptx">视频通话</div></div>' +
            '<div class="Qixian-pi Qixian-jimgbtn"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div><div class="Qixian-ptx">图片</div></div>' +
            '<div class="Qixian-pi Qixian-jtxtimg"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg></div><div class="Qixian-ptx">文字图</div></div>' +
            '<div class="Qixian-pi Qixian-jgiftbtn"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg></div><div class="Qixian-ptx">礼物</div></div>' +
            '<div class="Qixian-pi Qixian-jlinkbtn"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div><div class="Qixian-ptx">链接</div></div>' +
            '<div class="Qixian-pi Qixian-jtf"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><div class="Qixian-ptx">转账</div></div>' +
            '<div class="Qixian-pi Qixian-jemo"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div><div class="Qixian-ptx">表情</div></div>' +
            '<div class="Qixian-pi Qixian-jmusic"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div><div class="Qixian-ptx">一起听歌</div></div>' +
            '<div class="Qixian-pi Qixian-jcp"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><div class="Qixian-ptx">情侣空间</div></div>' +
            '<div class="Qixian-pi Qixian-jbtn-loc"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div class="Qixian-ptx">位置</div></div>' +
            '<div class="Qixian-pi Qixian-jbtn-food"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg></div><div class="Qixian-ptx">外卖</div></div>' +
            '<div class="Qixian-pi Qixian-jbtn-draw"><div class="Qixian-pic"><svg viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div><div class="Qixian-ptx">涂鸦</div></div>' +
            '</div></div>' +
            // 通话层
            '<div class="Qixian-call Qixian-jcall">' +
            '<div class="Qixian-call-vbg"></div><div class="Qixian-call-pip Qixian-bind-rav-bg"></div>' +
            '<div class="Qixian-call-mini-top"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg></div>' +
            '<div class="Qixian-call-mini-hint"></div>' +
            '<div class="Qixian-call-ct">' +
            '<div class="Qixian-call-avs"><div class="Qixian-call-av Qixian-jcall-lav Qixian-bind-lav char-avatar"></div><div class="Qixian-call-av Qixian-jcall-rav Qixian-bind-rav user-avatar"></div></div>' +
            '<div class="Qixian-call-nm">角色</div><div class="Qixian-call-st">等待接听...</div><div class="Qixian-call-timer Qixian-jcall-timer">00:00</div>' +
            '<div class="Qixian-call-bubs Qixian-jcall-bubs"></div>' +
            '<div class="Qixian-call-ft">' +
            '<div class="Qixian-call-btns btns-out"><div class="Qixian-call-btn cancel Qixian-jcall-cancel"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div></div>' +
            '<div class="Qixian-call-btns btns-in"><div class="Qixian-call-btn hangup Qixian-jcall-reject"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div><div class="Qixian-call-btn answer Qixian-jcall-answer"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div></div>' +
            '<div class="Qixian-call-inrow"><div class="Qixian-call-btn mini Qixian-jcall-end"><svg viewBox="0 0 24 24"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/></svg></div><input class="Qixian-call-in Qixian-jcall-in" placeholder="通话中..." /><button class="Qixian-call-send Qixian-jcall-send">发送</button></div>' +
            '</div></div></div>' +
            // 设置面板
            '<div class="Qixian-set Qixian-jset"><div class="Qixian-set-h">设置<span class="Qixian-set-x Qixian-jset-close">×</span></div>' +
            '<div class="Qixian-set-r"><span>头像形状</span><div class="Qixian-color-wrap"><button class="Qixian-bg-btn Qixian-jav-round active">圆</button><button class="Qixian-bg-btn Qixian-jav-sq">方</button></div></div>' +
            '<div class="Qixian-set-r"><span>毛玻璃</span><div class="Qixian-color-wrap"><button class="Qixian-bg-btn Qixian-jglass-on active">开</button><button class="Qixian-bg-btn Qixian-jglass-off">关</button></div></div>' +
            '<div class="Qixian-set-r"><span>聊天背景</span><div class="Qixian-color-wrap"><input type="color" class="Qixian-jbg-color" value="#f7f7f7"><button class="Qixian-bg-btn Qixian-jbg-reset">重置</button></div></div>' +
            '</div>' +
            // 各模态框
            // 图片模态框
            '<div class="Qixian-cen Qixian-jimgmodal"><div class="Qixian-cen-box"><h4>发送图片</h4><input class="Qixian-cen-inp Qixian-jimgurl" placeholder="图片URL" /><input class="Qixian-cen-inp Qixian-jimgdesc" placeholder="描述（可选）" /><div class="Qixian-cen-btns"><button class="cc Qixian-jimgcancel">取消</button><button class="ok Qixian-jimgok">发送</button></div></div></div>' +
            // 文字图
            '<div class="Qixian-cen Qixian-jtxtimgmodal"><div class="Qixian-cen-box"><h4>文字图气泡</h4><textarea class="Qixian-jtxtimgin" rows="3" placeholder="输入文字..."></textarea><div class="Qixian-cen-btns"><button class="cc Qixian-jtxtimgcancel">取消</button><button class="ok Qixian-jtxtimgok">发送</button></div></div></div>' +
            // 礼物
            '<div class="Qixian-cen Qixian-jgiftmodal"><div class="Qixian-cen-box"><h4>送礼物</h4><input class="Qixian-cen-inp Qixian-jgiftpr" type="number" placeholder="金额" /><input class="Qixian-cen-inp Qixian-jgiftdesc" placeholder="礼物名称" /><input class="Qixian-cen-inp Qixian-jgiftnote" placeholder="附言（可选）" /><div class="Qixian-cen-btns"><button class="cc Qixian-jgiftcancel">取消</button><button class="ok Qixian-jgiftok">送出</button></div></div></div>' +
            // 链接
            '<div class="Qixian-cen Qixian-jlinkmodal"><div class="Qixian-cen-box"><h4>分享链接</h4><input class="Qixian-cen-inp Qixian-jlinkurl" placeholder="https://..." /><input class="Qixian-cen-inp Qixian-jlinktitle" placeholder="标题" /><div class="Qixian-cen-btns"><button class="cc Qixian-jlinkcancel">取消</button><button class="ok Qixian-jlinkok">分享</button></div></div></div>' +
            // 转账
            '<div class="Qixian-cen Qixian-jtfmodal"><div class="Qixian-cen-box"><h4>转账</h4><div class="Qixian-tf-grp"><span>¥</span><input type="number" class="Qixian-jtfamt" placeholder="0.00" /></div><input class="Qixian-cen-inp Qixian-jtftitle" placeholder="转账说明（可选）" /><div class="Qixian-cen-btns"><button class="cc Qixian-jtfcancel">取消</button><button class="ok Qixian-jtfok">转账</button></div></div></div>' +
            // 表情面板
            '<div class="Qixian-mf Qixian-jemomodal"><div class="mbox"><div class="Qixian-mh">表情<span class="Qixian-mc Qixian-jemoclose">×</span></div>' +
            '<div class="Qixian-emo-games"><div class="Qixian-emo-gamebtn jemo-poke"><svg viewBox="0 0 24 24"><path d="M11 2a2 2 0 0 0-2 2v5H6a2 2 0 0 0-2 2v2c0 4.4 3.6 8 8 8h3a5 5 0 0 0 5-5v-6a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2z"/></svg>戳一戳</div>' +
            '<div class="Qixian-emo-gamebtn jemo-dice"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/></svg>摇骰子</div>' +
            '<div class="Qixian-emo-gamebtn jemo-rps"><svg viewBox="0 0 24 24"><path d="M10 15V4a2 2 0 0 1 4 0v11"/></svg>猜拳</div>' +
            '<div class="Qixian-emo-addbtn Qixian-jaddemobtn"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></div>' +
            '<div class="Qixian-emo Qixian-jemolist"></div></div></div>' +
            // 添加表情
            '<div class="Qixian-cen Qixian-jaddemomodal"><div class="Qixian-cen-box"><h4>添加表情</h4><input class="Qixian-cen-inp Qixian-jaddemourl" placeholder="表情图片URL" /><input class="Qixian-cen-inp Qixian-jaddemotxt" placeholder="表情文字" /><div class="Qixian-cen-btns"><button class="cc Qixian-jaddemocancel">取消</button><button class="ok Qixian-jaddemook">添加</button></div></div></div>' +
            // 语音降级
            '<div class="Qixian-cen Qixian-jvoicemodal"><div class="Qixian-cen-box"><h4>语音转文字</h4><textarea class="Qixian-cen-inp Qixian-jvoicetxt" rows="3"></textarea><div class="Qixian-cen-btns"><button class="cc Qixian-jvoicecancel">取消</button><button class="ok Qixian-jvoiceok">发送</button></div></div></div>' +
            // 一起听歌
            '<div class="Qixian-mf Qixian-jmumodal"><div class="mbox"><div class="Qixian-mh">一起听歌<span class="Qixian-mc" onclick="this.closest(\'.Qixian-jmumodal\').classList.remove(\'show\')">×</span></div>' +
            '<div class="Qixian-mu"><div class="Qixian-mu-stage"><div class="Qixian-mu-face Qixian-bind-lav char-avatar"></div><div class="Qixian-mu-waves Qixian-jmuwaves"><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span><span class="Qixian-wave"></span></div></div>' +
            '<div class="Qixian-mu-now Qixian-jmunow">未在播放</div>' +
            '<div class="Qixian-mu-time-disp">一起听了 <span id="Qx-mutime-val">0</span> 分钟</div>' +
            '<div class="Qixian-mu-ctrl"><div class="Qixian-mu-btn Qixian-jmuprev"><svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg></div><div class="Qixian-mu-btn main Qixian-jmuplay"><svg viewBox="0 0 24 24" class="Qixian-jmuicon"><polygon points="7 4 19 12 7 20 7 4"/></svg></div><div class="Qixian-mu-btn Qixian-jmunext"><svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg></div></div>' +
            '<div class="Qixian-mu-list Qixian-jmulist"></div>' +
            '<div class="Qixian-mu-inp-wrap"><input class="Qixian-mu-name Qixian-jmuname" placeholder="歌曲名" /><input class="Qixian-mu-artist Qixian-jmuartist" placeholder="歌手" /><button class="Qixian-mu-add Qixian-jmuaddbtn">添加</button></div>' +
            '<input class="Qixian-mu-cover Qixian-jmucover" placeholder="封面URL（可选）" style="display:none" /><input class="Qixian-mu-inp Qixian-jmuinp" placeholder="音频URL（可选）" style="display:none" />' +
            '<button class="Qixian-mu-invbtn Qixian-jmuinv">邀请对方一起听</button></div></div></div>' +
            // 情侣空间
            '<div class="Qixian-mf Qixian-jcpmodal"><div class="mbox" style="height:85%"><div class="Qixian-mh">情侣空间<span class="Qixian-mc" onclick="this.closest(\'.Qixian-jcpmodal\').classList.remove(\'show\')">×</span></div>' +
            '<div class="Qixian-cp"><div class="Qixian-cp-top"><div class="Qixian-cp-avs"><div class="Qixian-cp-face Qixian-bind-lav char-avatar"></div><div class="Qixian-cp-face Qixian-jcpf2 Qixian-bind-rav user-avatar"></div></div>' +
            '<div class="Qixian-cp-id-group">❤ <span class="Qixian-jcprel">相恋中</span> ❤</div></div>' +
            '<div class="Qixian-cp-sec"><div class="Qixian-cp-h">个签</div>' +
            '<div class="Qixian-sign-mod"><div class="Qixian-sign-hd"><div class="Qixian-cp-face" style="width:32px;height:32px;"></div><div style="font-size:13px;font-weight:500;">对方</div><span class="Qixian-signdel">×</span></div><div class="Qixian-sign-bd Qixian-jcsign">暂无签名</div></div>' +
            '<div class="Qixian-sign-mod"><div class="Qixian-sign-hd"><div class="Qixian-cp-face Qixian-bind-rav user-avatar" style="width:32px;height:32px;"></div><div style="font-size:13px;font-weight:500;">我</div></div><div class="Qixian-sign-bd Qixian-jusign-disp">点击下方发布你的个签</div>' +
            '<div class="Qixian-sign-act"><input class="Qixian-jusignin" placeholder="写个签..." /><button class="Qixian-jusignsave">发布</button></div></div></div>' +
            '<div class="Qixian-cp-sec"><div class="Qixian-cp-h">恋爱清单</div><div class="Qixian-cp-things Qixian-jcpthings"></div>' +
            '<div class="Qixian-cp-addrow"><select class="Qixian-jcpwho"><option>一起</option><option>对方</option><option>我</option></select><input class="Qixian-jcpthingin" placeholder="想做的事" /><button class="Qixian-jcpthingadd">+</button></div></div>' +
            '<div class="Qixian-cp-sec"><div class="Qixian-cp-h">纪念日</div><div class="Qixian-cp-days Qixian-jcpdays"></div>' +
            '<div class="Qixian-cp-addrow"><input class="Qixian-jcpdayname" placeholder="纪念日名称" /><input type="date" class="Qixian-jcpdaydate" /><button class="Qixian-jcpdayadd">+</button></div></div>' +
            '<div class="Qixian-cp-sec"><div class="Qixian-cp-h">相册</div><div class="Qixian-cp-albums Qixian-jcpalbums"></div>' +
            '<div class="Qixian-cp-addrow"><input class="Qixian-jcpalbumtxt" placeholder="文字/描述" /><input class="Qixian-jcpalbumimg" placeholder="图片URL（可选）" /><button class="Qixian-jcpalbumadd">+</button></div></div>' +
            '</div></div></div>' +
            // 位置
            '<div class="Qixian-mf Qixian-jlocmodal"><div class="mbox"><div class="Qixian-mh">位置共享<span class="Qixian-mc Qixian-jlocclose">×</span></div>' +
            '<div class="Qixian-loc-wrap"><div class="Qixian-radar"><div class="Qixian-radar-wave"></div><div class="Qixian-radar-wave w2"></div>' +
            '<div class="Qixian-anchor a1"><div class="Qixian-anchor-tip t1">我的位置</div><div class="Qixian-anchor-av Qixian-bind-rav user-avatar"></div></div>' +
            '<div class="Qixian-anchor a2"><div class="Qixian-anchor-tip t2">对方位置</div><div class="Qixian-anchor-av Qixian-bind-lav char-avatar"></div></div></div>' +
            '<div class="Qixian-loc-dist" id="Qx-loc-dist">相距未知</div>' +
            '<button class="Qixian-loc-send Qixian-jlocsend">分享我的位置</button></div></div></div>' +
            '<div class="Qixian-cen Qixian-jlocinputmodal"><div class="Qixian-cen-box"><h4>位置信息</h4><input class="Qixian-cen-inp Qixian-jlocin-pos" placeholder="位置描述" /><input class="Qixian-cen-inp Qixian-jlocin-dist" placeholder="距离" /><div class="Qixian-cen-btns"><button class="cc Qixian-jlocincancel">取消</button><button class="ok Qixian-jlocinok">发送</button></div></div></div>' +
            // 外卖
            '<div class="Qixian-cen Qixian-jfoodmodal w260"><div class="Qixian-cen-box"><h4>点外卖</h4><input class="Qixian-cen-inp Qixian-jfoodshop" placeholder="店铺名" /><input class="Qixian-cen-inp Qixian-jfooditems" placeholder="菜品" /><input class="Qixian-cen-inp Qixian-jfoodaddr" placeholder="收货地址" /><input class="Qixian-cen-inp Qixian-jfoodname" placeholder="收件人" /><input class="Qixian-cen-inp Qixian-jfoodphone" placeholder="电话" /><div class="Qixian-cen-btns"><button class="cc Qixian-jfoodcancel">取消</button><button class="ok Qixian-jfoodok">下单</button></div></div></div>' +
            // 涂鸦
            '<div class="Qixian-mf Qixian-jdrawmodal"><div class="mbox"><div class="Qixian-mh">手绘涂鸦<span class="Qixian-mc Qixian-jdrawcancel">×</span></div>' +
            '<div style="padding:16px;display:flex;flex-direction:column;align-items:center;gap:10px;">' +
            '<canvas class="Qixian-draw-canvas Qixian-jdrawcanvas" width="280" height="280"></canvas>' +
            '<div class="Qixian-draw-tools"><input type="color" class="Qixian-draw-color Qixian-jdrawcolor" value="#222222" /><input type="range" class="Qixian-draw-range Qixian-jdrawwidth" min="1" max="20" value="3" /><div class="Qixian-draw-btn-icon Qixian-jdraweraser" title="橡皮"><svg viewBox="0 0 24 24"><path d="M20 20H7L3 16a2 2 0 0 1 0-2.8L13.2 3a2 2 0 0 1 2.8 0l5 5a2 2 0 0 1 0 2.8L12 20"/></svg></div><div class="Qixian-draw-btn-icon Qixian-jdrawundo" title="撤销"><svg viewBox="0 0 24 24"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6.7 3L3 13"/></svg></div><div class="Qixian-draw-btn-icon Qixian-jdrawclear" title="清空"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></div></div>' +
            '<button class="Qixian-loc-send Qixian-jdrawok" style="margin-top:0;">发送涂鸦</button></div></div></div>' +
            // 朋友圈面板
            '<div class="Qixian-pyq-panel Qixian-jpyqpanel"><div class="Qixian-pyq-hd"><div class="Qixian-pyq-back Qixian-jpyqback"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></div><div style="font-size:16px;font-weight:500;">朋友圈</div><div class="Qixian-pyq-addbtn Qixian-jpyqadd"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></div>' +
            '<div class="Qixian-pyq-scroll"><div class="Qixian-pyq-cover Qixian-jpyq-cover"><div class="Qixian-pyq-user"><div class="Qixian-pyq-uname">我</div><div class="Qixian-pyq-uav Qixian-jpyq-uav Qixian-bind-rav user-avatar"></div></div></div>' +
            '<div class="Qixian-pyq-list Qixian-jpyqlist"></div></div></div>' +
            // 发朋友圈
            '<div class="Qixian-cen Qixian-jpyqsendmodal"><div class="Qixian-cen-box"><h4>发朋友圈</h4><textarea class="Qixian-cen-inp Qixian-jpyqsendtxt" rows="2" placeholder="说点什么..."></textarea><input class="Qixian-cen-inp Qixian-jpyqsendimg" placeholder="图片URL（可选）" /><input class="Qixian-cen-inp Qixian-jpyqsendtxtimg" placeholder="纯文字图内容（可选）" /><div class="Qixian-cen-btns"><button class="cc Qixian-jpyqsendcancel">取消</button><button class="ok Qixian-jpyqsendok">发布</button></div></div></div>' +
            // 评论
            '<div class="Qixian-cen Qixian-jpyqcommodal"><div class="Qixian-cen-box"><h4>评论</h4><input class="Qixian-cen-inp Qixian-jpyqcomtxt" placeholder="写评论..." /><div class="Qixian-cen-btns"><button class="cc Qixian-jpyqcomcancel">取消</button><button class="ok Qixian-jpyqcomok">发送</button></div></div></div>' +
            '</div></div></div></div>';

        document.body.appendChild(wrap);

        scope = wrap.querySelector('#qixian-root');
        chatBox = Q('.Qixian-jchat');
        callBubsBox = Q('.Qixian-jcall-bubs');

        // 悬浮按钮
        var toggle = document.createElement('div');
        toggle.id = 'qixian-toggle-btn';
        toggle.innerHTML = '<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>';
        document.body.appendChild(toggle);
        toggle.addEventListener('click', function(){
            wrap.classList.toggle('hidden');
            toggle.classList.toggle('hidden');
        });
        wrap.addEventListener('click', function(e){
            if(e.target === wrap) {
                wrap.classList.add('hidden');
                toggle.classList.remove('hidden');
            }
        });
    }

    function init() {
        // 注入CSS
        if (!document.getElementById(CSS_ID)) {
            var style = document.createElement('style');
            style.id = CSS_ID;
            style.textContent = fullCSS;
            document.head.appendChild(style);
        }
        // 构建DOM
        buildHTML();
        // 读取角色/用户信息
        var charInfo = getTavernCharacter();
        var userInfo = getTavernUser();
        finalLName = charInfo.name;
        finalRName = userInfo.name;
        finalLAv = charInfo.avatar;
        finalRAv = userInfo.avatar;
        safeLAv = finalLAv ? finalLAv.replace(/'/g, '%27') : '';
        safeRAv = finalRAv ? finalRAv.replace(/'/g, '%27') : '';
        // 更新头像和名字
        QA('.Qixian-bind-lav').forEach(function(el){ if(safeLAv) el.style.backgroundImage = 'url(\''+safeLAv+'\')'; });
        QA('.Qixian-bind-rav').forEach(function(el){ if(safeRAv) el.style.backgroundImage = 'url(\''+safeRAv+'\')'; });
        var uname = Q('.Qixian-uname');
        if(uname) uname.textContent = finalLName;
        var callNm = Q('.Qixian-call-nm');
        if(callNm) callNm.textContent = finalLName;
        // 绑定事件
        bindAllEvents();
        bindExtraEvents();
        // 初始化数据
        initCpData();
        renderMuList();
        renderEmoList();
        renderPyqList();
        // 监听酒馆消息
        if (window.SillyTavern && window.SillyTavern.addEventListener) {
            window.SillyTavern.addEventListener('message', syncTavernMessage);
            window.SillyTavern.addEventListener('character_loaded', function(){
                var c = getTavernCharacter();
                finalLName = c.name;
                finalLAv = c.avatar;
                safeLAv = finalLAv ? finalLAv.replace(/'/g, '%27') : '';
                QA('.Qixian-bind-lav').forEach(function(el){ if(safeLAv) el.style.backgroundImage = 'url(\''+safeLAv+'\')'; });
                if(uname) uname.textContent = finalLName;
                if(callNm) callNm.textContent = finalLName;
            });
        }
        // 欢迎消息
        setTimeout(function(){ renderSysMsg('已连接到 ' + finalLName); }, 300);
    }

       // 等待酒馆就绪后启动
    function waitForTavern() {
        if (document.body) {
            init();
        } else {
            setTimeout(waitForTavern, 100);
        }
    }
    waitForTavern();

})();

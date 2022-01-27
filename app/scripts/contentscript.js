/**
 * イベント管理
 */
const handler = (() => {
    const events = {}
    let key = 0
    return {
        addListener (target, type, listener, capture) {
            target.addEventListener(type, listener, capture)
            events[key] = {
                target: target,
                type: type,
                listener: listener,
                capture: capture
            }
            // console.log('addListener: '+key);
            return key++
        },
        removeListener (k) {
            let e
            if (k in events) {
                // console.log('removeListener: '+k);
                e = events[k]
                e.target.removeEventListener(e.type, e.listener, e.capture)
            }
            if (!Object.keys(events).length) {
                key = 0
            }
        }
    }
})()

/**
 * ボタン定義
 */
const btns = [
    {
        id: '_addInfoText',
        left: true,
        label: 'メッセージに[info][/info]を追加します [Ctrl + i]',
        // iconCls: 'icoFontInfo',
        // html: [
        // '<span>',
        // '<svg viewBox="0 0 10 10" width="16" height="16" aria-hidden="true">',
        // '<use fill-rule="evenodd" xlink:href="#icon_info">',
        // '</use>',
        // '</svg>',
        // '</span>'
        // ].join(''),
        html: 'info',
        iconCls: 'material-icons-outlined',
        innerStyle: {
            display: 'none',
            paddingBottom: '2px',
            fontSize: 0
        },
        outerStyle: {
            paddingTop: '5px'
        },
        params: {
            action: 'info',
            addEndTag: true
        }
    }, {
        id: '_addInfoWithTitleText',
        left: true,
        label: 'メッセージに[info][title][/title][/info]を追加します [Ctrl + t]',
        // iconCls: 'icoFontInfo',
        iconCls: 'material-icons-outlined',
        html: 'info',
        innerStyle: {
            display: 'none',
            color: 'blue',
            paddingBottom: '2px',
            fontSize: 0
        },
        outerStyle: {
            paddingTop: '5px'
        },
        params: {
            action: 'info',
            addEndTag: true,
            addTitle: true
        }
    }, {
        id: '_addCodeText',
        left: true,
        label: 'メッセージに[code][/code]を追加します [Ctrl + w]',
        // iconCls: 'icoFontSetting',
        iconCls: 'material-icons-outlined',
        html: 'settings',
        innerStyle: {
            display: 'none',
            paddingBottom: '2px',
            fontSize: 0
        },
        outerStyle: {
            paddingTop: '5px'
        },
        params: {
            action: 'code',
            addEndTag: true
        }
    // }, {
    //     id: '_addQtText',
    //     left: true,
    //     label: 'メッセージに[qt][/qt]を追加します',
    //     iconCls: 'icoFontMessegeQuote',
    //     iconNoLg: true,
    //     innerStyle: {
    //         paddingBottom: '2px'
    //     },
    //     params: {
    //         action: 'qt',
    //         addEndTag: true
    //     }
    }, {
        id: '_addHrText',
        left: true,
        label: 'メッセージに[hr]を追加します [Ctrl + l]',
        iconCls: 'btnPrimary',
        iconNoLg: true,
        html: 'hr',
        innerStyle: {
            fontSize: '10px',
            borderRadius: '3px',
            padding: '2px 4px',
            position: 'relative',
            //top: '-1px',
            left: '-1px'
        },
        params: {
            action: 'hr',
        }
    }, {
        id: '_addEmoRoger',
        label: '了解する人',
        src: 'https://assets.chatwork.com/images/emoticon2x/emo_roger.gif',
        alt: '(roger)',
        params: {
            startTag: '(roger)',
        }
    }, {
        id: '_addEmoBow',
        label: 'おじぎする人',
        src: 'https://assets.chatwork.com/images/emoticon2x/emo_bow.gif',
        alt: '(bow)',
        params: {
            startTag: '(bow)',
        }
    }, {
        id: '_dispHelp',
        label: [
            'ショートカットキー',
            'Ctrl + i : [info][/info]',
            'Ctrl + t : [info][title][/title][/info]',
            'Ctrl + w : [code][/code]',
            'Ctrl + l : [hr]',
        ].join("\n"),
        //iconCls: 'icoFontHelp',
        iconCls: 'material-icons-outlined',
        html: 'help_outline',
        innerStyle: {
            display: 'none',
            paddingBottom: '2px',
            fontSize: 0
        },
        fn: () => {
            return false
        }
    }, {
        id: '_addStyle',
        label: '【実験】縮んだり伸びたりします',
        //iconCls: 'icoFontActionMore',
        iconCls: 'material-icons-outlined',
        html: 'more_horiz',
        innerStyle: {
            display: 'none',
            paddingBottom: '2px',
            fontSize: 0
        },
        fn: () => {
            const style = [
                '.roomListItem,',
                '#_roomListArea li[role="listitem"] {',
                '  padding: 0 28px 0 8px!important;',
                '}',
                '#_roomListArea li[role="listitem"] > div:first-of-type > div:first-child {',
                '  height: 28px;',
                '}',
                '#_roomListArea li[role="listitem"] > div:first-of-type > div:first-child > img {',
                '  width: 28px;',
                '  height: 28px;',
                '}',
                '#_roomListArea li[role="listitem"] > div:first-of-type > div:nth-child(2) {',
                '  padding: 2px 0 0 0;',
                '}',
                '#_roomListArea li[role="listitem"] > div:nth-child(2) {',
                '  top:calc(0.3em)!important;',
                '}',
                '.roomListItem .avatarMedium {',
                '  width: 27px!important;',
                '  height: 27px!important;',
                '}',
                '.timelineMessage * {',
                '  line-height: 1.3em!important;',
                '}',
                '.roomMainContent {',
                '  grid-template-rows: 37px 1fr;',
                '}',
                '#sidebarSwitch:first-child > div > button,',
                '#_mainContent .chatRoomHeader {',
                '  height:37px;',
                '}',
                '#_roomListContainer > div:first-child {',
                '  height: 35px;',
                '  padding-top: 0 !important;',
                '  padding-bottom:0 !important;',
                '}',
                '.sidebarPane,',
                '#_roomListArea {',
                '  height: calc(100% - 37px);',
                '}',
                '.globalHeader {',
                '  height: 34px;',
                '}',
                '.content {',
                //'  top: 34px;',
                '  height: calc(100% - 48px);',
                '}',
            ].join("\n")
            if (document.getElementById('_addStyleCWQII')) {
                document.getElementById('_addStyleCWQII').remove()
            } else {
                const styleEl = document.createElement('style')
                styleEl.id = '_addStyleCWQII'
                styleEl.type = 'text/css'
                styleEl.innerText = style
                document.body.appendChild(styleEl)
            }
        }
    }
]

/**
 * メイン処理
 */
const app = {
    // ボタン
    buttons: [],

    // ボタンに設定したイベントのキー
    btnEventKeys: [],

    // キーボードイベントのイベントキー
    keyboardEventKey: null,

    /**
     * チャット入力エリア
     */
    getInputArea () {
        return document.getElementById('_chatText')
    },

    /**
     * チャット画面かどうか
     */
    isChat () {
        return !!document.getElementById('_chatText') &&
            !!document.getElementById('_chatSendArea') &&
            !!document.getElementById('_file')// &&
            // !!document.getElementById('_myStatusButton')
    },

    /**
     * 初期化
     */
    init () {
        const me = this
        changeIconColor = () => {
            const isDark = document.body.classList.contains('dark')
            document.querySelectorAll('.material-icons-outlined').forEach((btn) => {
                if (btn.style.color !== 'blue') {
                    btn.style.color = isDark ? '#CADAF7' : ''
                }
            })
        }

        let cnt = 100,
        loadedFn = () => {
            // console.log('load check');
            if (me.isChat()) {
                // console.log('loaded');
                clearInterval(checkLoaded)

                const linkTag = document.createElement('link');
                linkTag.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons%7CMaterial+Icons+Outlined');
                linkTag.setAttribute('rel', 'stylesheet');
                document.getElementsByTagName("head")[0].appendChild(linkTag);

                linkTag.onload = () => {
                    document.querySelectorAll('.material-icons-outlined').forEach((btn) => {
                        btn.style.display = ''
                    })
                    setTimeout(() => {
                        document.querySelectorAll('.material-icons-outlined').forEach((btn) => {
                            btn.style.fontSize = '20px'
                        })
                    }, 1000);
                }

                // ボタン生成
                me.createButtons()

                // ボタン設置
                me.insert()

                changeIconColor()

                const observer = new MutationObserver((list) => {
                    // console.log(list);
                    for (let mutation of list) {
                        if (
                            mutation.type === 'childList' &&
                            mutation.addedNodes.length
                        ) {
                            me.insert()
                            //// console.log('A child node has been added or removed.');
                            break
                        }
                    }
                })

                observer.observe(
                    document.getElementById('_chatSendArea'),
                    {
                        attributes: false,
                        childList: true,
                        characterData: false
                    }
                )

                const observerBody = new MutationObserver((list) => {
                    // console.log(list);
                    for (let mutation of list) {
                        if (
                            mutation.type === 'attributes' &&
                            mutation.target.nodeName === 'BODY'
                        ) {
                            changeIconColor()
                            break
                        }
                    }
                })

                observerBody.observe(
                    document.body,
                    {
                        attributes: true,
                        childList: false,
                        characterData: false
                    }
                )
            }
            if (!--cnt) {
                // console.log('timeout');
                clearInterval(checkLoaded)
            }
        }
        const checkLoaded = setInterval(loadedFn, 100)
    },

    /**
     * キーボードショートカット
     */
    setKeyboardEvent () {
        const me = this
        handler.removeListener(me.keyboardEventKey)
        me.keyboardEventKey = handler.addListener(me.getInputArea(), 'keydown', (e) => {
            const code = e.which,
                keyChar = String.fromCharCode(code).toLowerCase()
            if (e.ctrlKey) {
                // console.log('push');
                // console.log(keyChar);
                switch (keyChar) {
                    case 'i':
                        me.clickAction(btns[0].params)
                        break
                    case 't':
                        me.clickAction(btns[1].params)
                        break
                    case 'w':
                        me.clickAction(btns[2].params)
                        break
                    case 'l':
                        me.clickAction(btns[4].params)
                        break
                }
            }
        }, false)
        me.btnEventKeys.push(me.keyboardEventKey)
    },

    /**
     * ボタン挿入
     */
    insert () {
        // console.log('insert');
        const me = this,
            wrapRightEl = document.createElement('ul'),
            wrapLeftEl = document.getElementById('_file').closest('ul'),
            parentRightEl = document.getElementById('_chatSendArea').querySelector('ul + div'),
            tooltipEl = document.querySelector('.messageTooltip__text')

        if (
            // !document.getElementById('_myStatusButton') ||
            !!document.getElementById('_addInfoText')
        ) {
            return false
        }
        // console.log('insert exec');

        if (parentRightEl) {
            wrapRightEl.style.display = 'flex'
            wrapRightEl.style.paddingTop = '5px'
            parentRightEl.prepend(wrapRightEl)
        }
        if (tooltipEl) {
            tooltipEl.style.whiteSpace = 'pre'
        }

        me.buttons.forEach((btn, key) => {
            const o = btns[key]
            if (o.left) {
                wrapLeftEl.appendChild(btn)
            } else if (parentRightEl) {
                wrapRightEl.appendChild(btn)
            }
        })

        // キーボードイベントハンドラ設定
        me.setKeyboardEvent()
    },

    /**
     * ボタン定義からボタン生成
     */
    createButtons () {
        const me = this

        btns.forEach(o => {
            let btn, k
            btn = me.createButton(o)
            if (o.params) {
                k = handler.addListener(btn, 'click', () => {
                    document.getElementById(o.id).blur()
                    me.clickAction(o.params)
                })
            } else {
                k = handler.addListener(btn, 'click', () => {
                    document.getElementById(o.id).blur()
                    o.fn()
                })
            }
            me.buttons.push(btn)
            me.btnEventKeys.push(k)
        })
    },

    /**
     * ボタン生成（テキスト装飾）
     */
    createButton (args) {
        const li = document.createElement('li'),
            btn = document.createElement('button'),
            inner = document.createElement(args.src ? 'img' : 'span')

        btn.appendChild(inner)
        li.appendChild(btn)

        li.style.marginRight = '2px'

        btn.id = args.id
        btn.setAttribute('role', 'button')
        btn.setAttribute('aria-label', args.label)
        btn.classList.add('_showDescription', 'chatInput__emoticon', 'dmLRfL', 'bPTIFV', '_CWIcon')
        //btn.style.display = 'inline-block'
        btn.style.border = 'none'
        btn.style.backgroundColor = 'transparent'
        btn.style.cursor = 'pointer'

        if (args.src) {
            inner.classList.add('ui_emoticon')
            inner.style.height = '15px'
            inner.style.width = '15px'
            inner.style.paddingBottom = '4px'
            inner.src = args.src || ''
            inner.alt = args.alt || ''
        } else {
            inner.classList.add(args.iconCls || null)
            inner.style.paddingBottom = '4px'
            inner.textContent = args.html || ''
            //inner.innerHTML = args.html || ''
        }

        // スタイルを調整
        if (!!args.innerStyle) {
            for (let property in args.innerStyle) {
                if (args.innerStyle.hasOwnProperty(property)) {
                    inner.style[property] = args.innerStyle[property]
                }
            }
        }

        // liの調整
        if (!!args.outerStyle) {
            for (let property in args.outerStyle) {
                if (args.outerStyle.hasOwnProperty(property)) {
                    li.style[property] = args.outerStyle[property]
                }
            }
        }
        return li
    },

    /**
     * クリック時処理
     */
    clickAction (args) {
        const me = this,
            el = me.getInputArea(),
            action = args.action || 'info',
            startTag = args.startTag || '[' + action + ']',
            endTag = !!args.addEndTag ? '[/' + action + ']' : '',
            beforeText = el.value,
            start = el.selectionStart,
            end = el.selectionEnd

        let titleTag = '', titleText = '',
            cursor = start, selectText = ''

        if (args.addTitle) {
            if (!(titleText = prompt('タイトルを入力', ''))) {
                return false
            }
            titleTag = ''.concat(
                '[title]',
                    titleText,
                '[/title]'
            )
        }

        if (start !== end) {
            selectText = beforeText.substr(start, end - start)
            cursor = end + endTag.length
        }
        cursor += startTag.length + titleTag.length

        setTimeout(() => {
            el.value = ''.concat(
                beforeText.substr(0, start),
                startTag,
                titleTag,
                selectText,
                endTag,
                beforeText.substr(end)
            )

            el.setSelectionRange(cursor, cursor)
            el.focus()
        }, 1)
    }
}

window.addEventListener('load', () => {
    // console.log('load');
    app.init()
}, {
  once: true,
  passive: false,
  capture: false
})

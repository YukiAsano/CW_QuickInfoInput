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
            return key++
        },
        removeListener (k) {
            if (k in events) {
                var e = events[k]
                e.target.removeEventListener(e.type, e.listener, e.capture)
            }
            if (!events.length) {
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
        iconCls: 'icoFontInfo',
        params: {
            action: 'info',
            addEndTag: true
        }
    }, {
        id: '_addInfoWithTitleText',
        left: true,
        label: 'メッセージに[info][title][/title][/info]を追加します [Ctrl + t]',
        iconCls: 'icoFontInfo',
        color: 'blue',
        params: {
            action: 'info',
            addEndTag: true,
            addTitle: true
        }
    }, {
        id: '_addCodeText',
        left: true,
        label: 'メッセージに[code][/code]を追加します [Ctrl + w]',
        iconCls: 'icoFontSetting',
        params: {
            action: 'code',
            addEndTag: true
        }
    }, {
        id: '_addQtText',
        left: true,
        label: 'メッセージに[qt][/qt]を追加します',
        iconCls: 'icoFontMessegeQuote',
        iconNoLg: true,
        params: {
            action: 'qt',
            addEndTag: true
        }
    }, {
        id: '_addHrText',
        left: true,
        label: 'メッセージに[hr]を追加します [Ctrl + l]',
        iconCls: 'btnPrimary',
        iconNoLg: true,
        html: '&nbsp;hr&nbsp;',
        style: {
            fontSize: '10px',
            borderRadius: '3px',
            padding: '3px 4px',
            position: 'relative',
            top: '-2px'
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
        iconCls: 'icoFontHelp',
        fn: () => {
            return false
        }
    }, {
        id: '_addStyle',
        label: '【実験】縮んだり伸びたりします',
        iconCls: 'icoFontActionMore',
        fn: () => {
            const style = [
                '.roomListItem,',
                '#_roomListArea li[role="listitem"] {',
                '  padding: 0 	28px 0 8px!important;',
                '}',
                '#_roomListArea li[role="listitem"] div:nth-child(2){',
                '  top:calc(0.4em)!important;',
                '}',
                '.roomListItem .avatarMedium {',
                '  width: 27px!important;',
                '  height: 27px!important;',
                '}',
                '.timelineMessage * {',
                '  line-height: 1.3em!important;',
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
    // ボタンに設定したイベントのキー
    btnEventKeys: [],

    /**
     * 初期化
     */
    init () {
        const me = this
        me.reload(true)
    },

    /**
     * チャットページかどうか
     */
    isChatPage () {
        return !!document.getElementById('_myStatusButton')
    },

    /**
     * 画面更新時処理
     */
    reload (init) {
        const me = this
        let intervalFn, cnt = 100

        if (!!document.getElementById('_addInfoText')) {
            return false
        }

        intervalFn = setInterval(() => {
            if (!cnt || !!document.getElementById('_addInfoText')) {
                clearInterval(intervalFn)
                return false
            }
            if (me.isChatPage()) {
                //console.log(cnt);
                me.createToolBtns()
                clearInterval(intervalFn)
                if (init) {
                    document.getElementById('_chatSendArea').addEventListener('DOMSubtreeModified', (e) => {
                        me.reload(false)
                    }, false)
                }
            }
            --cnt
        }, 100)
    },

    /**
     * ボタン設置
     */
    createToolBtns () {
        //console.log('createToolBtns');
        const me = this,
            wrapRightEl = document.createElement('ul'),
            wrapLeftEl = document.getElementById('_file').closest('ul')

        wrapRightEl.style.display = 'flex'
        document.getElementById('_sendEnterActionArea').parentNode.prepend(wrapRightEl)

        document.querySelector('.messageTooltip__text').style.whiteSpace = 'pre'

        me.btnEventKeys.forEach(k => {
            handler.removeListener(k)
            //console.log(k)
        })

        me.btnEventKeys = []

        btns.forEach(o => {
            let btn
            if (!o.src) {
                btn = me.createBtn(o)
            } else {
                btn = me.createEmoBtn(o)
            }
            let k
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
            me.btnEventKeys.push(k)
            if (o.left) {
                wrapLeftEl.appendChild(btn)
            } else {
                wrapRightEl.appendChild(btn)
            }
        })

        // {{{ キーボードショートカット

        let k = handler.addListener(document.getElementById('_chatText'), 'keydown', (e) => {
            const code = e.which,
                keyChar = String.fromCharCode(code).toLowerCase();
            if (e.ctrlKey) {
                //console.log('push');
                //console.log(keyChar);
                switch (keyChar) {
                    case 'i':
                        me.clickAction(btns[0].params)
                        break;
                    case 't':
                        me.clickAction(btns[1].params)
                        break;
                    case 'w':
                        me.clickAction(btns[2].params)
                        break;
                    case 'l':
                        me.clickAction(btns[4].params)
                        break;
                }
            }
        }, false);
        me.btnEventKeys.push(k)

        // }}}
    },

    /**
     * ボタン生成
     */
    createBtn (args) {
        const li = document.createElement('li'),
            btn = document.createElement('button'),
            span = document.createElement('span')

        btn.appendChild(span)
        li.appendChild(btn)

        li.style.marginRight = '8px'

        btn.id = args.id
        btn.setAttribute('role', 'button')
        btn.setAttribute('aria-label', args.label)
        btn.classList.add('_showDescription', 'chatInput__emoticon', 'dmLRfL', 'bPTIFV')
        btn.style.display = 'inline-block'

        span.classList.add(args.iconCls || null)
        //args.iconNoLg || span.classList.add('icoSizeMiddle')
        span.style.color = args.color || undefined
        span.style.paddingBottom = '4px'
        span.innerHTML = args.html || ''

        // スタイルを調整
        for (let property in args.style) {
            if (args.style.hasOwnProperty(property)) {
                span.style[property] = args.style[property]
            }
        }
        return li
    },

    /**
     * ボタン生成
     */
    createEmoBtn (args) {
        const li = document.createElement('li'),
            btn = document.createElement('button'),
            img = document.createElement('img')

        btn.appendChild(img)
        li.appendChild(btn)

        li.style.marginRight = '8px'

        btn.id = args.id
        btn.setAttribute('role', 'button')
        btn.setAttribute('aria-label', args.label)
        btn.classList.add('_showDescription', 'chatInput__emoticon', 'dmLRfL', 'bPTIFV')
        btn.style.display = 'inline-block'

        img.classList.add('ui_emoticon')
        img.style.height = '15px'
        img.style.width = '15px'
        img.style.paddingBottom = '4px'
        img.src = args.src || ''
        img.alt = args.alt || ''

        return li
    },

    /**
     * クリック時処理
     */
    clickAction (args) {
        const el = document.getElementById('_chatText'),
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
        }, 1);
    }
}

app.init()

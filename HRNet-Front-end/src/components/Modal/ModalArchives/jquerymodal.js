!(function (o) {
  'object' == typeof module && 'object' == typeof module.exports
    ? o(require('jquery'), window, document)
    : o(jQuery, window, document);
})(function (o, t, i, e) {
  var s = [], // array stock instance de fenetre modal créé
    l = function () {
      return s.length ? s[s.length - 1] : null;
    }, //  l : renvoie la denrière fenetre modale rajouter au tableau s
    n = function () {
      var o,
        t = !1;
      for (o = s.length - 1; o >= 0; o--)
        s[o].$blocker &&
          (s[o].$blocker.toggleClass('current', !t).toggleClass('behind', t),
          (t = !0));
    }; // n : modifie la classe css des blocages de fond pour empiler et montrer la fenetre modale qui est actuellement visible

  (o.modal = function (t, i) {
    var e, n;
    if (
      ((this.$body = o('body')), //sélectionne le body de la webpage
      (this.options = o.extend({}, o.modal.defaults, i)),
      (this.options.doFade = !isNaN(parseInt(this.options.fadeDuration, 10))), // dofade, est-ce que ça met un flou?
      (this.$blocker = null),
      this.options.closeExisting)
    )
      for (; o.modal.isActive(); ) o.modal.close(); // ferme les modales actives
    if ((s.push(this), t.is('a')))
      if (((n = t.attr('href')), (this.anchor = t), /^#/.test(n))) {
        // t c'est un paramètre qu'on passe à la premiere fonction tout en haut et qui est repassé au fonction en dessous
        // si 't' est un 'a' récupère le href
        if (((this.$elm = o(n)), 1 !== this.$elm.length)) return null; // si elm est différent de 1, alors renvoie null
        this.$body.append(this.$elm), this.open(); // l'action suivant en cas de n=1 c'est de mettre l'elm dans body et de le faire ouvrir
      } else
        (this.$elm = o('<div>')), // si n n'est pas un href, ça crée une 'div'
          this.$body.append(this.$elm), // et ça lui donne l'elm
          (e = function (o, t) {
            // fonction qui gère une requête asynchrone AJAX avec un spinner d'attente, jusqu'a fulfilled ou fail
            t.elm.remove();
          }),
          this.showSpinner(),
          t.trigger(o.modal.AJAX_SEND),
          o
            .get(n)
            .done(function (i) {
              if (o.modal.isActive()) {
                t.trigger(o.modal.AJAX_SUCCESS);
                var s = l();
                s.$elm.empty().append(i).on(o.modal.CLOSE, e),
                  s.hideSpinner(),
                  s.open(),
                  t.trigger(o.modal.AJAX_COMPLETE);
              }
            })
            .fail(function () {
              t.trigger(o.modal.AJAX_FAIL);
              var i = l();
              i.hideSpinner(), s.pop(), t.trigger(o.modal.AJAX_COMPLETE);
            });
    else
      (this.$elm = t), // si c'est pas un 'a', elm devient t
        (this.anchor = t), // l'ancre devient t
        this.$body.append(this.$elm), // on applique elm à boyd
        this.open(); // on ouvre
    // jusque là on a écris ce ue fais la modal
    // blocker au tout début est le fond gris
    // ensuite on a des comportements conditionnés
  }),
    // c'est un constructeur comme class pour react? et du coup il y a plusieurs méthodes:
    // open, close, block, unblock
    (o.modal.prototype = {
      constructor: o.modal,
      open: function () {
        // ici on a l'écriture de la fn open qu'on a appelé avant dans la modal, c'est marrant, c'est après ici
        var t = this;
        this.block(),
          this.anchor.blur(),
          this.options.doFade
            ? setTimeout(function () {
                t.show();
              }, this.options.fadeDuration * this.options.fadeDelay)
            : this.show(),
          o(i)
            .off('keydown.modal')
            .on('keydown.modal', function (o) {
              var t = l();
              27 === o.which && t.options.escapeClose && t.close();
            }),
          this.options.clickClose &&
            this.$blocker.click(function (t) {
              // ça c'est le truc pour fermer au click
              t.target === this && o.modal.close();
            });
      },
      //block the body de la page, met en place apparence et comportement de la modal
      // aussi s'occupe de l'accéssibilité avec esc: ferme la modale,
      // option de cliquer en dehors de la modale pour la fermer
      close: function () {
        s.pop(),
          this.unblock(),
          this.hide(),
          o.modal.isActive() || o(i).off('keydown.modal');
      },
      // supprime la modale du DOM, déblock la page et oublie le truc de lescape
      block: function () {
        this.$elm.trigger(o.modal.BEFORE_BLOCK, [this._ctx()]),
          this.$body.css('overflow', 'hidden'),
          (this.$blocker = o(
            '<div class="' +
              this.options.blockerClass +
              ' blocker current"></div>'
          ).appendTo(this.$body)),
          n(),
          this.options.doFade &&
            this.$blocker
              .css('opacity', 0)
              .animate({ opacity: 1 }, this.options.fadeDuration),
          this.$elm.trigger(o.modal.BLOCK, [this._ctx()]);
      },
      unblock: function (t) {
        !t && this.options.doFade
          ? this.$blocker.fadeOut(
              this.options.fadeDuration,
              this.unblock.bind(this, !0)
            )
          : (this.$blocker.children().appendTo(this.$body),
            this.$blocker.remove(),
            (this.$blocker = null),
            n(),
            o.modal.isActive() || this.$body.css('overflow', ''));
      },
      show: function () {
        this.$elm.trigger(o.modal.BEFORE_OPEN, [this._ctx()]),
          this.options.showClose &&
            ((this.closeButton = o(
              '<a href="#close-modal" rel="modal:close" class="close-modal ' +
                this.options.closeClass +
                '">' +
                this.options.closeText +
                '</a>'
            )),
            this.$elm.append(this.closeButton)),
          this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker),
          this.options.doFade
            ? this.$elm
                .css({ opacity: 0, display: 'inline-block' })
                .animate({ opacity: 1 }, this.options.fadeDuration)
            : this.$elm.css('display', 'inline-block'),
          this.$elm.trigger(o.modal.OPEN, [this._ctx()]);
      },
      // affiche la modale, ses comportement, son bouton de fermeture et les animations
      hide: function () {
        this.$elm.trigger(o.modal.BEFORE_CLOSE, [this._ctx()]),
          this.closeButton && this.closeButton.remove();
        var t = this;
        this.options.doFade
          ? this.$elm.fadeOut(this.options.fadeDuration, function () {
              t.$elm.trigger(o.modal.AFTER_CLOSE, [t._ctx()]);
            })
          : this.$elm.hide(0, function () {
              t.$elm.trigger(o.modal.AFTER_CLOSE, [t._ctx()]);
            }),
          this.$elm.trigger(o.modal.CLOSE, [this._ctx()]);
      },
      // supprime la modale avec animatioin 'en option'
      showSpinner: function () {
        this.options.showSpinner &&
          ((this.spinner =
            this.spinner ||
            o(
              '<div class="' + this.options.modalClass + '-spinner"></div>'
            ).append(this.options.spinnerHtml)),
          this.$body.append(this.spinner),
          this.spinner.show());
      },
      // option si true, afficheun spinner
      hideSpinner: function () {
        this.spinner && this.spinner.remove();
      },
      // si demandé, cache le spinner
      _ctx: function () {
        return {
          elm: this.$elm,
          $elm: this.$elm,
          $blocker: this.$blocker,
          options: this.options,
          $anchor: this.anchor,
        };
      },
      // config par défaut
    }),
    (o.modal.close = function (t) {
      if (o.modal.isActive()) {
        t && t.preventDefault();
        var i = l();
        return i.close(), i.$elm;
      }
    }),
    // constants define
    (o.modal.isActive = function () {
      return s.length > 0;
    }),
    // constants define

    (o.modal.getCurrent = l), // constants define
    (o.modal.defaults = {
      closeExisting: !0,
      escapeClose: !0,
      clickClose: !0,
      closeText: 'Close',
      closeClass: '',
      modalClass: 'modal',
      blockerClass: 'jquery-modal',
      spinnerHtml:
        '<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',
      showSpinner: !0,
      showClose: !0,
      fadeDuration: null,
      fadeDelay: 1,
    }),
    // constants define

    (o.modal.BEFORE_BLOCK = 'modal:before-block'),
    (o.modal.BLOCK = 'modal:block'),
    (o.modal.BEFORE_OPEN = 'modal:before-open'),
    (o.modal.OPEN = 'modal:open'),
    (o.modal.BEFORE_CLOSE = 'modal:before-close'),
    (o.modal.CLOSE = 'modal:close'),
    (o.modal.AFTER_CLOSE = 'modal:after-close'),
    (o.modal.AJAX_SEND = 'modal:ajax:send'),
    (o.modal.AJAX_SUCCESS = 'modal:ajax:success'),
    (o.modal.AJAX_FAIL = 'modal:ajax:fail'),
    (o.modal.AJAX_COMPLETE = 'modal:ajax:complete'),
    (o.fn.modal = function (t) {
      return 1 === this.length && new o.modal(this, t), this;
    }), // constants define
    o(i).on('click.modal', 'a[rel~="modal:close"]', o.modal.close),
    o(i).on('click.modal', 'a[rel~="modal:open"]', function (t) {
      t.preventDefault(), o(this).modal();
    });
});

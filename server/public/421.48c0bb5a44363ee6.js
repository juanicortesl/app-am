"use strict";
(self.webpackChunkam_app = self.webpackChunkam_app || []).push([
  [421],
  {
    421: (L, f, l) => {
      l.r(f), l.d(f, { AuthModule: () => E });
      var u = l(9808),
        a = l(2382),
        e = l(4893),
        c = l(5425),
        b = l(5384);
      let y = (() => {
        class n {
          constructor(t, o) {
            (this.router = t),
              (this.apiService = o),
              (this.signInForm = new a.cw({
                email: new a.NI(""),
                password: new a.NI(""),
              }));
          }
          ngOnInit() {}
          signIn() {
            this.signInForm.value.email &&
              this.signInForm.value.password &&
              this.apiService
                .signIn({
                  email: this.signInForm.value.email,
                  password: this.signInForm.value.password,
                })
                .subscribe((t) => {
                  localStorage.setItem("userType", t.userType),
                    localStorage.setItem("token", t.token),
                    this.router.navigate(["dashboard/home"]);
                });
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(e.Y36(c.F0), e.Y36(b.s));
          }),
          (n.ɵcmp = e.Xpm({
            type: n,
            selectors: [["app-sign-in"]],
            decls: 24,
            vars: 2,
            consts: [
              [1, "row", "pt-5"],
              [1, "col-md-2"],
              [1, "col-md-8", "sk-green-pill"],
              [1, "row"],
              [1, "col-md-8"],
              [3, "formGroup"],
              [1, "sk-page-title", "center"],
              [1, "row", "pt-3"],
              [1, "sk-section-title", "center"],
              [
                "id",
                "email",
                "type",
                "email",
                "formControlName",
                "email",
                "placeholder",
                "Correo electr\xf3nico",
              ],
              [1, "row", "pt-2"],
              [
                "id",
                "password",
                "type",
                "password",
                "formControlName",
                "password",
                "placeholder",
                "Contrase\xf1a",
              ],
              [1, "row", "justify-content-md-center", "pt-3"],
              [1, "col-6"],
              [1, "col-5"],
              [
                "type",
                "button",
                1,
                "btn",
                "btn-primary",
                3,
                "disabled",
                "click",
              ],
            ],
            template: function (t, o) {
              1 & t &&
                (e.TgZ(0, "div", 0),
                e._UZ(1, "div", 1),
                e.TgZ(2, "div", 2),
                e.TgZ(3, "div", 3),
                e._UZ(4, "div", 1),
                e.TgZ(5, "div", 4),
                e.TgZ(6, "form", 5),
                e.TgZ(7, "div", 0),
                e.TgZ(8, "div", 6),
                e._uU(9, "Iniciar Sesi\xf3n"),
                e.qZA(),
                e.qZA(),
                e.TgZ(10, "div", 7),
                e.TgZ(11, "div", 8),
                e._uU(12, "\xa1Bienvenido de vuelta!"),
                e.qZA(),
                e.qZA(),
                e.TgZ(13, "div", 0),
                e._UZ(14, "input", 9),
                e.qZA(),
                e.TgZ(15, "div", 10),
                e._UZ(16, "input", 11),
                e.qZA(),
                e.TgZ(17, "div", 12),
                e._UZ(18, "div", 13),
                e.TgZ(19, "div", 14),
                e.TgZ(20, "button", 15),
                e.NdJ("click", function () {
                  return o.signIn();
                }),
                e._uU(21, " Continuar "),
                e.qZA(),
                e.qZA(),
                e.qZA(),
                e.qZA(),
                e.qZA(),
                e._UZ(22, "div", 1),
                e.qZA(),
                e.qZA(),
                e._UZ(23, "div", 1),
                e.qZA()),
                2 & t &&
                  (e.xp6(6),
                  e.Q6J("formGroup", o.signInForm),
                  e.xp6(14),
                  e.Q6J("disabled", o.signInForm.invalid));
            },
            directives: [a._Y, a.JL, a.sg, a.Fj, a.JJ, a.u],
            styles: [""],
          })),
          n
        );
      })();
      var d = l(3191),
        k = l(449),
        g = l(508),
        q = l(5473);
      const w = ["button"],
        M = ["*"],
        _ = new e.OlP("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS"),
        v = new e.OlP("MatButtonToggleGroup"),
        U = { provide: a.JU, useExisting: (0, e.Gpc)(() => A), multi: !0 };
      let Z = 0;
      class T {
        constructor(r, t) {
          (this.source = r), (this.value = t);
        }
      }
      let A = (() => {
        class n {
          constructor(t, o) {
            (this._changeDetector = t),
              (this._vertical = !1),
              (this._multiple = !1),
              (this._disabled = !1),
              (this._controlValueAccessorChangeFn = () => {}),
              (this._onTouched = () => {}),
              (this._name = "mat-button-toggle-group-" + Z++),
              (this.valueChange = new e.vpe()),
              (this.change = new e.vpe()),
              (this.appearance = o && o.appearance ? o.appearance : "standard");
          }
          get name() {
            return this._name;
          }
          set name(t) {
            (this._name = t),
              this._buttonToggles &&
                this._buttonToggles.forEach((o) => {
                  (o.name = this._name), o._markForCheck();
                });
          }
          get vertical() {
            return this._vertical;
          }
          set vertical(t) {
            this._vertical = (0, d.Ig)(t);
          }
          get value() {
            const t = this._selectionModel ? this._selectionModel.selected : [];
            return this.multiple
              ? t.map((o) => o.value)
              : t[0]
              ? t[0].value
              : void 0;
          }
          set value(t) {
            this._setSelectionByValue(t), this.valueChange.emit(this.value);
          }
          get selected() {
            const t = this._selectionModel ? this._selectionModel.selected : [];
            return this.multiple ? t : t[0] || null;
          }
          get multiple() {
            return this._multiple;
          }
          set multiple(t) {
            this._multiple = (0, d.Ig)(t);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            (this._disabled = (0, d.Ig)(t)),
              this._buttonToggles &&
                this._buttonToggles.forEach((o) => o._markForCheck());
          }
          ngOnInit() {
            this._selectionModel = new k.Ov(this.multiple, void 0, !1);
          }
          ngAfterContentInit() {
            this._selectionModel.select(
              ...this._buttonToggles.filter((t) => t.checked)
            );
          }
          writeValue(t) {
            (this.value = t), this._changeDetector.markForCheck();
          }
          registerOnChange(t) {
            this._controlValueAccessorChangeFn = t;
          }
          registerOnTouched(t) {
            this._onTouched = t;
          }
          setDisabledState(t) {
            this.disabled = t;
          }
          _emitChangeEvent() {
            const t = this.selected,
              o = Array.isArray(t) ? t[t.length - 1] : t,
              i = new T(o, this.value);
            this._controlValueAccessorChangeFn(i.value), this.change.emit(i);
          }
          _syncButtonToggle(t, o, i = !1, s = !1) {
            !this.multiple &&
              this.selected &&
              !t.checked &&
              (this.selected.checked = !1),
              this._selectionModel
                ? o
                  ? this._selectionModel.select(t)
                  : this._selectionModel.deselect(t)
                : (s = !0),
              s
                ? Promise.resolve().then(() => this._updateModelValue(i))
                : this._updateModelValue(i);
          }
          _isSelected(t) {
            return this._selectionModel && this._selectionModel.isSelected(t);
          }
          _isPrechecked(t) {
            return (
              void 0 !== this._rawValue &&
              (this.multiple && Array.isArray(this._rawValue)
                ? this._rawValue.some((o) => null != t.value && o === t.value)
                : t.value === this._rawValue)
            );
          }
          _setSelectionByValue(t) {
            (this._rawValue = t),
              this._buttonToggles &&
                (this.multiple && t
                  ? (Array.isArray(t),
                    this._clearSelection(),
                    t.forEach((o) => this._selectValue(o)))
                  : (this._clearSelection(), this._selectValue(t)));
          }
          _clearSelection() {
            this._selectionModel.clear(),
              this._buttonToggles.forEach((t) => (t.checked = !1));
          }
          _selectValue(t) {
            const o = this._buttonToggles.find(
              (i) => null != i.value && i.value === t
            );
            o && ((o.checked = !0), this._selectionModel.select(o));
          }
          _updateModelValue(t) {
            t && this._emitChangeEvent(), this.valueChange.emit(this.value);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(e.Y36(e.sBO), e.Y36(_, 8));
          }),
          (n.ɵdir = e.lG2({
            type: n,
            selectors: [["mat-button-toggle-group"]],
            contentQueries: function (t, o, i) {
              if ((1 & t && e.Suo(i, C, 5), 2 & t)) {
                let s;
                e.iGM((s = e.CRH())) && (o._buttonToggles = s);
              }
            },
            hostAttrs: ["role", "group", 1, "mat-button-toggle-group"],
            hostVars: 5,
            hostBindings: function (t, o) {
              2 & t &&
                (e.uIk("aria-disabled", o.disabled),
                e.ekj("mat-button-toggle-vertical", o.vertical)(
                  "mat-button-toggle-group-appearance-standard",
                  "standard" === o.appearance
                ));
            },
            inputs: {
              appearance: "appearance",
              name: "name",
              vertical: "vertical",
              value: "value",
              multiple: "multiple",
              disabled: "disabled",
            },
            outputs: { valueChange: "valueChange", change: "change" },
            exportAs: ["matButtonToggleGroup"],
            features: [e._Bn([U, { provide: v, useExisting: n }])],
          })),
          n
        );
      })();
      const I = (0, g.Kr)(class {});
      let C = (() => {
          class n extends I {
            constructor(t, o, i, s, R, m) {
              super(),
                (this._changeDetectorRef = o),
                (this._elementRef = i),
                (this._focusMonitor = s),
                (this._isSingleSelector = !1),
                (this._checked = !1),
                (this.ariaLabelledby = null),
                (this._disabled = !1),
                (this.change = new e.vpe());
              const h = Number(R);
              (this.tabIndex = h || 0 === h ? h : null),
                (this.buttonToggleGroup = t),
                (this.appearance =
                  m && m.appearance ? m.appearance : "standard");
            }
            get buttonId() {
              return `${this.id}-button`;
            }
            get appearance() {
              return this.buttonToggleGroup
                ? this.buttonToggleGroup.appearance
                : this._appearance;
            }
            set appearance(t) {
              this._appearance = t;
            }
            get checked() {
              return this.buttonToggleGroup
                ? this.buttonToggleGroup._isSelected(this)
                : this._checked;
            }
            set checked(t) {
              const o = (0, d.Ig)(t);
              o !== this._checked &&
                ((this._checked = o),
                this.buttonToggleGroup &&
                  this.buttonToggleGroup._syncButtonToggle(this, this._checked),
                this._changeDetectorRef.markForCheck());
            }
            get disabled() {
              return (
                this._disabled ||
                (this.buttonToggleGroup && this.buttonToggleGroup.disabled)
              );
            }
            set disabled(t) {
              this._disabled = (0, d.Ig)(t);
            }
            ngOnInit() {
              const t = this.buttonToggleGroup;
              (this._isSingleSelector = t && !t.multiple),
                (this.id = this.id || "mat-button-toggle-" + Z++),
                this._isSingleSelector && (this.name = t.name),
                t &&
                  (t._isPrechecked(this)
                    ? (this.checked = !0)
                    : t._isSelected(this) !== this._checked &&
                      t._syncButtonToggle(this, this._checked));
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              const t = this.buttonToggleGroup;
              this._focusMonitor.stopMonitoring(this._elementRef),
                t &&
                  t._isSelected(this) &&
                  t._syncButtonToggle(this, !1, !1, !0);
            }
            focus(t) {
              this._buttonElement.nativeElement.focus(t);
            }
            _onButtonClick() {
              const t = !!this._isSingleSelector || !this._checked;
              t !== this._checked &&
                ((this._checked = t),
                this.buttonToggleGroup &&
                  (this.buttonToggleGroup._syncButtonToggle(
                    this,
                    this._checked,
                    !0
                  ),
                  this.buttonToggleGroup._onTouched())),
                this.change.emit(new T(this, this.value));
            }
            _markForCheck() {
              this._changeDetectorRef.markForCheck();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(
                e.Y36(v, 8),
                e.Y36(e.sBO),
                e.Y36(e.SBq),
                e.Y36(q.tE),
                e.$8M("tabindex"),
                e.Y36(_, 8)
              );
            }),
            (n.ɵcmp = e.Xpm({
              type: n,
              selectors: [["mat-button-toggle"]],
              viewQuery: function (t, o) {
                if ((1 & t && e.Gf(w, 5), 2 & t)) {
                  let i;
                  e.iGM((i = e.CRH())) && (o._buttonElement = i.first);
                }
              },
              hostAttrs: ["role", "presentation", 1, "mat-button-toggle"],
              hostVars: 12,
              hostBindings: function (t, o) {
                1 & t &&
                  e.NdJ("focus", function () {
                    return o.focus();
                  }),
                  2 & t &&
                    (e.uIk("aria-label", null)("aria-labelledby", null)(
                      "id",
                      o.id
                    )("name", null),
                    e.ekj("mat-button-toggle-standalone", !o.buttonToggleGroup)(
                      "mat-button-toggle-checked",
                      o.checked
                    )("mat-button-toggle-disabled", o.disabled)(
                      "mat-button-toggle-appearance-standard",
                      "standard" === o.appearance
                    ));
              },
              inputs: {
                disableRipple: "disableRipple",
                ariaLabel: ["aria-label", "ariaLabel"],
                ariaLabelledby: ["aria-labelledby", "ariaLabelledby"],
                id: "id",
                name: "name",
                value: "value",
                tabIndex: "tabIndex",
                appearance: "appearance",
                checked: "checked",
                disabled: "disabled",
              },
              outputs: { change: "change" },
              exportAs: ["matButtonToggle"],
              features: [e.qOj],
              ngContentSelectors: M,
              decls: 6,
              vars: 9,
              consts: [
                [
                  "type",
                  "button",
                  1,
                  "mat-button-toggle-button",
                  "mat-focus-indicator",
                  3,
                  "id",
                  "disabled",
                  "click",
                ],
                ["button", ""],
                [1, "mat-button-toggle-label-content"],
                [1, "mat-button-toggle-focus-overlay"],
                [
                  "matRipple",
                  "",
                  1,
                  "mat-button-toggle-ripple",
                  3,
                  "matRippleTrigger",
                  "matRippleDisabled",
                ],
              ],
              template: function (t, o) {
                if (
                  (1 & t &&
                    (e.F$t(),
                    e.TgZ(0, "button", 0, 1),
                    e.NdJ("click", function () {
                      return o._onButtonClick();
                    }),
                    e.TgZ(2, "span", 2),
                    e.Hsn(3),
                    e.qZA(),
                    e.qZA(),
                    e._UZ(4, "span", 3),
                    e._UZ(5, "span", 4)),
                  2 & t)
                ) {
                  const i = e.MAs(1);
                  e.Q6J("id", o.buttonId)("disabled", o.disabled || null),
                    e.uIk("tabindex", o.disabled ? -1 : o.tabIndex)(
                      "aria-pressed",
                      o.checked
                    )("name", o.name || null)("aria-label", o.ariaLabel)(
                      "aria-labelledby",
                      o.ariaLabelledby
                    ),
                    e.xp6(5),
                    e.Q6J("matRippleTrigger", i)(
                      "matRippleDisabled",
                      o.disableRipple || o.disabled
                    );
                }
              },
              directives: [g.wG],
              styles: [
                ".mat-button-toggle-standalone,.mat-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;border-radius:2px;-webkit-tap-highlight-color:transparent}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{border-radius:4px}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:1}.cdk-high-contrast-active .mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:.5}.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{opacity:.04}.mat-button-toggle-appearance-standard.cdk-keyboard-focused:not(.mat-button-toggle-disabled) .mat-button-toggle-focus-overlay{opacity:.12}.cdk-high-contrast-active .mat-button-toggle-appearance-standard.cdk-keyboard-focused:not(.mat-button-toggle-disabled) .mat-button-toggle-focus-overlay{opacity:.5}@media(hover: none){.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;-moz-user-select:none;user-select:none;display:inline-block;line-height:36px;padding:0 16px;position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{border-radius:inherit;pointer-events:none;opacity:0;top:0;left:0;right:0;bottom:0;position:absolute}.mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 36px}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        x = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = e.oAB({ type: n })),
            (n.ɵinj = e.cJS({ imports: [[g.BQ, g.si], g.BQ] })),
            n
          );
        })();
      var p = l(6688);
      function S(n, r) {
        1 & n &&
          (e.TgZ(0, "div", 14),
          e.TgZ(1, "div", 15),
          e.TgZ(2, "span", 16),
          e._uU(3, "Loading..."),
          e.qZA(),
          e.qZA(),
          e.qZA());
      }
      function F(n, r) {
        if (1 & n) {
          const t = e.EpF();
          e.TgZ(0, "div", 14),
            e._UZ(1, "div", 4),
            e.TgZ(2, "div", 17),
            e.TgZ(3, "form", 18),
            e.TgZ(4, "div", 19),
            e._uU(5, "Paso 1 de 2"),
            e.qZA(),
            e.TgZ(6, "div", 20),
            e._uU(
              7,
              " Requisitos: Conexi\xf3n internet \u2013 dispositivo con c\xe1mara y micr\xf3fono "
            ),
            e.qZA(),
            e.TgZ(8, "div", 20),
            e.TgZ(9, "div", 21),
            e._UZ(10, "input", 22),
            e.qZA(),
            e.TgZ(11, "div", 21),
            e._UZ(12, "input", 23),
            e.qZA(),
            e.qZA(),
            e.TgZ(13, "div", 20),
            e.TgZ(14, "div", 24),
            e._UZ(15, "input", 25),
            e.qZA(),
            e.qZA(),
            e.TgZ(16, "div", 20),
            e.TgZ(17, "div", 24),
            e._UZ(18, "input", 26),
            e.qZA(),
            e.qZA(),
            e.TgZ(19, "div", 20),
            e.TgZ(20, "div", 24),
            e._UZ(21, "input", 27),
            e.qZA(),
            e.qZA(),
            e.TgZ(22, "div", 20),
            e.TgZ(23, "div", 24),
            e.TgZ(24, "label", 28),
            e._uU(25, "Fecha de nacimiento "),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e.TgZ(26, "div", 20),
            e.TgZ(27, "div", 24),
            e._UZ(28, "input", 29),
            e.qZA(),
            e.qZA(),
            e.TgZ(29, "div", 20),
            e.TgZ(30, "div", 24),
            e.TgZ(31, "label", 30),
            e._uU(32, "Sexo "),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e.TgZ(33, "div", 20),
            e.TgZ(34, "div", 24),
            e.TgZ(35, "mat-button-toggle-group", 31),
            e.TgZ(36, "mat-button-toggle", 32),
            e._uU(37, "Mujer"),
            e.qZA(),
            e.TgZ(38, "mat-button-toggle", 33),
            e._uU(39, "Hombre"),
            e.qZA(),
            e.TgZ(40, "mat-button-toggle", 34),
            e._uU(41, "Otro"),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e.TgZ(42, "div", 35),
            e._UZ(43, "div", 4),
            e.TgZ(44, "div", 36),
            e.TgZ(45, "div", 0),
            e.TgZ(46, "button", 37),
            e.NdJ("click", function () {
              return e.CHM(t), e.oxw().nextStep();
            }),
            e._uU(47, " Continuar "),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e._UZ(48, "div", 4),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e._UZ(49, "div", 4),
            e.qZA();
        }
        if (2 & n) {
          const t = e.oxw();
          e.xp6(3),
            e.Q6J("formGroup", t.profileForm),
            e.xp6(33),
            e.Q6J(
              "ngClass",
              "woman" === t.profileForm.controls.sex.value
                ? "button-toggle selected"
                : "button-toggle"
            ),
            e.xp6(2),
            e.Q6J(
              "ngClass",
              "man" === t.profileForm.controls.sex.value
                ? "button-toggle selected"
                : "button-toggle"
            ),
            e.xp6(2),
            e.Q6J(
              "ngClass",
              "other" === t.profileForm.controls.sex.value
                ? "button-toggle selected"
                : "button-toggle"
            ),
            e.xp6(6),
            e.Q6J("disabled", t.profileForm.invalid || t.loading);
        }
      }
      function O(n, r) {
        if (1 & n) {
          const t = e.EpF();
          e.TgZ(0, "mat-chip", 45),
            e.NdJ("click", function () {
              const s = e.CHM(t).$implicit;
              return (s.selected = !s.selected);
            }),
            e._uU(1),
            e.qZA();
        }
        if (2 & n) {
          const t = r.$implicit;
          e.Q6J(
            "ngClass",
            t.selected ? "sk-regular-chip selected" : "sk-regular-chip"
          ),
            e.xp6(1),
            e.hij(" ", t.name, " ");
        }
      }
      function B(n, r) {
        if (1 & n) {
          const t = e.EpF();
          e.TgZ(0, "div", 14),
            e._UZ(1, "div", 4),
            e.TgZ(2, "div", 38),
            e.TgZ(3, "div", 19),
            e._uU(4, "Paso 2 de 2"),
            e.qZA(),
            e.TgZ(5, "div", 39),
            e.TgZ(6, "div", 40),
            e._uU(7, "Elecci\xf3n \xe1reas de inter\xe9s"),
            e.qZA(),
            e.qZA(),
            e.TgZ(8, "div", 39),
            e.TgZ(9, "div", 41),
            e.TgZ(10, "p"),
            e._uU(11, "Se pueden escoger todas las que quieras"),
            e.qZA(),
            e.TgZ(12, "p"),
            e._uU(13, "Se puede editar esta informaci\xf3n en tu perfil"),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e.TgZ(14, "div", 39),
            e.TgZ(15, "div", 42),
            e.TgZ(16, "mat-chip-list"),
            e.YNc(17, O, 2, 2, "mat-chip", 43),
            e.TgZ(18, "input", 44),
            e.NdJ("keyup.enter", function () {
              return e.CHM(t), e.oxw().addInterest();
            })("change", function (i) {
              return e.CHM(t), e.oxw().changeInterest(i);
            }),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e.TgZ(19, "div", 35),
            e._UZ(20, "div", 36),
            e.TgZ(21, "div", 4),
            e.TgZ(22, "button", 37),
            e.NdJ("click", function () {
              return e.CHM(t), e.oxw().nextStep();
            }),
            e._uU(23, " Continuar "),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e.qZA(),
            e._UZ(24, "div", 4),
            e.qZA();
        }
        if (2 & n) {
          const t = e.oxw();
          e.xp6(17),
            e.Q6J("ngForOf", t.interests),
            e.xp6(1),
            e.Q6J("ngModel", t.newInterest),
            e.xp6(4),
            e.Q6J("disabled", t.loading);
        }
      }
      const P = function (n) {
          return { display: n };
        },
        N = [
          {
            path: "",
            component: (() => {
              class n {
                constructor(t) {
                  this.router = t;
                }
                ngOnInit() {
                  localStorage.getItem("token") &&
                    this.router.navigate(["dashboard/home"]);
                }
              }
              return (
                (n.ɵfac = function (t) {
                  return new (t || n)(e.Y36(c.F0));
                }),
                (n.ɵcmp = e.Xpm({
                  type: n,
                  selectors: [["app-auth"]],
                  decls: 21,
                  vars: 2,
                  consts: [
                    [1, "container-fluid"],
                    [1, "row", "justify-content-between", "header"],
                    [1, "col-sm-4"],
                    [1, "row"],
                    [1, "col-sm"],
                    [1, "title"],
                    [1, "logo"],
                    [1, "col"],
                    [1, "bi", "bi-house-door-fill", "home"],
                    [1, "col-md-4"],
                    [1, "button", "log-in", 3, "routerLink"],
                    [1, "button", "sign-up", 3, "routerLink"],
                    [1, "container-fluid", "main"],
                  ],
                  template: function (t, o) {
                    1 & t &&
                      (e.TgZ(0, "div", 0),
                      e.TgZ(1, "div", 1),
                      e.TgZ(2, "div", 2),
                      e.TgZ(3, "div", 3),
                      e.TgZ(4, "div", 4),
                      e.TgZ(5, "div", 5),
                      e._uU(6, "Prototipo"),
                      e.qZA(),
                      e.TgZ(7, "div", 6),
                      e._uU(8, "Logo"),
                      e.qZA(),
                      e.qZA(),
                      e.TgZ(9, "div", 7),
                      e._UZ(10, "i", 8),
                      e.qZA(),
                      e.qZA(),
                      e.qZA(),
                      e.TgZ(11, "div", 9),
                      e.TgZ(12, "div", 3),
                      e.TgZ(13, "div", 7),
                      e.TgZ(14, "div", 10),
                      e._uU(15, " Iniciar Sesi\xf3n "),
                      e.qZA(),
                      e.qZA(),
                      e.TgZ(16, "div", 7),
                      e.TgZ(17, "div", 11),
                      e._uU(18, "Registrarse"),
                      e.qZA(),
                      e.qZA(),
                      e.qZA(),
                      e.qZA(),
                      e.qZA(),
                      e.qZA(),
                      e.TgZ(19, "div", 12),
                      e._UZ(20, "router-outlet"),
                      e.qZA()),
                      2 & t &&
                        (e.xp6(14),
                        e.Q6J("routerLink", "sign-in"),
                        e.xp6(3),
                        e.Q6J("routerLink", "sign-up"));
                  },
                  directives: [c.rH, c.lC],
                  styles: [""],
                })),
                n
              );
            })(),
            children: [
              {
                path: "home",
                component: (() => {
                  class n {
                    constructor() {}
                    ngOnInit() {}
                  }
                  return (
                    (n.ɵfac = function (t) {
                      return new (t || n)();
                    }),
                    (n.ɵcmp = e.Xpm({
                      type: n,
                      selectors: [["app-home"]],
                      decls: 9,
                      vars: 0,
                      consts: [
                        [1, "row"],
                        [1, "col-md-6"],
                        [1, "col-md-8"],
                        ["src", "assets/images/home.png"],
                      ],
                      template: function (t, o) {
                        1 & t &&
                          (e.TgZ(0, "div", 0),
                          e.TgZ(1, "div", 1),
                          e.TgZ(2, "h1"),
                          e._uU(3, "Lorem ipsum dolor sit amet"),
                          e.qZA(),
                          e.TgZ(4, "h2"),
                          e._uU(
                            5,
                            " adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. holaaa "
                          ),
                          e.qZA(),
                          e.qZA(),
                          e.qZA(),
                          e.TgZ(6, "div", 0),
                          e.TgZ(7, "div", 2),
                          e._UZ(8, "img", 3),
                          e.qZA(),
                          e.qZA());
                      },
                      styles: [
                        "img[_ngcontent-%COMP%]{width:80%}@media (max-width: 600px){img[_ngcontent-%COMP%]{width:100%}}",
                      ],
                    })),
                    n
                  );
                })(),
              },
              {
                path: "sign-up",
                component: (() => {
                  class n {
                    constructor(t, o) {
                      (this.router = t),
                        (this.apiService = o),
                        (this.timeList = []),
                        (this.step = 1),
                        (this.loading = !1),
                        (this.newInterest = ""),
                        (this.errorPopup = "none"),
                        (this.errorTitle = ""),
                        (this.errorMessage = ""),
                        (this.interests = [
                          { name: "lectura", selected: !1 },
                          { name: "actualidad", selected: !1 },
                          { name: "deportes", selected: !1 },
                          { name: "hobbies", selected: !1 },
                        ]),
                        (this.profileForm = new a.cw({
                          firstName: new a.NI("", [a.kI.required]),
                          lastName: new a.NI("", [a.kI.required]),
                          address: new a.NI("", [a.kI.required]),
                          email: new a.NI("", [a.kI.required]),
                          password: new a.NI("", [a.kI.required]),
                          birthDate: new a.NI("", [a.kI.required]),
                          sex: new a.NI("", [a.kI.required]),
                        }));
                    }
                    ngOnInit() {}
                    nextStep(t = {}) {
                      if (1 == this.step) {
                        this.loading = !0;
                        let o = {
                          first_name: this.profileForm.get("firstName").value,
                          last_name: this.profileForm.get("lastName").value,
                          address: this.profileForm.get("address").value,
                          email: this.profileForm.get("email").value,
                          password: this.profileForm.get("password").value,
                          birth_date: this.profileForm.get("birthDate").value,
                          gender: this.profileForm.get("sex").value,
                        };
                        this.apiService.createUser(o).subscribe({
                          next: (i) => {
                            (this.loading = !1),
                              console.log(i),
                              i &&
                                (localStorage.setItem("token", i.token),
                                this.step++);
                          },
                          error: (i) => {
                            (this.loading = !1),
                              this.openErrorPopup(
                                "Error creando la cuenta",
                                "Verifica que los campos est\xe9n correctos"
                              ),
                              console.log("ERROR", i);
                          },
                        });
                      } else if (2 == this.step) {
                        this.loading = !0;
                        let i = this.interests
                          .filter((s) => s.selected)
                          .map((s) => s.name);
                        this.apiService
                          .setInterests({ interests: i })
                          .subscribe({
                            next: (s) => {
                              (this.loading = !1),
                                console.log(s),
                                this.router.navigate(["dashboard/home"]),
                                (this.step = 0);
                            },
                            error: (s) => {
                              (this.loading = !1),
                                this.openErrorPopup(
                                  "Error agregando los intereses",
                                  "Int\xe9ntalo nuevamente"
                                ),
                                console.log("ERROR", s);
                            },
                          });
                      }
                    }
                    addInterest() {
                      this.interests.push({
                        name: this.newInterest,
                        selected: !1,
                      }),
                        (this.newInterest = "");
                    }
                    changeInterest(t) {
                      this.newInterest = t.target.value;
                    }
                    openErrorPopup(t = "", o = "") {
                      (this.errorTitle = t),
                        (this.errorMessage = o),
                        (this.errorPopup = "block");
                    }
                    closeErrorPopup() {
                      this.errorPopup = "none";
                    }
                  }
                  return (
                    (n.ɵfac = function (t) {
                      return new (t || n)(e.Y36(c.F0), e.Y36(b.s));
                    }),
                    (n.ɵcmp = e.Xpm({
                      type: n,
                      selectors: [["app-sign-up"]],
                      decls: 22,
                      vars: 9,
                      consts: [
                        [1, "row", "justify-content-md-center"],
                        [1, "col-2", "sk-icon-big"],
                        [1, "bi", "bi-arrow-left-circle-fill", 3, "routerLink"],
                        [1, "col-8", "center"],
                        [1, "col-2"],
                        [
                          "class",
                          "row justify-content-md-center sk-scroll-height",
                          4,
                          "ngIf",
                        ],
                        [
                          "tabindex",
                          "-1",
                          "role",
                          "dialog",
                          1,
                          "modal",
                          3,
                          "ngStyle",
                        ],
                        ["role", "document", 1, "modal-dialog"],
                        [1, "modal-content"],
                        [1, "modal-header"],
                        [1, "modal-title"],
                        [1, "modal-body"],
                        [1, "modal-footer"],
                        ["type", "button", 1, "btn", "btn-danger", 3, "click"],
                        [
                          1,
                          "row",
                          "justify-content-md-center",
                          "sk-scroll-height",
                        ],
                        ["role", "status", 1, "sk-spinner-border"],
                        [1, "sr-only"],
                        [1, "col-md-8", "center", "profile-form"],
                        [1, "profile-form", 3, "formGroup"],
                        [1, "row", "steps", "row-margin"],
                        [1, "row", "row-margin"],
                        [1, "col-md-6"],
                        [
                          "id",
                          "first-name",
                          "type",
                          "text",
                          "formControlName",
                          "firstName",
                          "placeholder",
                          "Nombre",
                        ],
                        [
                          "id",
                          "last-name",
                          "type",
                          "text",
                          "formControlName",
                          "lastName",
                          "placeholder",
                          "Apellido",
                        ],
                        [1, "col-md-12"],
                        [
                          "id",
                          "adress",
                          "type",
                          "text",
                          "formControlName",
                          "address",
                          "placeholder",
                          "Direccion",
                        ],
                        [
                          "id",
                          "email",
                          "type",
                          "email",
                          "formControlName",
                          "email",
                          "placeholder",
                          "Correo electr\xf3nico",
                        ],
                        [
                          "id",
                          "password",
                          "type",
                          "password",
                          "formControlName",
                          "password",
                          "placeholder",
                          "Contrase\xf1a",
                        ],
                        ["for", "birthDate"],
                        [
                          "id",
                          "password",
                          "type",
                          "date",
                          "formControlName",
                          "birthDate",
                          "placeholder",
                          "Fecha de nacimiento",
                        ],
                        ["for", "sex"],
                        [
                          "name",
                          "fontStyle",
                          "aria-label",
                          "Font Style",
                          "formControlName",
                          "sex",
                          2,
                          "width",
                          "100%",
                        ],
                        ["value", "woman", 3, "ngClass"],
                        ["value", "man", 3, "ngClass"],
                        ["value", "other", 3, "ngClass"],
                        [1, "row", "justify-content-md-center", "row-margin"],
                        [1, "col-8"],
                        [
                          "type",
                          "button",
                          1,
                          "btn",
                          "btn-primary",
                          3,
                          "disabled",
                          "click",
                        ],
                        [1, "col-md-8", "center"],
                        [1, "row"],
                        [1, "col", "sk-interests-title"],
                        [1, "col", "sk-interests-subtitle"],
                        [1, "col"],
                        [3, "ngClass", "click", 4, "ngFor", "ngForOf"],
                        [
                          "type",
                          "text",
                          "placeholder",
                          "OTROS",
                          3,
                          "ngModel",
                          "keyup.enter",
                          "change",
                        ],
                        [3, "ngClass", "click"],
                      ],
                      template: function (t, o) {
                        1 & t &&
                          (e.TgZ(0, "div", 0),
                          e.TgZ(1, "div", 1),
                          e._UZ(2, "i", 2),
                          e.qZA(),
                          e.TgZ(3, "div", 3),
                          e.TgZ(4, "h2"),
                          e._uU(5, "Crear cuenta nueva"),
                          e.qZA(),
                          e.qZA(),
                          e._UZ(6, "div", 4),
                          e.qZA(),
                          e.YNc(7, S, 4, 0, "div", 5),
                          e.YNc(8, F, 50, 5, "div", 5),
                          e.YNc(9, B, 25, 3, "div", 5),
                          e.TgZ(10, "div", 6),
                          e.TgZ(11, "div", 7),
                          e.TgZ(12, "div", 8),
                          e.TgZ(13, "div", 9),
                          e.TgZ(14, "h4", 10),
                          e._uU(15),
                          e.qZA(),
                          e.qZA(),
                          e.TgZ(16, "div", 11),
                          e.TgZ(17, "p"),
                          e._uU(18),
                          e.qZA(),
                          e.qZA(),
                          e.TgZ(19, "div", 12),
                          e.TgZ(20, "button", 13),
                          e.NdJ("click", function () {
                            return o.closeErrorPopup();
                          }),
                          e._uU(21, " Ok "),
                          e.qZA(),
                          e.qZA(),
                          e.qZA(),
                          e.qZA(),
                          e.qZA()),
                          2 & t &&
                            (e.xp6(2),
                            e.Q6J("routerLink", "/"),
                            e.xp6(5),
                            e.Q6J("ngIf", o.loading),
                            e.xp6(1),
                            e.Q6J("ngIf", 1 == o.step && !o.loading),
                            e.xp6(1),
                            e.Q6J("ngIf", 2 == o.step && !o.loading),
                            e.xp6(1),
                            e.Q6J("ngStyle", e.VKq(7, P, o.errorPopup)),
                            e.xp6(5),
                            e.Oqu(o.errorTitle),
                            e.xp6(3),
                            e.Oqu(o.errorMessage));
                      },
                      directives: [
                        c.rH,
                        u.O5,
                        u.PC,
                        a._Y,
                        a.JL,
                        a.sg,
                        a.Fj,
                        a.JJ,
                        a.u,
                        A,
                        C,
                        u.mk,
                        p.qn,
                        u.sg,
                        a.On,
                        p.HS,
                      ],
                      styles: [
                        ".steps[_ngcontent-%COMP%]{font-size:1.5rem;text-transform:uppercase;font-weight:700;color:#88a0d5}.profile-form[_ngcontent-%COMP%]{font-size:1.5rem;text-align:left}.profile-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%}.profile-form[_ngcontent-%COMP%]   .row-margin[_ngcontent-%COMP%]{margin:10px 0}.profile-form[_ngcontent-%COMP%]   .button-toggle[_ngcontent-%COMP%]{width:33%;margin:0 5px;border:1px solid black}.profile-form[_ngcontent-%COMP%]   .button-toggle.selected[_ngcontent-%COMP%]{background-color:#88a0d5;color:#fff}.mode-selection[_ngcontent-%COMP%]{text-transform:uppercase}.option-container[_ngcontent-%COMP%]{background-color:#4141ef;color:#fff;margin:5vh 1vw;height:67vh;border-top-left-radius:50%;border-top-right-radius:50%}.option-container[_ngcontent-%COMP%]   .option-title[_ngcontent-%COMP%]{font-size:3rem;text-transform:uppercase;font-weight:700;margin:10% 0 5%;background-color:#101326;height:15vh;line-height:15vh}.option-container[_ngcontent-%COMP%]   .option-subtitle[_ngcontent-%COMP%]{font-size:1rem;font-style:italic;background-color:#b2f3af;color:#101326}.option-container[_ngcontent-%COMP%]   .option-description[_ngcontent-%COMP%]{font-size:1rem;padding:5%;text-align:justify}.add-icon[_ngcontent-%COMP%]{color:#38bd49;text-align:center;font-size:1.5rem}.date[_ngcontent-%COMP%]{background-color:#fff;font-size:1rem;border:1px solid black;min-height:30px;min-width:50px;margin:5px}.remove-icon[_ngcontent-%COMP%]{color:#eb2d2d;text-align:center;font-size:1.5rem;margin:5px}",
                      ],
                    })),
                    n
                  );
                })(),
              },
              { path: "sign-in", component: y },
            ],
          },
        ];
      let G = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = e.oAB({ type: n })),
          (n.ɵinj = e.cJS({ imports: [[c.Bz.forChild(N)], c.Bz] })),
          n
        );
      })();
      var J = l(4623);
      let E = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = e.oAB({ type: n })),
          (n.ɵinj = e.cJS({
            imports: [[u.ez, G, a.UX, J.FA, g.XK, x, p.Hi, a.u5]],
          })),
          n
        );
      })();
    },
  },
]);

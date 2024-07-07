const btnCarrito = document.getElementById("verCarrito")
  , btnCarritoMobile = document.getElementById("verCarritoMobile")
  , notif = document.getElementById("notif")
  , notifMobile = document.getElementById("notifMobile")
  , totalCarrito = document.getElementById("totalCart")
  , totalCompra = document.getElementById("totalCompra")
  , btnAgregarProduct = document.querySelectorAll(".agregarItem")
  , btnAddBoton = document.querySelectorAll(".open-add")
  , btnAddDirect = document.querySelectorAll(".add-direct")
  , btnAddDirectMarket = document.querySelectorAll(".add-direct-market")
  , tablaCarrito = document.getElementById("tablaCarrito")
  , tablaPago = document.getElementById("tablePago")
  , btnComboDuoEdit = document.getElementById("agregarComboDuo")
  , btnFelices4Edit = document.getElementById("agregarFelices4")
  , btnEnFamEdit = document.getElementById("agregarFamilia")
  , btnMixEdit = document.getElementById("agregarMix")
  , verCDDetalle = document.querySelectorAll(".verCDDetalle")
  , verF4Detalle = document.querySelectorAll(".verF4Detalle")
  , verFAMDetalle = document.querySelectorAll(".verFAMDetalle")
  , verMixSADetalle = document.querySelectorAll(".verMixSADetalle");
let estadoModal = "";
function actualizarCarritoUI() {
    fetch("/api/carrito.php", {
        method: "POST",
        body: "data=" + encodeURIComponent(JSON.stringify({
            accion: "mostrar"
        })),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then(e=>{
        if (e.ok)
            return e.json();
        throw "Se produjo un error en la solicitud"
    }
    ).then(e=>{
        let t = ""
          , n = "";
        e.items.forEach(e=>{
            if ("" != e.modalCat) {
                let t = []
                  , l = []
                  , a = ""
                  , d = "";
                switch (null != e.cremas && (t = JSON.parse(e.cremas)),
                null != e.adicionales && (l = JSON.parse(e.adicionales)),
                e.modalCat) {
                case "sandwichModal":
                case "sandwichOModal":
                case "burgerModal":
                    t.forEach(e=>{
                        a += e + ","
                    }
                    ),
                    a = a.substring(0, a.length - 1),
                    l.forEach(e=>{
                        d += e + ","
                    }
                    ),
                    d = d.substring(0, d.length - 1),
                    "" == a && (a = "Sin cremas"),
                    "" == d && (d = "Sin adicionales"),
                    n = "Cremas: " + a + "; Adicionales: " + d;
                    break;
                case "jugosModal":
                case "calienteModal":
                case "refrescaModal":
                    n = e.tam;
                    break;
                case "gaseosaModal":
                case "aguaModal":
                    n = e.preferencias;
                    break;
                case "rellenasModal":
                    t.forEach(e=>{
                        a += e + ","
                    }
                    ),
                    "" == (a = a.substring(0, a.length - 1)) && (a = "Sin cremas"),
                    n = "Cremas: " + a;
                    break;
                case "comboDuo":
                    n = `<section idCart=${e.id}><a href="#comboDuoDet" data-toggle="modal" class="text-info verCDDetalle">Ver detalle</a></section>`;
                    break;
                case "felices4":
                    n = `<section idCart=${e.id}><a href="#felices4Det" data-toggle="modal" class="text-info verF4Detalle">Ver detalle</a></section>`;
                    break;
                case "enFamilia":
                    n = `<section idCart=${e.id}><a href="#enFamiliaDet" data-toggle="modal" class="text-info verFAMDetalle">Ver detalle</a></section>`;
                    break;
                case "mixFamiliar":
                    n = `<section idCart=${e.id}><a href="#mixFamiliarDet" data-toggle="modal" class="text-info verMixSADetalle">Ver detalle</a></section>`
                }
            } else
                n = "";
            t += `<tr>\n                        <td class="title" style="width:65%">\n                            <span class="name"><a href="#productModal" data-toggle="modal">${e.producto}</a></span>\n                            <span class="caption text-muted">${n}</span>\n                        </td>\n                        <td class="price" style="width:25%;">${"S/. " + e.precio.toFixed(2)}</td>\n                        <td class="actions" style="width:10%" idCart=${e.id}>\n                            <button type="button" data-target="#${e.modalCat}" data-toggle="modal" class="btn btn-sm action-icon editCart" style="padding:1px;"><i class="ti ti-pencil" style="pointer-events:none;"></i></button>\n                            <button type="button" class="btn btn-sm action-icon dropCart" style="padding:1px;"><i class="ti ti-close" style="pointer-events:none;"></i></button>\n                        </td>\n                    </tr>`
        }
        ),
        tablaCarrito.innerHTML = t,
        document.cookie = `items=${e.info.cantidad}`,
        document.cookie = `count=${e.info.count}`,
        notif.textContent = e.info.cantidad,
        notifMobile.textContent = e.info.cantidad,
        totalCarrito.textContent = "S/ " + (Math.round(100 * e.info.count) / 100).toFixed(2),
        totalCompra.textContent = "S/ " + (Math.round(100 * e.info.count) / 100).toFixed(2)
    }
    ).catch(e=>console.error(e))
}
function removeItemFromShoppingCart(e) {
    let t = {
        accion: "remove",
        id: e
    };
    fetch("/api/carrito.php", {
        method: "POST",
        body: "data=" + encodeURIComponent(JSON.stringify(t)),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then(e=>{
        if (e.ok)
            return e.json();
        throw "Se produjo un error en la solicitud"
    }
    ).then(e=>{
        actualizarCarritoUI()
    }
    ).catch(e=>console.error(e))
}
function addItemToShoppingCart(e, t, n, l, a, d, c, o, r) {
    let i = {
        accion: estadoModal,
        idCarrito: e,
        id: t,
        cremas: JSON.stringify(n),
        adicionales: JSON.stringify(l),
        tamannio: a,
        preferencias: d,
        obs: c,
        modalCat: o,
        tabla: r
    };
    fetch("/api/carrito.php", {
        method: "POST",
        body: "data=" + encodeURIComponent(JSON.stringify(i)),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then(e=>{
        if (e.ok)
            return e.json();
        throw "Se produjo un error en la solicitud"
    }
    ).then(e=>{
        null == tablaPago ? actualizarCarritoUI() : actualizarTablaPago()
    }
    ).catch(e=>console.error(e))
}
async function selectItemToShoppingCart(e) {
    let t = {
        accion: "selectItem",
        id: e
    };
    return new Promise((e,n)=>{
        fetch("/api/carrito.php", {
            method: "POST",
            body: "data=" + encodeURIComponent(JSON.stringify(t)),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(e=>{
            if (e.ok)
                return e.json();
            throw "Se produjo un error en la solicitud"
        }
        ).then(t=>e(t)).catch(e=>n(e))
    }
    )
}
async function selectProduct(e) {
    return new Promise((t,n)=>{
        fetch("/Carta/getProduct/" + e, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(e=>{
            if (e.ok)
                return e.json();
            throw "Se produjo un error en la solicitud"
        }
        ).then(e=>t(e)).catch(e=>n(e))
    }
    )
}
async function getPreciosTam(e) {
    return new Promise((t,n)=>{
        fetch("/Carta/getPrecioTamannio/" + e, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(e=>{
            if (e.ok)
                return e.json();
            throw "Se produjo un error en la solicitud"
        }
        ).then(e=>{
            t(e)
        }
        ).catch(e=>n(e))
    }
    )
}
function editPromToShoppingCart(e, t, n, l, a, d, c, o, r) {
    let i = {
        accion: "edit",
        idCarrito: e,
        id: t,
        cremas: JSON.stringify(n),
        adicionales: JSON.stringify(l),
        tamannio: a,
        preferencias: d,
        obs: c,
        modalCat: o,
        tabla: r
    };
    fetch("/api/carrito.php", {
        method: "POST",
        body: "data=" + encodeURIComponent(JSON.stringify(i)),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then(e=>{
        if (e.ok)
            return e.json();
        throw "Se produjo un error en la solicitud"
    }
    ).then(e=>{
        null == tablaPago ? actualizarCarritoUI() : actualizarTablaPago()
    }
    ).catch(e=>console.error(e))
}
document.addEventListener("DOMContentLoaded", e=>{
    if (null == notif && null == notifMobile)
        return !1;
    const t = document.cookie.split(";");
    let n = null
      , l = null;
    if (null != notif && (notif.textContent = 0),
    null != notifMobile && (notifMobile.textContent = 0),
    totalCarrito.textContent = "S/ " + Math.round(0).toFixed(2),
    t.forEach(e=>{
        e.indexOf("items") > -1 && (n = e),
        e.indexOf("count") > -1 && (l = e)
    }
    ),
    null != n) {
        const e = n.split("=")[1];
        notif.textContent = e,
        notifMobile.textContent = e
    }
    if (null != l) {
        const e = l.split("=")[1];
        totalCarrito.textContent = "S/ " + (Math.round(100 * e) / 100).toFixed(2)
    }
}
),
tablaCarrito.addEventListener("click", async e=>{
    if ("BUTTON" == e.target.tagName)
        if (e.target.classList.contains("dropCart")) {
            removeItemFromShoppingCart(e.target.parentElement.getAttribute("idCart"))
        } else {
            if (!e.target.classList.contains("editCart"))
                return !1;
            {
                estadoModal = "edit";
                let t, n, l = e.target.parentElement.getAttribute("idCart");
                if (await selectItemToShoppingCart(l).then(e=>t = e),
                "" != t.modalCat) {
                    let e = t.modalCat + "Details"
                      , l = document.getElementById(e);
                    switch (l.setAttribute("carritoId", t.id),
                    l.setAttribute("productId", t.idProd),
                    await selectProduct(t.idProd).then(e=>n = e),
                    null != l.children[0].children[0] && (l.children[0].children[0].textContent = n.PROD_NOMBRE),
                    null != l.children[0].children[1] && (l.children[0].children[1].textContent = n.PROD_DESCRIPCION),
                    l.children[1].textContent = "S/ " + n.PROD_PRECIO,
                    t.modalCat) {
                    case "jugosModal":
                    case "calienteModal":
                    case "refrescaModal":
                        let e, a = t.modalCat + "Tam", d = document.querySelectorAll("." + a);
                        "Grande - 32 Oz" == t.tam ? t.idProd -= 2 : "Mediano - 21 Oz" == t.tam && (t.idProd -= 1),
                        await getPreciosTam(t.idProd).then(t=>e = t);
                        let c = t.modalCat + "Tam"
                          , o = document.querySelectorAll("." + c)
                          , r = "";
                        for (let t = 0; t < o.length; t++)
                            o[t].parentElement.parentElement.hidden = !1,
                            0 == t ? r = "Pequeño - 16 Oz (S/ " + e.peq + ")" : 1 == t ? -1 != e.med ? r = "Mediano - 21 Oz (S/ " + e.med + ")" : (o[t].parentElement.parentElement.hidden = !0,
                            r = "") : -1 != e.gran ? r = "Grande - 32 Oz (S/ " + e.gran + ")" : (o[t].parentElement.parentElement.hidden = !0,
                            r = ""),
                            o[t].parentElement.children[2].textContent = r;
                        for (let e = 0; e < d.length; e++) {
                            let n = d[e].parentElement.children[2].textContent.lastIndexOf("(");
                            d[e].parentElement.children[2].textContent.substring(0, n - 1) == t.tam && (d[e].checked = !0)
                        }
                        document.getElementById(t.modalCat + "Obs").value = t.obs;
                        break;
                    case "aguaModal":
                        let i = t.modalCat + "Pref";
                        document.querySelectorAll("." + i).forEach(e=>{
                            e.parentElement.children[2].textContent == t.preferencias && (e.checked = !0)
                        }
                        );
                        break;
                    case "gaseosaModal":
                        let s = t.modalCat + "Pref";
                        document.querySelectorAll("." + s).forEach(e=>{
                            e.parentElement.children[2].textContent == t.preferencias && (e.checked = !0)
                        }
                        ),
                        document.getElementById(t.modalCat + "Obs").value = t.obs;
                        break;
                    case "sandwichModal":
                    case "sandwichOModal":
                    case "burgerModal":
                        let m = t.modalCat + "Cremas"
                          , u = document.querySelectorAll("." + m)
                          , h = t.modalCat + "Add"
                          , E = document.querySelectorAll("." + h);
                        u.forEach(e=>{
                            JSON.parse(t.cremas).includes(e.parentElement.children[2].textContent) && (e.checked = !0)
                        }
                        ),
                        E.forEach(e=>{
                            let n = JSON.parse(t.adicionales)
                              , l = e.parentElement.children[2].textContent.lastIndexOf("(")
                              , a = e.parentElement.children[2].textContent.substring(0, l - 1);
                            n.includes(a) && (e.checked = !0)
                        }
                        ),
                        document.getElementById(t.modalCat + "Obs").value = t.obs;
                        break;
                    case "rellenasModal":
                        let p = t.modalCat + "Cremas";
                        document.querySelectorAll("." + p).forEach(e=>{
                            JSON.parse(t.cremas).includes(e.parentElement.children[2].textContent) && (e.checked = !0)
                        }
                        ),
                        document.getElementById(t.modalCat + "Obs").value = t.obs;
                        break;
                    case "comboDuo":
                        const g = JSON.parse(t.preferencias)
                          , b = g.sandwich1
                          , y = g.sandwich2
                          , C = document.querySelectorAll(".cdCremas1Edit")
                          , f = document.querySelectorAll(".cdCremas2Edit")
                          , I = document.querySelectorAll(".cdAdd1Edit")
                          , A = document.querySelectorAll(".cdAdd2Edit");
                        C.forEach(e=>{
                            let t = b.cremas.includes(e.parentElement.children[2].textContent);
                            e.checked = !!t
                        }
                        ),
                        f.forEach(e=>{
                            let t = y.cremas.includes(e.parentElement.children[2].textContent);
                            e.checked = !!t
                        }
                        ),
                        I.forEach(e=>{
                            let t = e.parentElement.children[2].textContent.lastIndexOf("(")
                              , n = e.parentElement.children[2].textContent.substring(0, t - 1)
                              , l = b.adds.includes(n);
                            e.checked = !!l
                        }
                        ),
                        A.forEach(e=>{
                            let t = e.parentElement.children[2].textContent.lastIndexOf("(")
                              , n = e.parentElement.children[2].textContent.substring(0, t - 1)
                              , l = y.adds.includes(n);
                            e.checked = !!l
                        }
                        ),
                        document.getElementById("cdObs1Edit").value = b.obs,
                        document.getElementById("cdObs2Edit").value = y.obs,
                        document.getElementById("CDS1Edit").setAttribute("class", "nav-link active"),
                        document.getElementById("CDS2Edit").setAttribute("class", "nav-link"),
                        document.getElementById("panelTopCremas1Edit").setAttribute("class", "collapse show"),
                        document.getElementById("panelTopAdicionales1Edit").setAttribute("class", "collapse"),
                        document.getElementById("panelTopObs1Edit").setAttribute("class", "collapse"),
                        document.getElementById("CremCD1Edit").checked = !1,
                        document.getElementById("AddsCD1Edit").checked = !1,
                        document.getElementById("ObsCD1Edit").checked = !1,
                        document.getElementById("panelTopCremas2Edit").setAttribute("class", "collapse show"),
                        document.getElementById("panelTopAdicionales2Edit").setAttribute("class", "collapse"),
                        document.getElementById("panelTopObs2Edit").setAttribute("class", "collapse"),
                        document.getElementById("CremCD2Edit").checked = !1,
                        document.getElementById("AddsCD2Edit").checked = !1,
                        document.getElementById("ObsCD2Edit").checked = !1,
                        document.getElementById("sandwich1Edit").setAttribute("class", "tab-pane fade active show"),
                        document.getElementById("sandwich2Edit").setAttribute("class", "tab-pane fade");
                        break;
                    case "felices4":
                        const B = JSON.parse(t.preferencias)
                          , S = B.sandwich1
                          , k = B.sandwich2
                          , O = B.sandwich3
                          , x = B.sandwich4
                          , v = document.querySelectorAll(".f4Cremas1Edit")
                          , w = document.querySelectorAll(".f4Cremas2Edit")
                          , M = document.querySelectorAll(".f4Cremas3Edit")
                          , T = document.querySelectorAll(".f4Cremas4Edit")
                          , F = document.querySelectorAll(".f4Tipo1Edit")
                          , D = document.querySelectorAll(".f4Tipo2Edit")
                          , q = document.querySelectorAll(".f4Tipo3Edit")
                          , P = document.querySelectorAll(".f4Tipo4Edit");
                        v.forEach(e=>{
                            let t = S.cremas.includes(e.parentElement.children[2].textContent);
                            e.checked = !!t
                        }
                        ),
                        w.forEach(e=>{
                            let t = k.cremas.includes(e.parentElement.children[2].textContent);
                            e.checked = !!t
                        }
                        ),
                        M.forEach(e=>{
                            let t = O.cremas.includes(e.parentElement.children[2].textContent);
                            e.checked = !!t
                        }
                        ),
                        T.forEach(e=>{
                            let t = x.cremas.includes(e.parentElement.children[2].textContent);
                            e.checked = !!t
                        }
                        ),
                        F.forEach(e=>{
                            e.parentElement.children[2].textContent == S.tipo ? e.checked = !0 : e.checked = !1
                        }
                        ),
                        D.forEach(e=>{
                            e.parentElement.children[2].textContent == k.tipo ? e.checked = !0 : e.checked = !1
                        }
                        ),
                        q.forEach(e=>{
                            e.parentElement.children[2].textContent == O.tipo ? e.checked = !0 : e.checked = !1
                        }
                        ),
                        P.forEach(e=>{
                            e.parentElement.children[2].textContent == x.tipo ? e.checked = !0 : e.checked = !1
                        }
                        ),
                        document.getElementById("f4Obs1Edit").value = S.obs,
                        document.getElementById("f4Obs2Edit").value = k.obs,
                        document.getElementById("f4Obs3Edit").value = O.obs,
                        document.getElementById("f4Obs4Edit").value = x.obs,
                        document.getElementById("F41Edit").setAttribute("class", "nav-link active"),
                        document.getElementById("F42Edit").setAttribute("class", "nav-link"),
                        document.getElementById("F43Edit").setAttribute("class", "nav-link"),
                        document.getElementById("F44Edit").setAttribute("class", "nav-link"),
                        document.getElementById("panelTopCremas3Edit").setAttribute("class", "collapse show"),
                        document.getElementById("panelTopAdicionales3Edit").setAttribute("class", "collapse"),
                        document.getElementById("panelTopObs3Edit").setAttribute("class", "collapse"),
                        document.getElementById("CremF41Edit").checked = !1,
                        document.getElementById("AddsF41Edit").checked = !1,
                        document.getElementById("ObsF41Edit").checked = !1,
                        document.getElementById("panelTopCremas4Edit").setAttribute("class", "collapse show"),
                        document.getElementById("panelTopAdicionales4Edit").setAttribute("class", "collapse"),
                        document.getElementById("panelTopObs4Edit").setAttribute("class", "collapse"),
                        document.getElementById("CremF42Edit").checked = !1,
                        document.getElementById("AddsF42Edit").checked = !1,
                        document.getElementById("ObsF42Edit").checked = !1,
                        document.getElementById("panelTopCremas5Edit").setAttribute("class", "collapse show"),
                        document.getElementById("panelTopAdicionales5Edit").setAttribute("class", "collapse"),
                        document.getElementById("panelTopObs5Edit").setAttribute("class", "collapse"),
                        document.getElementById("CremF43Edit").checked = !1,
                        document.getElementById("AddsF43Edit").checked = !1,
                        document.getElementById("ObsF43Edit").checked = !1,
                        document.getElementById("panelTopCremas6Edit").setAttribute("class", "collapse show"),
                        document.getElementById("panelTopAdicionales6Edit").setAttribute("class", "collapse"),
                        document.getElementById("panelTopObs6Edit").setAttribute("class", "collapse"),
                        document.getElementById("CremF44Edit").checked = !1,
                        document.getElementById("AddsF44Edit").checked = !1,
                        document.getElementById("ObsF44Edit").checked = !1,
                        document.getElementById("sandwich3Edit").setAttribute("class", "tab-pane fade active show"),
                        document.getElementById("sandwich4Edit").setAttribute("class", "tab-pane fade"),
                        document.getElementById("sandwich5Edit").setAttribute("class", "tab-pane fade"),
                        document.getElementById("sandwich6Edit").setAttribute("class", "tab-pane fade");
                        break;
                    case "enFamilia":
                        const N = JSON.parse(t.preferencias)
                          , J = JSON.parse(t.cremas)
                          , L = document.querySelectorAll(".famCremasEdit");
                        document.getElementById("cantPolloEdit").value = N.pollo,
                        document.getElementById("cantPavoEdit").value = N.pavo,
                        document.getElementById("cantChicharronEdit").value = N.chicharron,
                        document.getElementById("cantLechonEdit").value = N.lechon,
                        L.forEach(e=>{
                            let t = J.includes(e.parentElement.children[2].textContent);
                            e.checked = !!t
                        }
                        ),
                        document.getElementById("famObsEdit").value = t.obs,
                        document.getElementById("Fam1Edit").setAttribute("class", "nav-link active"),
                        document.getElementById("Fam2Edit").setAttribute("class", "nav-link"),
                        document.getElementById("Fam3Edit").setAttribute("class", "nav-link"),
                        document.getElementById("Fam4Edit").setAttribute("class", "nav-link"),
                        document.getElementById("polloEdit").setAttribute("class", "tab-pane fade active show"),
                        document.getElementById("pavoEdit").setAttribute("class", "tab-pane fade"),
                        document.getElementById("chicharronEdit").setAttribute("class", "tab-pane fade"),
                        document.getElementById("lechonEdit").setAttribute("class", "tab-pane fade"),
                        document.getElementById("panelTopCremasFamEdit").setAttribute("class", "collapse"),
                        document.getElementById("panelTopObsFamEdit").setAttribute("class", "collapse"),
                        document.getElementById("CremasFamEdit").checked = !1,
                        document.getElementById("ObsFamEdit").checked = !1;
                        break;
                    case "mixFamiliar":
                        const j = JSON.parse(t.preferencias)
                          , z = JSON.parse(t.cremas)
                          , R = document.querySelectorAll(".famSATipoEdit");
                        document.querySelectorAll(".famSACremasEdit").forEach(e=>{
                            let t = z.includes(e.parentElement.children[2].textContent);
                            e.checked = !!t
                        }
                        ),
                        R.forEach(e=>{
                            let t = j.includes(e.parentElement.children[2].textContent);
                            e.checked = !!t
                        }
                        ),
                        document.getElementById("famSAObsEdit").value = t.obs,
                        document.getElementById("panelCarnesEdit").setAttribute("class", "collapse show"),
                        document.getElementById("panelTopCremasFam2Edit").setAttribute("class", "collapse"),
                        document.getElementById("panelTopObsFam2Edit").setAttribute("class", "collapse"),
                        document.getElementById("TipoFamSAEdit").checked = !1,
                        document.getElementById("CremasFamSAEdit").checked = !1,
                        document.getElementById("ObsFamSAEdit").checked = !1
                    }
                }
            }
        }
    else {
        if ("A" != e.target.tagName)
            return !1;
        {
            let t, n = e.target.parentElement.getAttribute("idCart");
            await selectItemToShoppingCart(n).then(e=>t = e);
            const l = JSON.parse(t.preferencias);
            if (e.target.classList.contains("verCDDetalle")) {
                const e = l.sandwich1
                  , t = l.sandwich2;
                document.getElementById("S1CD").children[0].textContent = "Cremas: " + e.cremas,
                document.getElementById("S1CD").children[1].textContent = "Adicionales: " + e.adds,
                document.getElementById("S1CD").children[2].textContent = "Observaciones: " + e.obs,
                document.getElementById("S2CD").children[0].textContent = "Cremas: " + t.cremas,
                document.getElementById("S2CD").children[1].textContent = "Adicionales: " + t.adds,
                document.getElementById("S2CD").children[2].textContent = "Observaciones: " + t.obs
            } else if (e.target.classList.contains("verF4Detalle")) {
                const e = l.sandwich1
                  , t = l.sandwich2
                  , n = l.sandwich3
                  , a = l.sandwich4;
                document.getElementById("S1F4").children[0].textContent = "Cremas: " + e.cremas,
                document.getElementById("S1F4").children[1].textContent = "Tipo: " + e.tipo,
                document.getElementById("S1F4").children[2].textContent = "Observaciones: " + e.obs,
                document.getElementById("S2F4").children[0].textContent = "Cremas: " + t.cremas,
                document.getElementById("S2F4").children[1].textContent = "Tipo: " + t.tipo,
                document.getElementById("S2F4").children[2].textContent = "Observaciones: " + t.obs,
                document.getElementById("S3F4").children[0].textContent = "Cremas: " + n.cremas,
                document.getElementById("S3F4").children[1].textContent = "Tipo: " + n.tipo,
                document.getElementById("S3F4").children[2].textContent = "Observaciones: " + n.obs,
                document.getElementById("S4F4").children[0].textContent = "Cremas: " + a.cremas,
                document.getElementById("S4F4").children[1].textContent = "Tipo: " + a.tipo,
                document.getElementById("S4F4").children[2].textContent = "Observaciones: " + a.obs
            } else if (e.target.classList.contains("verFAMDetalle")) {
                let e = "";
                0 != l.pollo && (e += `<li>${l.pollo} de pollo</li>`),
                0 != l.pavo && (e += `<li>${l.pavo} de pavo</li>`),
                0 != l.chicharron && (e += `<li>${l.chicharron} de chicharrón</li>`),
                0 != l.lechon && (e += `<li>${l.lechon} de lechón</li>`);
                const n = JSON.parse(t.cremas);
                let a = "";
                n.forEach(e=>{
                    a += `<li>${e}</li>`
                }
                ),
                document.getElementById("SandFAMD").innerHTML = e,
                document.getElementById("CremasFAMD").innerHTML = a,
                document.getElementById("ObsFAMD").children[0].textContent = t.obs
            } else if (e.target.classList.contains("verMixSADetalle")) {
                let e = "";
                l.forEach(t=>{
                    e += `<li>${t}</li>`
                }
                );
                const n = JSON.parse(t.cremas);
                let a = "";
                n.forEach(e=>{
                    a += `<li>${e}</li>`
                }
                ),
                "" == t.obs && (t.obs = "Sin observaciones"),
                document.getElementById("CarnesMixSanAgus").innerHTML = e,
                document.getElementById("CremasMixSanAgus").innerHTML = a,
                document.getElementById("ObsMixSanAgus").children[0].textContent = t.obs
            }
        }
    }
}
),
null != btnCarrito && btnCarrito.addEventListener("click", ()=>{
    actualizarCarritoUI()
}
),
null != btnCarritoMobile && btnCarritoMobile.addEventListener("click", ()=>{
    actualizarCarritoUI()
}
),
btnAgregarProduct.forEach(e=>{
    e.addEventListener("click", e=>{
        let t = e.target.parentElement.parentElement.parentElement.id
          , n = t + "Details"
          , l = document.getElementById(n)
          , a = l.getAttribute("productId")
          , d = l.getAttribute("carritoId");
        switch (null == d && (d = null),
        t) {
        case "jugosModal":
        case "calienteModal":
        case "refrescaModal":
            let e, n = "", l = t + "Tam", c = document.querySelectorAll("." + l), o = 0;
            for (let t = 0; t < c.length; t++)
                if (c[t].checked) {
                    o = 1,
                    a = parseInt(a) + t;
                    let n = c[t].parentElement.children[2].textContent.lastIndexOf("(");
                    e = c[t].parentElement.children[2].textContent.substring(0, n - 1)
                }
            n = document.getElementById(t + "Obs").value,
            0 == o ? alert("Seleccione un tamaño") : addItemToShoppingCart(d, a, null, null, e, null, n, t, "Carta");
            break;
        case "gaseosaModal":
            let r = ""
              , i = ""
              , s = t + "Pref";
            document.querySelectorAll("." + s).forEach(e=>{
                e.checked && (r = e.parentElement.children[2].textContent)
            }
            ),
            i = document.getElementById(t + "Obs").value,
            addItemToShoppingCart(d, a, null, null, null, r, i, t, "Carta");
            break;
        case "aguaModal":
            let m = ""
              , u = t + "Pref";
            document.querySelectorAll("." + u).forEach(e=>{
                e.checked && (m = e.parentElement.children[2].textContent)
            }
            ),
            addItemToShoppingCart(d, a, null, null, null, m, null, t, "Carta");
            break;
        case "sandwichModal":
        case "sandwichOModal":
        case "burgerModal":
            let h = []
              , E = []
              , p = ""
              , g = t + "Cremas"
              , b = document.querySelectorAll("." + g)
              , y = t + "Add"
              , C = document.querySelectorAll("." + y);
            b.forEach(e=>{
                e.checked && h.push(e.parentElement.children[2].textContent)
            }
            ),
            C.forEach(e=>{
                if (e.checked) {
                    let t = e.parentElement.children[2].textContent.lastIndexOf("(")
                      , n = e.parentElement.children[2].textContent.substring(0, t - 1);
                    E.push(n)
                }
            }
            ),
            p = document.getElementById(t + "Obs").value,
            addItemToShoppingCart(d, a, h, E, null, null, p, t, "Carta");
            break;
        case "rellenasModal":
            let f = []
              , I = ""
              , A = t + "Cremas";
            document.querySelectorAll("." + A).forEach(e=>{
                e.checked && f.push(e.parentElement.children[2].textContent)
            }
            ),
            I = document.getElementById(t + "Obs").value,
            addItemToShoppingCart(d, a, f, null, null, null, I, t, "Carta")
        }
    }
    )
}
),
btnAddBoton.forEach(e=>{
    e.addEventListener("click", async e=>{
        estadoModal = "add";
        let t = ""
          , n = e.target.parentElement.getAttribute("prod-id")
          , l = e.target.parentElement.parentElement.children[0].children[0].textContent
          , a = e.target.parentElement.parentElement.children[0].children[1].textContent
          , d = e.target.parentElement.children[0].textContent.substring(6)
          , c = e.target.getAttribute("data-target").substring(1)
          , o = c + "Details"
          , r = document.getElementById(o);
        if (null != r)
            if (r.setAttribute("productId", n),
            null != r.children[0].children[0] && (r.children[0].children[0].textContent = l),
            null != r.children[0].children[1] && (r.children[0].children[1].textContent = a),
            r.children[1].textContent = d,
            "refrescaModal" == c || "jugosModal" == c || "calienteModal" == c) {
                let e;
                await getPreciosTam(n).then(t=>e = t);
                let l = c + "Tam";
                t = c + "Obs",
                document.getElementById(t).value = "",
                "jugosModal" == c ? (document.getElementById("panelJugosSize").setAttribute("class", "collapse show"),
                document.getElementById("panelJugosObs").setAttribute("class", "collapse"),
                document.getElementById("checkTamJug").checked = !1,
                document.getElementById("checkObsJug").checked = !1) : "refrescaModal" == c ? (document.getElementById("panelRefrescaSize").setAttribute("class", "collapse show"),
                document.getElementById("panelRefrescaObs").setAttribute("class", "collapse"),
                document.getElementById("checkTamRef").checked = !1,
                document.getElementById("checkObsRef").checked = !1) : (document.getElementById("panelCalienteSize").setAttribute("class", "collapse show"),
                document.getElementById("panelCalienteObs").setAttribute("class", "collapse"),
                document.getElementById("checkTamBebCal").checked = !1,
                document.getElementById("checkObsBebCal").checked = !1);
                let a = document.querySelectorAll("." + l)
                  , d = "";
                for (let t = 0; t < a.length; t++)
                    a[t].checked = !1,
                    a[t].parentElement.parentElement.hidden = !1,
                    0 == t ? d = "Pequeño - 16 Oz (S/ " + e.peq + ")" : 1 == t ? -1 != e.med ? d = "Mediano - 21 Oz (S/ " + e.med + ")" : (a[t].parentElement.parentElement.hidden = !0,
                    d = "") : -1 != e.gran ? d = "Grande - 32 Oz (S/ " + e.gran + ")" : (a[t].parentElement.parentElement.hidden = !0,
                    d = ""),
                    a[t].parentElement.children[2].textContent = d
            } else if ("sandwichModal" == c || "sandwichOModal" == c || "burgerModal" == c) {
                let e = c + "Cremas"
                  , n = c + "Add";
                t = c + "Obs",
                document.getElementById(t).value = "",
                "sandwichModal" == c ? (document.getElementById("panelSandwichesCremas").setAttribute("class", "collapse show"),
                document.getElementById("panelSandwichesAdicionales").setAttribute("class", "collapse"),
                document.getElementById("panelSandwichesObs").setAttribute("class", "collapse"),
                document.getElementById("checkCremasSand").checked = !1,
                document.getElementById("checkAddSand").checked = !1,
                document.getElementById("checkObsSand").checked = !1) : "sandwichOModal" == c ? (document.getElementById("panelDetailsCremasO").setAttribute("class", "collapse show"),
                document.getElementById("panelDetailsAdicionalesO").setAttribute("class", "collapse"),
                document.getElementById("panelDetailsObsO").setAttribute("class", "collapse"),
                document.getElementById("checkCremasSandO").checked = !1,
                document.getElementById("checkAddSandO").checked = !1,
                document.getElementById("checkObsSandO").checked = !1) : (document.getElementById("panelBurgersCremas").setAttribute("class", "collapse show"),
                document.getElementById("panelBurgersAdicionales").setAttribute("class", "collapse"),
                document.getElementById("panelBurgersObs").setAttribute("class", "collapse"),
                document.getElementById("checkCremasBur").checked = !1,
                document.getElementById("checkAddBur").checked = !1,
                document.getElementById("checkObsBur").checked = !1);
                let l = document.querySelectorAll("." + e)
                  , a = document.querySelectorAll("." + n);
                l.forEach(e=>{
                    e.checked = !1
                }
                ),
                a.forEach(e=>{
                    e.checked = !1
                }
                )
            } else if ("rellenasModal" == c) {
                let e = c + "Cremas";
                t = c + "Obs",
                document.getElementById(t).value = "",
                document.getElementById("panelRellenasCremas").setAttribute("class", "collapse show"),
                document.getElementById("panelRellenasObs").setAttribute("class", "collapse"),
                document.getElementById("checkCremasRellenas").checked = !1,
                document.getElementById("checkObsRellenas").checked = !1,
                document.querySelectorAll("." + e).forEach(e=>{
                    e.checked = !1
                }
                )
            } else if ("gaseosaModal" == c) {
                let e = c + "Pref";
                t = c + "Obs",
                document.getElementById(t).value = "",
                document.getElementById("panelGaseosasMarca").setAttribute("class", "collapse show"),
                document.getElementById("panelGaseosasObs").setAttribute("class", "collapse"),
                document.getElementById("checkPrefGas").checked = !1,
                document.getElementById("checkObsGas").checked = !1,
                document.querySelectorAll("." + e).forEach(e=>{
                    e.checked = !1
                }
                )
            } else if ("aguaModal" == c) {
                let e = c + "Pref";
                document.getElementById("panelAguaMarca").setAttribute("class", "collapse show"),
                document.getElementById("checkPrefAgua").checked = !1,
                document.querySelectorAll("." + e).forEach(e=>{
                    e.checked = !1
                }
                )
            }
    }
    )
}
),
btnAddDirect.forEach(e=>{
    e.addEventListener("click", e=>{
        let t = e.target.parentElement.getAttribute("prod-id");
        estadoModal = "add",
        addItemToShoppingCart(null, t, null, null, null, null, null, "", "Carta")
    }
    )
}
),
btnAddDirectMarket.forEach(e=>{
    e.addEventListener("click", e=>{
        let t = e.target.parentElement.getAttribute("prod-id");
        estadoModal = "add",
        addItemToShoppingCart(null, t, null, null, null, null, null, "", "Market")
    }
    )
}
),
btnComboDuoEdit.addEventListener("click", e=>{
    const t = document.querySelectorAll(".cdCremas1Edit")
      , n = document.querySelectorAll(".cdCremas2Edit")
      , l = document.querySelectorAll(".cdAdd1Edit")
      , a = document.querySelectorAll(".cdAdd2Edit")
      , d = document.getElementById("cdObs1Edit")
      , c = document.getElementById("cdObs2Edit");
    let o = document.getElementById("comboDuoDetails")
      , r = o.getAttribute("productId")
      , i = o.getAttribute("carritoId")
      , s = []
      , m = []
      , u = []
      , h = [];
    t.forEach(e=>{
        e.checked && s.push(e.parentElement.children[2].textContent)
    }
    ),
    n.forEach(e=>{
        e.checked && u.push(e.parentElement.children[2].textContent)
    }
    ),
    l.forEach(e=>{
        if (e.checked) {
            let t = e.parentElement.children[2].textContent.lastIndexOf("(")
              , n = e.parentElement.children[2].textContent.substring(0, t - 1);
            m.push(n)
        }
    }
    ),
    a.forEach(e=>{
        if (e.checked) {
            let t = e.parentElement.children[2].textContent.lastIndexOf("(")
              , n = e.parentElement.children[2].textContent.substring(0, t - 1);
            h.push(n)
        }
    }
    );
    let E = {
        sandwich1: {
            cremas: s,
            adds: m,
            obs: d.value
        },
        sandwich2: {
            cremas: u,
            adds: h,
            obs: c.value
        }
    };
    arrayAdds = m.concat(h),
    editPromToShoppingCart(i, r, null, arrayAdds, null, JSON.stringify(E), null, "comboDuo", "Carta"),
    alertify.success("Combo Dúo editado correctamente")
}
),
btnFelices4Edit.addEventListener("click", ()=>{
    let e = document.getElementById("felices4Details")
      , t = e.getAttribute("productId")
      , n = e.getAttribute("carritoId");
    const l = document.querySelectorAll(".f4Cremas1Edit")
      , a = document.querySelectorAll(".f4Cremas2Edit")
      , d = document.querySelectorAll(".f4Cremas3Edit")
      , c = document.querySelectorAll(".f4Cremas4Edit")
      , o = document.querySelectorAll(".f4Tipo1Edit")
      , r = document.querySelectorAll(".f4Tipo2Edit")
      , i = document.querySelectorAll(".f4Tipo3Edit")
      , s = document.querySelectorAll(".f4Tipo4Edit")
      , m = document.getElementById("f4Obs1Edit")
      , u = document.getElementById("f4Obs2Edit")
      , h = document.getElementById("f4Obs3Edit")
      , E = document.getElementById("f4Obs4Edit");
    let p = []
      , g = ""
      , b = []
      , y = ""
      , C = []
      , f = ""
      , I = []
      , A = "";
    l.forEach(e=>{
        e.checked && p.push(e.parentElement.children[2].textContent)
    }
    ),
    a.forEach(e=>{
        e.checked && b.push(e.parentElement.children[2].textContent)
    }
    ),
    d.forEach(e=>{
        e.checked && C.push(e.parentElement.children[2].textContent)
    }
    ),
    c.forEach(e=>{
        e.checked && I.push(e.parentElement.children[2].textContent)
    }
    ),
    o.forEach(e=>{
        e.checked && (g = e.parentElement.children[2].textContent)
    }
    ),
    r.forEach(e=>{
        e.checked && (y = e.parentElement.children[2].textContent)
    }
    ),
    i.forEach(e=>{
        e.checked && (f = e.parentElement.children[2].textContent)
    }
    ),
    s.forEach(e=>{
        e.checked && (A = e.parentElement.children[2].textContent)
    }
    );
    let B = {
        sandwich1: {
            cremas: p,
            tipo: g,
            obs: m.value
        },
        sandwich2: {
            cremas: b,
            tipo: y,
            obs: u.value
        },
        sandwich3: {
            cremas: C,
            tipo: f,
            obs: h.value
        },
        sandwich4: {
            cremas: I,
            tipo: A,
            obs: E.value
        }
    };
    editPromToShoppingCart(n, t, null, null, null, JSON.stringify(B), null, "felices4", "Carta"),
    alertify.success("Felices los 4 editado correctamente")
}
),
btnEnFamEdit.addEventListener("click", ()=>{
    let e = document.getElementById("enFamiliaDetails")
      , t = e.getAttribute("productId")
      , n = e.getAttribute("carritoId");
    const l = document.getElementById("cantPolloEdit")
      , a = document.getElementById("cantPavoEdit")
      , d = document.getElementById("cantChicharronEdit")
      , c = document.getElementById("cantLechonEdit")
      , o = document.querySelectorAll(".famCremasEdit")
      , r = document.getElementById("famObsEdit");
    let i = [];
    if (6 != parseInt(d.value) + parseInt(c.value) + parseInt(a.value) + parseInt(l.value))
        return Swal.fire({
            icon: "warning",
            text: "El número de sándwiches seleccionados debe ser 6",
            confirmButtonColor: "#56a75f"
        }),
        !1;
    o.forEach(e=>{
        e.checked && i.push(e.parentElement.children[2].textContent)
    }
    );
    let s = {
        chicharron: d.value,
        lechon: c.value,
        pavo: a.value,
        pollo: l.value
    };
    editPromToShoppingCart(n, t, i, null, null, JSON.stringify(s), r.value, "enFamilia", "Carta"),
    alertify.success("En Familia editado correctamente")
}
),
btnMixEdit.addEventListener("click", ()=>{
    let e = document.getElementById("mixFamiliarDetails")
      , t = e.getAttribute("productId")
      , n = e.getAttribute("carritoId");
    const l = document.querySelectorAll(".famSATipoEdit")
      , a = document.querySelectorAll(".famSACremasEdit")
      , d = document.getElementById("famSAObsEdit");
    let c = []
      , o = []
      , r = 0;
    if (a.forEach(e=>{
        e.checked && c.push(e.parentElement.children[2].textContent)
    }
    ),
    l.forEach(e=>{
        e.checked && (o.push(e.parentElement.children[2].textContent),
        r++)
    }
    ),
    r > 2)
        return Swal.fire({
            icon: "warning",
            text: "Seleccione solo dos tipos de carne",
            confirmButtonColor: "#56a75f"
        }),
        !1;
    editPromToShoppingCart(n, t, c, null, null, JSON.stringify(o), d.value, "mixFamiliar", "Carta"),
    alertify.success("Mix Familiar San Agustín editado correctamente")
}
);

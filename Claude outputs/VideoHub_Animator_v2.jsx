/**
 * ============================================================================
 *  VIDEO SKILL HUB  -  v2  -  PNG card edition
 *  Michael Adenuga / introduction video
 * ============================================================================
 *
 *  v2 CHANGE
 *  Your PNGs are complete cards (frame + panel + icon + label baked in), so
 *  this version does NOT draw cards or text. It places your artwork, draws
 *  the connector lines between the hub and each card, and animates the lot
 *  to your voice over cues.
 *
 *  FILES IT LOOKS FOR  (transparent PNG, cropped tight)
 *      hub.png            editing.png        motion.png
 *      repurposing.png    communication.png  strategy.png
 *      organization.png
 *
 *  HOW TO RUN
 *  1. Open After Effects.
 *  2. Edit > Preferences > Scripting & Expressions >
 *     tick "Allow Scripts to Write Files and Access Network".
 *  3. File > New > New Project, then save it.
 *  4. File > Scripts > Run Script File... and pick this .jsx
 *  5. Choose the folder holding your seven PNGs.
 *
 *  SIZING
 *  CARD_WIDTH and HUB_WIDTH below are the on-screen widths in pixels. Every
 *  PNG is scaled to fit, aspect preserved, whatever its source resolution.
 *
 *  RETIMING
 *  All cues live in the CUE block, in seconds. Change a number, run again.
 * ============================================================================
 */

(function videoHubAnimatorV2() {

    // =========================================================================
    // CONFIG
    // =========================================================================

    var CFG = {
        mainCompName : "VO_HUB_MAIN",
        rigCompName  : "VO_HUB_RIG",
        width        : 1920,
        height       : 1080,
        fps          : 30,
        duration     : 52,

        makeBackdrop    : true,   // dark radial background in MAIN
        drawConnectors  : true,   // gold lines between hub and cards
        addExtraGlow    : false,  // your PNGs already glow. true = push it further
        finalPushIn     : true    // slow scale up across the piece
    };

    // ---- on-screen sizes ----------------------------------------------------
    var CARD_WIDTH = 430;   // width each card PNG is scaled to
    var HUB_WIDTH  = 430;   // width the hub PNG is scaled to
    var HUB_RADIUS = 165;   // where connector lines start, measured from centre

    // ---- palette for the connectors ----------------------------------------
    var COL = {
        gold      : [1.000, 0.722, 0.000],
        goldLight : [1.000, 0.839, 0.290],
        goldDeep  : [0.788, 0.541, 0.000],
        backdrop  : [0.020, 0.020, 0.027],
        backGlow  : [0.090, 0.070, 0.020]
    };

    // ---- VO cues, in seconds ------------------------------------------------
    var CUE = {
        hubIn         : 12.60,  // just before "I specialize in..."
        editing       : 14.80,  // "turning longform content into engaging videos"
        repurposing   : 19.20,  // "Instagram, TikTok, Facebook and LinkedIn"
        motion        : 22.20,  // "Beyond editing I do motion graphics"
        strategy      : 26.50,  // "content repurposing and content strategy"
        organization  : 35.30,  // "to manage tasks"
        communication : 36.60,  // "and communicate with team members"
        orgAccent     : 38.30,  // "keep my projects well organized"
        allPulse      : 40.90,  // "always focused on making content clear"
        lockup        : 45.40,  // "if you want samples of my work"
        outro         : 49.20   // "thanks for watching"
    };

    // ---- layout -------------------------------------------------------------
    var CX = CFG.width / 2;   // 960
    var CY = 510;             // hub centre Y

    var CARDS = [
        { id: "editing",       pos: [CX,   180], cue: CUE.editing       },
        { id: "motion",        pos: [300,  480], cue: CUE.motion        },
        { id: "repurposing",   pos: [1620, 480], cue: CUE.repurposing   },
        { id: "communication", pos: [300,  890], cue: CUE.communication },
        { id: "strategy",      pos: [CX,   890], cue: CUE.strategy      },
        { id: "organization",  pos: [1620, 890], cue: CUE.organization  }
    ];

    // ---- animation feel -----------------------------------------------------
    var T = {
        connectorDraw : 0.42,
        nodePop       : 0.22,
        cardPop       : 0.58,
        hubBuild      : 1.10,
        overshoot     : 1.12
    };


    // =========================================================================
    // HELPERS
    // =========================================================================

    function ease(prop, inPct, outPct) {
        if (prop.numKeys < 2) return;
        var dim = (prop.value instanceof Array) ? prop.value.length : 1;
        for (var k = 1; k <= prop.numKeys; k++) {
            var ei = [], eo = [];
            for (var d = 0; d < dim; d++) {
                ei.push(new KeyframeEase(0, inPct));
                eo.push(new KeyframeEase(0, outPct));
            }
            try { prop.setTemporalEaseAtKey(k, ei, eo); } catch (e) {}
        }
    }

    function keys(prop, pairs, inPct, outPct) {
        for (var i = 0; i < pairs.length; i++) {
            prop.setValueAtTime(pairs[i][0], pairs[i][1]);
        }
        ease(prop, inPct === undefined ? 75 : inPct, outPct === undefined ? 75 : outPct);
    }

    function tf(layer, name) {
        return layer.property("ADBE Transform Group").property(name);
    }

    function addGlow(layer, radius, intensity, threshold) {
        try {
            var g = layer.property("ADBE Effect Parade").addProperty("ADBE Glo2");
            g.property("ADBE Glo2-0002").setValue(threshold === undefined ? 0.45 : threshold);
            g.property("ADBE Glo2-0003").setValue(radius === undefined ? 40 : radius);
            g.property("ADBE Glo2-0004").setValue(intensity === undefined ? 1.1 : intensity);
            return g;
        } catch (e) { return null; }
    }

    function ambientFloat(layer, phase, ampX, ampY, speed) {
        var e =
            "var t = time * " + (speed || 0.5).toFixed(3) + " + " + phase.toFixed(3) + ";\n" +
            "value + [Math.sin(t) * " + (ampX || 4) + ", Math.cos(t * 0.83) * " + (ampY || 6) + "];";
        try { tf(layer, "ADBE Position").expression = e; } catch (err) {}
    }

    // point on the hub circle aimed at a target
    function hubEdge(target) {
        var dx = target[0] - CX, dy = target[1] - CY;
        var L = Math.sqrt(dx * dx + dy * dy);
        return [CX + dx / L * HUB_RADIUS, CY + dy / L * HUB_RADIUS];
    }

    // point on a card's rectangular edge aimed back at the hub
    function cardEdge(pos, halfW, halfH) {
        var dx = pos[0] - CX, dy = pos[1] - CY;
        var sx = (dx !== 0) ? halfW / Math.abs(dx) : 1e9;
        var sy = (dy !== 0) ? halfH / Math.abs(dy) : 1e9;
        var s = Math.min(sx, sy);
        return [pos[0] - dx * s, pos[1] - dy * s];
    }


    // =========================================================================
    // SHAPE BUILDERS  (connectors only)
    // =========================================================================

    function newShapeLayer(comp, name, position) {
        var L = comp.layers.addShape();
        L.name = name;
        tf(L, "ADBE Anchor Point").setValue([0, 0]);
        tf(L, "ADBE Position").setValue(position);
        return L;
    }

    function addLinePath(layer, ptA, ptB, strokeCol, strokeW) {
        var root = layer.property("ADBE Root Vectors Group");
        var grp  = root.addProperty("ADBE Vector Group");
        grp.name = "connector";
        var gc   = grp.property("ADBE Vectors Group");

        var pathGrp = gc.addProperty("ADBE Vector Shape - Group");
        var s = new Shape();
        s.vertices    = [ptA, ptB];
        s.inTangents  = [[0, 0], [0, 0]];
        s.outTangents = [[0, 0], [0, 0]];
        s.closed = false;
        pathGrp.property("ADBE Vector Shape").setValue(s);

        var st = gc.addProperty("ADBE Vector Graphic - Stroke");
        st.property("ADBE Vector Stroke Color").setValue(strokeCol);
        st.property("ADBE Vector Stroke Width").setValue(strokeW || 12);
        st.property("ADBE Vector Stroke Line Cap").setValue(2);

        var trim = gc.addProperty("ADBE Vector Filter - Trim");
        trim.name = "Draw";

        return { trim: trim, stroke: st.property("ADBE Vector Stroke Width") };
    }

    function addDot(comp, name, position, diameter) {
        var L = newShapeLayer(comp, name, position);
        var root = L.property("ADBE Root Vectors Group");
        var grp = root.addProperty("ADBE Vector Group");
        grp.name = "dot";
        var gc = grp.property("ADBE Vectors Group");
        var el = gc.addProperty("ADBE Vector Shape - Ellipse");
        el.property("ADBE Vector Ellipse Size").setValue([diameter, diameter]);
        var st = gc.addProperty("ADBE Vector Graphic - Stroke");
        st.property("ADBE Vector Stroke Color").setValue(COL.goldDeep);
        st.property("ADBE Vector Stroke Width").setValue(4);
        var fl = gc.addProperty("ADBE Vector Graphic - Fill");
        fl.property("ADBE Vector Fill Color").setValue(COL.goldLight);
        addGlow(L, 28, 0.9, 0.4);
        return L;
    }


    // =========================================================================
    // RUN
    // =========================================================================

    app.beginUndoGroup("Build Video Hub Animation v2");

    var proj = app.project;
    if (!proj) { alert("Open or create a project first."); return; }

    var folder = Folder.selectDialog(
        "Select the folder containing your seven card PNGs:\n\n" +
        "hub.png, editing.png, motion.png, repurposing.png,\n" +
        "communication.png, strategy.png, organization.png"
    );
    if (!folder) { alert("Cancelled. Nothing was built."); return; }

    // ---- import -------------------------------------------------------------
    var missing = [];

    function grab(id) {
        var f = new File(folder.fsName + "/" + id + ".png");
        if (!f.exists) { missing.push(id + ".png"); return null; }
        try { return proj.importFile(new ImportOptions(f)); }
        catch (e) { missing.push(id + ".png (import failed)"); return null; }
    }

    var hubSrc = grab("hub");
    for (var i = 0; i < CARDS.length; i++) CARDS[i].src = grab(CARDS[i].id);

    if (!hubSrc && missing.length === 7) {
        alert("None of the PNGs were found in:\n" + folder.fsName +
              "\n\nCheck the file names are all lowercase and end in .png");
        app.endUndoGroup();
        return;
    }

    // ---- comps --------------------------------------------------------------
    var rig  = proj.items.addComp(CFG.rigCompName,  CFG.width, CFG.height, 1, CFG.duration, CFG.fps);
    var main = proj.items.addComp(CFG.mainCompName, CFG.width, CFG.height, 1, CFG.duration, CFG.fps);

    // =========================================================================
    // 1. CONNECTORS  (added first so they render behind the artwork)
    // =========================================================================

    var wires = [];

    if (CFG.drawConnectors) {
        for (var c = 0; c < CARDS.length; c++) {
            var cd = CARDS[c];
            if (!cd.src) continue;

            var scale  = CARD_WIDTH / cd.src.width;
            var halfW  = (cd.src.width  * scale) / 2 * 0.86;   // inset past the PNG's shadow padding
            var halfH  = (cd.src.height * scale) / 2 * 0.86;

            var a = hubEdge(cd.pos);
            var b = cardEdge(cd.pos, halfW, halfH);

            var wireLayer = newShapeLayer(rig, "WIRE_" + cd.id.toUpperCase(), [0, 0]);
            var wire = addLinePath(wireLayer, a, b, COL.gold, 13);
            addGlow(wireLayer, 26, 0.8, 0.5);

            var dotA = addDot(rig, "NODE_HUB_"  + cd.id.toUpperCase(), a, 32);
            var dotB = addDot(rig, "NODE_CARD_" + cd.id.toUpperCase(), b, 32);

            wires.push({ data: cd, layer: wireLayer, trim: wire.trim,
                         strokeW: wire.stroke, dotA: dotA, dotB: dotB });
        }
    }

    // =========================================================================
    // 2. CARDS
    // =========================================================================

    var cardLayers = [];

    for (var j = 0; j < CARDS.length; j++) {
        var d = CARDS[j];
        if (!d.src) continue;

        var L = rig.layers.add(d.src);
        L.name = "CARD_" + d.id.toUpperCase();

        var sc = CARD_WIDTH / d.src.width * 100;
        tf(L, "ADBE Anchor Point").setValue([d.src.width / 2, d.src.height / 2]);
        tf(L, "ADBE Position").setValue(d.pos);
        tf(L, "ADBE Scale").setValue([sc, sc]);

        if (CFG.addExtraGlow) addGlow(L, 30, 0.6, 0.6);

        cardLayers.push({ data: d, layer: L, baseScale: sc });
    }

    // =========================================================================
    // 3. HUB
    // =========================================================================

    var hubLayer = null, hubBaseScale = 100;

    if (hubSrc) {
        hubLayer = rig.layers.add(hubSrc);
        hubLayer.name = "HUB";
        hubBaseScale = HUB_WIDTH / hubSrc.width * 100;
        tf(hubLayer, "ADBE Anchor Point").setValue([hubSrc.width / 2, hubSrc.height / 2]);
        tf(hubLayer, "ADBE Position").setValue([CX, CY]);
        tf(hubLayer, "ADBE Scale").setValue([hubBaseScale, hubBaseScale]);
        hubLayer.moveToBeginning();
        if (CFG.addExtraGlow) addGlow(hubLayer, 45, 0.8, 0.55);
    }


    // =========================================================================
    // 4. ANIMATION
    // =========================================================================

    // ---- hub ----------------------------------------------------------------
    if (hubLayer) {
        var t0 = CUE.hubIn;
        var hs = tf(hubLayer, "ADBE Scale");
        keys(hs, [
            [t0,                     [0, 0]],
            [t0 + T.hubBuild * 0.60, [hubBaseScale * T.overshoot, hubBaseScale * T.overshoot]],
            [t0 + T.hubBuild * 0.82, [hubBaseScale * 0.96,        hubBaseScale * 0.96]],
            [t0 + T.hubBuild,        [hubBaseScale,               hubBaseScale]]
        ], 80, 55);

        keys(tf(hubLayer, "ADBE Opacity"), [[t0, 0], [t0 + 0.22, 100]]);

        keys(tf(hubLayer, "ADBE Rotation"), [
            [t0,              -12],
            [t0 + T.hubBuild,   0]
        ], 80, 55);

        // slow breathing once it has landed
        hs.expression =
            "var s = value;\n" +
            "var settle = " + (t0 + T.hubBuild).toFixed(2) + ";\n" +
            "if (time > settle) {\n" +
            "  var p = 1 + Math.sin((time - settle) * 1.5) * 0.012;\n" +
            "  s = [s[0] * p, s[1] * p];\n" +
            "}\n" +
            "s;";
    }

    // ---- connectors ---------------------------------------------------------
    for (var w = 0; w < wires.length; w++) {
        (function (wr, idx) {
            var t  = wr.data.cue;
            var tb = t + T.connectorDraw;

            wr.trim.property("ADBE Vector Trim Start").setValue(0);
            keys(wr.trim.property("ADBE Vector Trim End"), [[t, 0], [tb, 100]], 70, 85);
            keys(tf(wr.layer, "ADBE Opacity"), [[t - 0.02, 0], [t + 0.06, 100]]);

            keys(tf(wr.dotA, "ADBE Scale"), [
                [t,                    [0, 0]],
                [t + T.nodePop * 0.6,  [145, 145]],
                [t + T.nodePop,        [100, 100]]
            ], 80, 55);

            keys(tf(wr.dotB, "ADBE Scale"), [
                [tb,                   [0, 0]],
                [tb + T.nodePop * 0.6, [145, 145]],
                [tb + T.nodePop,       [100, 100]]
            ], 80, 55);

            // energy pulse along the wire, forever after it draws
            wr.strokeW.expression =
                "var base = value;\n" +
                "var start = " + tb.toFixed(2) + ";\n" +
                "var out = base;\n" +
                "if (time >= start) {\n" +
                "  var p = Math.sin((time - start) * 3.0 + " + (idx * 1.1).toFixed(2) + ");\n" +
                "  out = base * (1 + p * 0.20);\n" +
                "}\n" +
                "out;";
        })(wires[w], w);
    }

    // ---- cards --------------------------------------------------------------
    for (var m = 0; m < cardLayers.length; m++) {
        (function (cl, idx) {
            var bs = cl.baseScale;
            var t  = cl.data.cue + (CFG.drawConnectors ? T.connectorDraw + 0.06 : 0.10);

            keys(tf(cl.layer, "ADBE Scale"), [
                [t,                    [0, 0]],
                [t + T.cardPop * 0.55, [bs * T.overshoot, bs * T.overshoot]],
                [t + T.cardPop * 0.78, [bs * 0.96,        bs * 0.96]],
                [t + T.cardPop,        [bs,               bs]]
            ], 80, 55);

            keys(tf(cl.layer, "ADBE Opacity"), [[t, 0], [t + 0.18, 100]]);

            var dir = (cl.data.pos[0] < CX) ? -1 : (cl.data.pos[0] > CX ? 1 : 0);
            keys(tf(cl.layer, "ADBE Rotation"), [
                [t,             dir * 8],
                [t + T.cardPop, 0]
            ], 80, 55);

            ambientFloat(cl.layer, idx * 1.3, 4, 6, 0.5);
        })(cardLayers[m], m);
    }

    // ---- single card accent -------------------------------------------------
    for (var o = 0; o < cardLayers.length; o++) {
        if (cardLayers[o].data.id !== "organization") continue;
        var oc = cardLayers[o];
        var os = tf(oc.layer, "ADBE Scale");
        os.setValueAtTime(CUE.orgAccent,        [oc.baseScale, oc.baseScale]);
        os.setValueAtTime(CUE.orgAccent + 0.16, [oc.baseScale * 1.09, oc.baseScale * 1.09]);
        os.setValueAtTime(CUE.orgAccent + 0.52, [oc.baseScale, oc.baseScale]);
        ease(os, 75, 75);
    }

    // ---- whole system pulse -------------------------------------------------
    for (var p = 0; p < cardLayers.length; p++) {
        var pc = cardLayers[p];
        var ps = tf(pc.layer, "ADBE Scale");
        var stag = CUE.allPulse + p * 0.055;
        ps.setValueAtTime(stag,        [pc.baseScale, pc.baseScale]);
        ps.setValueAtTime(stag + 0.16, [pc.baseScale * 1.07, pc.baseScale * 1.07]);
        ps.setValueAtTime(stag + 0.46, [pc.baseScale, pc.baseScale]);
        ease(ps, 75, 75);
    }


    // =========================================================================
    // 5. MAIN COMP
    // =========================================================================

    if (CFG.makeBackdrop) {
        var bg = main.layers.addSolid(COL.backdrop, "BACKDROP", CFG.width, CFG.height, 1);
        try {
            var ramp = bg.property("ADBE Effect Parade").addProperty("ADBE Ramp");
            ramp.property("ADBE Ramp-0001").setValue([CX, CY]);
            ramp.property("ADBE Ramp-0002").setValue(COL.backGlow);
            ramp.property("ADBE Ramp-0003").setValue([CX, CFG.height]);
            ramp.property("ADBE Ramp-0004").setValue(COL.backdrop);
            ramp.property("ADBE Ramp-0005").setValue(2); // radial
        } catch (e) {}
    }

    var rigLayer = main.layers.add(rig);
    rigLayer.name = "HUB_RIG";
    rigLayer.moveToBeginning();

    if (CFG.finalPushIn) {
        keys(tf(rigLayer, "ADBE Scale"), [
            [CUE.hubIn, [100, 100]],
            [CUE.outro, [107, 107]]
        ], 40, 40);
    }

    keys(tf(rigLayer, "ADBE Opacity"), [
        [CUE.outro,        100],
        [CUE.outro + 1.60, 0]
    ], 60, 60);

    main.openInViewer();
    app.endUndoGroup();

    alert(
        "Video hub built.\n\n" +
        "Comps:\n" +
        "   " + CFG.mainCompName + "   (render this)\n" +
        "   " + CFG.rigCompName  + "   (the graphic and all keyframes)\n\n" +
        (missing.length
            ? "NOT FOUND:\n   " + missing.join("\n   ") +
              "\n\nCheck spelling, all lowercase, .png extension."
            : "All seven PNGs loaded.") +
        "\n\nSizing: change CARD_WIDTH / HUB_WIDTH near the top.\n" +
        "Timing: change the CUE block. Then run the script again."
    );

})();

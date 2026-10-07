/**
 * @file calculations.js
 * @description Calculates the stitch and row counts, generates a full 
 * knitting pattern for toe-up socks with a heel flap and gusset based 
 * on user-provided measurements and gauge.
 * @author Dana Sherwood
 * @version 1.0.0
 */


/**
 * Calculates the total number of sock stitches using the gauge and
 * measured foot circumference. 
 * 
 * @param {number} gauge - number of stitches in 1 inch.
 * @param {number} footCircumference - measured circumference of the foot
 * in inches
 * @returns {number} calculated total number of sock stitches
*/
function calculateTotalStitches(gauge,footCircumference) {
    // Final sock circumference should be 0.9 times the measured foot
    // circumference for negative ease
    const stitches = gauge * footCircumference * 0.9;

    // Round the number of stitches to the nearest even number
    const totalStitches = Math.round(stitches / 2) * 2;
    return totalStitches;
}


/**
 * Calculates the number of stitches to cast on based on the total
 * number of sock stitches.
 * 
 * @param {number} totalStitches - number of sock stitches (circumference)
 * @returns {number} number of stitches to cast on
 */
function calculateCastOn(totalStitches) {
    const c = totalStitches / 3; // theoretical cast on stitches

    // make sure that the cast on is even and that the difference
    // between total and cast on stitches is divisible by 4
    let castOn = Math.round(c / 2) * 2;
    let difference =  totalStitches - castOn;

    if (difference % 4 === 0) {
        return castOn;
    }
    else {
        // round to the nearest value such that the difference is
        // divisible by 4
        difference = Math.round((totalStitches - c) / 4) * 4;
        castOn = totalStitches - difference;
        return castOn;
    }
}


/**
 * Calculates the number of gusset stitches per side based on the total
 * number of sock stitches.
 * 
 * @param {number} totalStitches - number of sock stitches (circumference)
 * @returns {number} number of gusset stitches per side
 */
function calculateGussetStitches(totalStitches) {
    const gussetStitches = Math.round(0.25 * totalStitches / 2) * 2;

    return gussetStitches;
}


/**
 * Calculates the number of stitches in the heel based on the total
 * number of sock stitches.
 * 
 * @param {number} totalStitches - number of sock stitches (circumference)
 * @returns {number} number of heel stitches
 */
function calculateHeelStitches(totalStitches) {
    const heelStitches = totalStitches / 2; // just stitches on needle 2

    return heelStitches;
}


/**
 * Calculates thge number of heel base stitches based on the number of
 * heel stitches.
 * 
 * @param {number} heelStitches - number of heel stitches
 * @returns {number} number of heel base stitches
 */
function calculateHeelBaseStitches(heelStitches) {
   const h = Math.round(heelStitches / 2); 

   // h and heelStitches must both be even or both be odd
   if (heelStitches % 2 === 0) {
    // heel stitches are even
    if (h % 2 === 0) {
        // both are even
        return h;
    }
    else {
        // h is odd, round to nearest even number
        const heelBase = Math.round(h / 2) * 2;
        return heelBase;
    }
   }
   else {
    // heel stitches are odd
    if (h % 2 !== 0) {
        // both are odd
        return h;
    }
    else {
        // h is even, round to nearest odd number
        const heelBase = Math.round(h / 2) * 2 + 1;
        return heelBase;
    }
   }
}


/**
 * Calculates the length of the gusset and heel turn sections in
 * inches. 
 * 
 * @param {number} gussetStitches - number of stitches in one side of the
 * gusset
 * @param {number} heelStitches - number of stitches in the heel
 * @param {number} heelBaseStitches - number of stitches in the heel base
 * @param {number} rowGauge - number of rows in 1 inch
 * @returns {number} length of gusset and heel in inches
 */
function calculateGussetLength(gussetStitches,heelStitches,heelBaseStitches,rowGauge) {
    // length is the number of increase rows for the gusset added to
    // number of rows in the heel turn, divided by row gauge
    const gussetLength = ((gussetStitches * 2) + (heelStitches - heelBaseStitches)) / rowGauge;

    return gussetLength;
}


/**
 * Calculates the number of rows worked in the toe.
 * 
 * @param {number} totalStitches - number of sock stitches (circumference)
 * @param {number} castOn - number of cast on stithes
 * @returns {number} - number of rows worked in the toe section
 */
function calculateToeRows(totalStitches,castOn) {
    const toeRows = (totalStitches - castOn) / 2;

    return toeRows;
}


/**
 * Writes the pattern for the toe section and returns it as a string.
 * 
 * @param {number} footCircumference - measured circumference of the foot in inches
 * @param {number} stitchGauge - number of stitches in 1 inch
 * @param {number} castOn - number of cast on stitches
 * @returns {string} - pattern for the toe section
 */
function toePattern(footCircumference,stitchGauge,castOn) {
    const totalStitches = calculateTotalStitches(stitchGauge,footCircumference);
    const stitchesPerNeedle = castOn / 2;
    const toeRows = calculateToeRows(totalStitches,castOn);

    const pattern = `<h2>Toe</h2>
<p>Using Judy's Magic Cast-On method, cast on ${castOn} sts such that ${stitchesPerNeedle} are on each needle.<br>
k 1 round even.</p>

<p>Round 1: *kfb, k to 2 sts before the end of the needle, kfb, k1* 2 times total (once per needle).<br>
Round 2: k even.

<p>Repeat Rounds 1 and 2 until there are ${totalStitches} sts in total (${totalStitches / 2} per needle.) ${toeRows} rows worked.</p>`;

    return pattern;
}


/**
 * Writes the pattern for the foot section and returns it as a string.
 * 
 * @param {number} totalStitches - number of sock stitches (circumference)
 * @param {number} footLength - measured length of the foot in inches
 * @param {number} castOn - number of cast on stitches
 * @param {number} rowGauge - number of rows in 1 inch
 * @returns {string} - pattern for the foot section
 */
function footPattern(totalStitches,footLength,castOn,rowGauge) {
    const heelStitches = calculateHeelStitches(totalStitches);
    const heelBaseStitches = calculateHeelBaseStitches(heelStitches);
    const gussetStitches = calculateGussetStitches(totalStitches);
    const gussetLength = calculateGussetLength(gussetStitches,heelStitches,heelBaseStitches,rowGauge);

    const knitFootLength = footLength - gussetLength - 0.25;
    const toeRows = calculateToeRows(totalStitches,castOn);
    const footRows = Math.round(knitFootLength * rowGauge) - toeRows;
    console.log(knitFootLength,gussetLength)

    const pattern = `<h2>Foot</h2>
<p>Work in even rounds until sock measures ${Math.round(knitFootLength * 100) / 100} inches from the cast-on. Approximately ${footRows} rows worked after toe section.</p>
`;

    return pattern;
}


/**
 * Writes the pattern for the gusset section and returns it as a string.
 * 
 * @param {number} totalStitches - number of sock stitches (circumference)
 * @returns {string} - pattern for the gusset section
 */
function gussetPattern(totalStitches) {
    const gussetStitches = calculateGussetStitches(totalStitches);
    const needle1 = totalStitches / 2;
    const needle2 = needle1 + (gussetStitches * 2);
    const pattern = `<h2>Gusset</h2>
<h3>Set-Up Rounds</h3>
<p>k instep sts (${needle1} sts on needle 1). k1, pm, m1r, k to 1 st before the end of needle 2, m1l, pm, k1 (${needle1 + 2} sts on needle 2).<br>
k even.</p>

<p>Round 1: k instep sts. k1, m1r, k to marker, sm, k to marker, sm, k to 1 st before the end of the needle, m1l, k1.</p>
<p>Round 2: k even.</p>

<p>Repeat Rounds 1 and 2 a total of ${gussetStitches - 1} times. There are now ${needle1} sts on needle 1 and ${needle2} sts on needle 2, with ${gussetStitches} sts on either side of the center ${needle1} sts.</p>
`;
    return pattern;
}


/**
 * Writes the pattern for the heel turn and returns it as a string.
 * 
 * @param {number} totalStitches - number of sock stitches (circumference)
 * @returns {string} - pattern for the heel turn section
 */
function heelTurnPattern(totalStitches) {
    const heelStitches = calculateHeelStitches(totalStitches);
    const heelBaseStitches = calculateHeelBaseStitches(heelStitches);
    const heelRows = heelStitches - heelBaseStitches;
    const rowRepeats = (heelRows / 2) - 1;

    const pattern = `<h2>Heel Turn</h2>
<p>Set-Up: k instep sts (to the end of needle 1). k to marker, sm.</p>

<p>The heel turn is now worked back and forth across the ${heelStitches} sts between the markers on needle 2.</p>

<p>Row 1: (RS) k to 1 st before the second marker, wrap the next st, turn work.<br>
Row 2: (WS) p to 1 st before the marker, wrap the next st, turn work.<br>
Row 3: (RS) k to 1 st before the last wrapped st, wrap the next st, turn work.<br>
Row 4: (WS) p to 1 st before the last wrapped st, wrap the next st, turn work.</p>

<p>Repeat Rows 3 and 4 a total of ${rowRepeats} times. Ending on a WS row. ${heelBaseStitches} sts now remain unwrapped in the center of the heel sts.</p>

<p>(RS) k to first wrapped st, lift and k all wrapped sts but the last wrapped st. Work the final wrapped st and first following st together as ssk. Turn work. <br>
(WS) s1 wyif, p to first wrapped st, lift and p all wrapped sts but the last wrapped st. Work the final wrapped st and first following st together as p2tog. Turn work.</p>
`;

    return pattern; 
}


/**
 * Writes the pattern for the heel flap section and returns it as a string.
 *
 * @param {number} totalStitches - total number of sock stitches (circumference)
 * @returns {string} - pattern for the heel flap section
 */
function heelFlapPattern(totalStitches) {
    const heelStitches = calculateHeelStitches(totalStitches);
    const needle2 = totalStitches / 2 + 2;

    const pattern = `
<h2>Heel Flap</h3>
<p>The heel flap is worked back and forth across the remaining ${heelStitches} heel sts.</p>

<p>Row 1: (RS) s1, [k1,s1] to 1 st before the gusset sts, ssk, turn work.<br>
Row 2: (WS) s1 wyif, p to 1 st before the gusset sts, p2tog, turn work.</p>

<p>Repeat Rows 1 and 2 until 1 st remains in each side of the gusset ending on a WS row. There should be ${needle2} sts remaining on needle 2.</p>
`;

    return pattern;
}


/**
 * Writes the pattern for the leg section and returns it as a string.
 *
 * @param {number} footLength - measured length of the foot
 * @param {number} rowGauge - number of rows in 1 inch
 * @returns {string} - pattern for the leg section
 */
function legPattern(footLength, rowGauge) {
    const legLength = footLength - 2.25;
    const legRows = Math.round(legLength * rowGauge);

    const pattern = `
<h2>Leg</h2>
<p>Return to working in the round.</p>

<p>[s1,k1] across the heel flap to 1 st before the gusset st, ssk. (needle 2)<br>
k instep sts (needle 1). k2tog, k to the end of the round (needle 2).</p>

<p>Continue in stockinette until leg measures ${legLength} inches, approximately ${legRows} rows, or until 2 inches less than the desired length.<p>
`;

    return pattern;
}


/**
 * Writes the pattern for the cuff section and returns it as a string.
 *
 * @param {number} totalStitches - total stitches in the sock
 * @param {number} rowGauge - number of rows in 1 inch
 * @returns {string} - pattern for the cuff section
 */
function cuffPattern(totalStitches, rowGauge) {
    const cuffRows = Math.round(rowGauge * 2);

    let pattern = `<h2>Cuff</h2>`;

    // if the total number of stitches is a multiple of 4, do cuff in k2p2
    // otherwise, cuff is k1p1
    if (totalStitches % 4 === 0) {
        pattern += `<p>*k2,p2* repeat until cuff measures 2 inches, approximately ${cuffRows} rows, or until desired length.</p>`;
    } else {
        pattern += `<p>*k1,p1* repeat until cuff measures 2 inches, approximately ${cuffRows} rows, or until desired length.</p>`;
    }
    pattern += `<p>Bind off using a stretchy bind off.`;
    return pattern;
}


/**
 * Generates the complete sock pattern.
 * 
 * @param {number} footCircumference - measured circumference of the foot in inches
 * @param {number} footLength - measured length of the foot in inches
 * @param {number} stitchGauge - number of stitches in 1 inch
 * @param {number} rowGauge - number of rows in 1 inch
 * @returns {string} the sock pattern
 */
function generateSockPattern(footCircumference,footLength,stitchGauge,rowGauge) {
    const totalStitches = calculateTotalStitches(stitchGauge,footCircumference);
    const castOn = calculateCastOn(totalStitches);

    let pattern = "";
    pattern += toePattern(footCircumference,stitchGauge,castOn);
    pattern += footPattern(totalStitches,footLength,castOn,rowGauge);
    pattern += gussetPattern(totalStitches);
    pattern += heelTurnPattern(totalStitches); 
    pattern += heelFlapPattern(totalStitches);
    pattern += legPattern(footLength, rowGauge);
    pattern += cuffPattern(totalStitches,rowGauge);

    return pattern;
}


function run() {
    const footCircumference = parseFloat(document.getElementById("footCircumference").value);
    const footLength = parseFloat(document.getElementById("footLength").value);
    const stitchGauge = parseFloat(document.getElementById("gaugeSts").value);
    const rowGauge = parseFloat(document.getElementById("gaugeRows").value);

    const errorBox = document.getElementById("error");
    const output = document.getElementById("output");
    const actions = document.getElementById("actions");

    const values = [footCircumference, footLength, stitchGauge, rowGauge];
    if (values.some(v => v <= 0)) {
        errorBox.textContent = "Please positive values in every field.";
        return;
    }

    errorBox.textContent = "";
    output.innerHTML = generateSockPattern(footCircumference, footLength, stitchGauge, rowGauge);
    actions.hidden = false;
}

function copyPattern() {
    const text = document.getElementById("output").innerText;
    const button = document.getElementById("copyBtn");

    navigator.clipboard.writeText(text).then(() => {
        button.textContent = "Copied!";
        setTimeout(() => { button.textContent = "Copy"; }, 1500);
    });
}
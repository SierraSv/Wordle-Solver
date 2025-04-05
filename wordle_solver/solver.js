function positionMap(pos1, pos2, pos3, pos4, pos5) {this.pos1 = pos1, this.pos2 = pos2, this.pos3 = pos3, this.pos3 = pos3, this.pos4 = pos4, this.pos5 = pos5}

function wordObject(positions, word, numRemaining, nextSuggestion, suggestionScore) {this.positions = positions, this.word = word, this.numRemaining = numRemaining, this.nextSuggestion = nextSuggestion, this.suggestionScore = suggestionScore}

function wordScore(word, score) {this.word = word, this.score = score}

function changeNumFields(numEle){
    let num = document.getElementById(numEle).value
    let parent = document.getElementById("wordFields")
    let numChildren = parent.childElementCount
    //resetWordFields()
    if (num > numChildren){
        for(let i = numChildren; i < num; i++){
            let div_item = createDiv(i+1)
            let text_item = createText(i+1)
            let para_item = createOutput(i+1)
            div_item.appendChild(text_item)
            div_item.appendChild(para_item)
            parent.appendChild(div_item)
            /** 
             * var list_item = document.createElement('li');
                list_item.appendChild(document.createTextNode(word))
                list.appendChild(list_item)
            * **/
        }
        document.getElementById("runButton").disabled = true
    }
    else{
        let goal = numChildren - num
        for (let i = 0; i < goal; i++){
            let child = parent.lastChild
            parent.removeChild(child)
        }
    }
}

function createDiv(num){
    var div_item = document.createElement('div')
    let div_name = "divField" + num.toString()
    div_item.setAttribute("id", div_name)
    return div_item
}

function createText(num){
    var text_item = document.createElement('input')
    text_item.setAttribute("type", "text")
    text_item.setAttribute("placeholder", "word")
    text_item.setAttribute("size", 20)
    let text_item_name = "wordField" + num.toString()
    text_item.setAttribute("id", text_item_name)
    //text_item.setAttribute("oninput", "checkWord(text_item.value, num)")
    return text_item
}

function createOutput(num){
    var para_item = document.createElement('p')
    let para_name = "paraField" + num.toString()
    para_item.setAttribute("id", para_name)
    para_item.innerHTML = "I don't recognize that word"
    return para_item
}

function resetWordFields(){
    // for (let i = 1; i <= document.getElementById("numberChooser").value; i++){
    //     let div = document.getElementById("divField" + i)
    //     while(div.firstChild){
    //         div.removeChild(div.firstChild)
    //     }
    // }
    // while (fields.firstChild) {
    //     fields.removeChild(fields.firstChild)
    // }
    for (let i = 1; i <= document.getElementById("numberChooser").value; i++){
        let div = document.getElementById("divField" + i)
        //console.log(div.childElementCount)
        if(div.childElementCount > 2){
            div.removeChild(div.lastChild)
        }
        //console.log(div.childElementCount)
    }
}

function checkWord(word, fields=false){
    if (fields){
        let goodToGo = true
        let div = document.getElementById("wordFields")
        //for (let div of document.getElementsByClassName("wordFields")){
        for (let i = 1; i <= div.childElementCount; i++){
            let fieldWord = document.getElementById("wordField" + i).value
            if (checkWord(fieldWord)){
                document.getElementById("paraField" + i).innerHTML = ""
            }
            else{
                document.getElementById("paraField" + i).innerHTML = "I don't recognize that word"
                goodToGo = false
            }
        }
        if (goodToGo){
            document.getElementById("runButton").disabled = false
        }
        else{
            document.getElementById("runButton").disabled = true
        }
    }
    else{
        if (word_list.indexOf(word) == -1){
            return false
        }
        return true
    }
}

function runSolver(){
    resetWordFields()
    let fieldArray = []
    let doneArray = []
    //let gap = 30
    //document.getElementById("wordFields").style.rowGap = gap
    for (let i = 1; i <= document.getElementById("numberChooser").value; i++){
        let word = document.getElementById("wordField" + i).value
        fieldArray.push(new wordObject(new positionMap(new Map([["possible", new Set()],["impossible", new Set()]]), new Map([["possible", new Set()],["impossible", new Set()]]), new Map([["possible", new Set()],["impossible", new Set()]]), new Map([["possible", new Set()],["impossible", new Set()]]), new Map([["possible", new Set()],["impossible", new Set()]])), word, 2315, "alert"))
        updatePositions(fieldArray[i-1], "alert")
        document.getElementById("paraField" + i).innerHTML = "Here are my guesses:"
        var list = document.createElement('ol')
        list.setAttribute("id", "listField" + i)
        let div = document.getElementById("divField" + i)
        //div.style.rowGap = gap
        div.appendChild(list)
        var list_item = document.createElement('li')
        list_item.appendChild(document.createTextNode("alert"))
        document.getElementById("listField" + i).appendChild(list_item)
    }
    console.log(fieldArray)
    let remainingGuesses = 19
    let toUpdateIndex = 0
    while ((remainingGuesses > 0) && (doneArray.length < fieldArray.length)){
        let smallestRemaining = 2315
        let ind = 0
        for (let fieldObject of fieldArray){
            if ((fieldObject.numRemaining < smallestRemaining) && (doneArray.indexOf(fieldObject) == -1)){
                console.log(fieldObject.word, "has", fieldObject.numRemaining, "remaining, which is less than", smallestRemaining)
                smallestRemaining = fieldObject.numRemaining
                toUpdateIndex = ind
            }
            ind++
            // console.log(i)
            // var list_item = document.createElement('li')
            // list_item.appendChild(document.createTextNode(remainingGuesses.toString()))
            // document.getElementById("listField" + i).appendChild(list_item)
        }
        let bestWord = new wordScore("alert", -1)
        for (let fieldObject of fieldArray){
            if ((fieldObject.numRemaining == smallestRemaining)  && (doneArray.indexOf(fieldObject) == -1)){
                //let suggestion = suggestWord(word_list)
                //console.log(suggestion, typeof suggestion[0], suggestion[1])
                // knownChars = new Set([])
                // nullLetters = new Set()
                // let tempPosMap = new wordObject(new Map([fieldObject.positions.pos1, fieldObject.positions.pos2, fieldObject.positions.pos3,fieldObject.positions.pos4, fieldObject.positions.pos5]), fieldObject.nextSuggestion, 2315, 0)
                // updatePositions(tempPosMap, fieldObject.nextSuggestion)
                if (fieldObject.suggestionScore > bestWord.score){
                    bestWord.word = fieldObject.nextSuggestion
                    bestWord.score = fieldObject.suggestionScore
                }
            }
        }
        if (doneArray.length > 0){
            console.log("Here's what's done:", doneArray)
        }
        console.log("I'm going to guess", bestWord.word)
        let i = 1
        for (let fieldObject of fieldArray){
            if (doneArray.indexOf(fieldObject) == -1){
                updatePositions(fieldObject, bestWord.word)
                var list_item = document.createElement('li')
                list_item.appendChild(document.createTextNode(bestWord.word))
                document.getElementById("listField" + i).appendChild(list_item)
                if (bestWord.word == fieldObject.word){
                    doneArray.push(fieldObject)
                }
            }
            i++
        }
        remainingGuesses--
    }
}

function updatePositions(positionMapObject, word){
    //Confirmed letter repeated bug
    let positions = positionMapObject.positions
    let goalWord = positionMapObject.word
    //let knownChars = ""
    //console.log("updatePositions word:", word)
    for (let i = 0; i < 5; i++){
        // const clue = "clue" + i
        // const radio = document.getElementsByName(clue)
        // const confirmed = document.getElementById("confirmed" + i)
        // const wrongSpot = document.getElementById("wrongSpot" + i)
        const letter = word[i].toLowerCase()
        //console.log(i, confirmed.checked, wrongSpot.checked)
        //turns green
        if (goalWord[i] == word[i]){
            positions["pos" + (i+1)] = letter
            for (let position in positions){
                if (typeof positions[position] != "string"){
                    //console.log("typeOf get", typeof (positions[position]))
                    if (!(positions[position].get("possible").has(letter)) && !(positions[position].get("impossible").has(letter)) && (position != positions["pos" + (i+1)])){
                        positions[position].get("possible").add(letter)
                    }
                }
            }
            //if (knownChars.indexOf(letter) == -1){
            // if (countChar(word.toUpperCase(), letter) > countChar(knownChars, letter)){
            //     knownChars += letter
            // }
            //console.log("Adding", letter, "to knownChars for", goalWord, "because it turned green")
            //knownChars += letter
        }
        //turns yellow
        else if ((goalWord.indexOf(letter) != -1) && (countChar(word.slice(0, i+1), letter) <= countChar(goalWord, letter))){
            for (let position in positions){
                if (typeof positions[position] != "string"){
                    //console.log(letter, position, (position == ("pos" + i)))
                    //console.log(positions)
                    if(position != ("pos" + (i+1))){
                        if (!(positions[position].get("possible").has(letter)) && !(positions[position].get("impossible").has(letter))){
                            positions[position].get("possible").add(letter)
                            //console.log("possible", letter, position)
                        }
                    }
                    else{
                        if(positions[position].get("possible").has(letter)){
                            //console.log("removing from list", letter, position)
                            positions[position].get("possible").delete(letter)
                        }
                        if (!positions[position].get("impossible").has(letter)){
                            //console.log(i, "Adding", letter, "to", positions[position].get("impossible"))
                            positions[position].get("impossible").add(letter)
                            //console.log("False:", letter, position)
                        }
                    }
                }
            }
            //console.log("Adding", letter, "to knownChars for", goalWord, "because it turned yellow")
            //knownChars += letter
            //if (knownChars.indexOf(letter) == -1){
            // if (countChar(word.toUpperCase(), letter) > countChar(knownChars, letter)) {
            //     knownChars += letter
            // }
        }
        //turns grey because letter is repeated too much
        else if((countChar(goalWord, letter) > 0) && (countChar(word.slice(0, i+1), letter) > countChar(goalWord, letter))){
            let position = positions["pos" + (i+1)]
            // console.log("Current position looks like:", position, "goalword is", goalWord, "current letter is", letter)
            // console.log(goalWord, "contains the letter", letter, (countChar(goalWord, letter) > 0))
            // console.log((word.slice(0, i+1)), "contains the letter", letter, (countChar(word.slice(0, i+1), letter)), "times", goalWord, "contains that letter", (countChar(goalWord, letter)), "times, which is more than the slice", (countChar(word.slice(0, i+1), letter) > countChar(goalWord, letter)))
            if (typeof position != "string"){
                if(position.get("possible").has(letter)){
                    //console.log("removing from list", letter, position)
                    position.get("possible").delete(letter)
                }
                position.get("impossible").add(letter)
            }
        }
        //turns grey because that letter is not in the word entirely
        else{
            for (let position in positions){
                if (typeof positions[position] != "string"){
                    if (positions[position].get("possible").has(letter)){
                        positions[position].get("possible").delete(letter)
                    }
                    positions[position].get("impossible").add(letter)
                }
            }
        }
        //Issue with cases like "afoul" and "tread" with a confirmed in both spots
        // if (countChar(word.toLowerCase(), letter) > countChar(knownChars, letter)) {
        //     knownChars += letter
        // }
    }
    let knownChars = new Set()
    for (let pos in positions){
        //console.log("At remaining words: position", pos, "is a", typeof pos)
        if (typeof positions[pos] == "string"){
            knownChars.add(positions[pos])
        }
        else{
            for (let letter of positions[pos].get("possible")){
                knownChars.add(letter)
            }
        }
    }
    console.log(positions)
    console.log("knownChars:", knownChars)
    createFormList(positionMapObject, knownChars)
}

function createFormList(positionMapObject, knownChars){
    let positions = positionMapObject.positions
    formsList = []
    for (let x in positions){
        //console.log(x)
        //if (typeof positions[x] != "string"){
            if (typeof positions[x] == "string"){
                formsList = createFormListHelper(formsList, positions[x])
            }
            else{
                let tempArray = []
                for (let lett of positions[x].get("possible")){
                    tempArray.push(lett)
                }
                formsList = createFormListHelper(formsList, tempArray.concat(['_']))
            }
        //}
    }
    let finalFormsList = []
    for (let word of formsList){
        finalFormsList.push(word)
        for (let letter of knownChars){
            //if (word.indexOf(letter) == -1){
            if (countChar(word.toLowerCase(), letter) < countChar(knownChars, letter)){
                finalFormsList.pop()
                break
            }
        }
    }
    //console.log("Number of forms:", finalFormsList.length)
    console.log(finalFormsList)
    // if (lastKnown == "tool"){
    //     outputpossibleWords(finalFormsList)
    // }
    createRemainingWords(finalFormsList, positionMapObject)
}

function createFormListHelper(formsList, letters){
    let tempList = []
    if (formsList.length == 0){
        for (let letter of letters){
            tempList.push(letter)
        }
    } else {
        //console.log("letters", letters)
        for (let letter of letters){
            for (let word of formsList){
                //if ((word.indexOf(letter) == -1) || (letter == '_')){
                    tempList.push(word + letter)
                //}
            }
        }
    }
    return tempList
}

function createRemainingWords(forms, positionMapObject){
    let positions = positionMapObject.positions
    knownChars = new Set()
    nullLetters = new Set()
    for (let pos in positions){
        //console.log("At remaining words: position", pos, "is a", typeof pos)
        if (typeof positions[pos] == "string"){
            knownChars.add(positions[pos])
        }
        else{
            for (let letter of positions[pos].get("possible")){
                knownChars.add(letter)
            }
        }
    }
    for (let pos in positions){
        if (typeof positions[pos] != "string"){
            for (let letter of positions[pos].get("impossible")){
                if (!knownChars.has(letter)){
                    nullLetters.add(letter)
                }
            }
        }
    }
    // console.log("remaining words knownChars", knownChars)
    // console.log("remaining words null letters", nullLetters)
    //letters (not repeats) that aren't in word
    //let nullLetters = ""
    //let inputWord = ""
    // if (lastKnown == "tool"){
    //     inputWord = document.getElementById("tool_word").value
    // }
    //else if (lastKnown == "test"){
    //inputWord = testWordReturn
    //}
    // for (let i = 1; i < 6; i++){
    //     const notInWord = document.getElementById("null" + i)
    //     if ((notInWord.checked) && (knownChars.indexOf(inputWord[i - 1].toUpperCase()) == -1)){
    //         nullLetters += inputWord[i - 1].toLowerCase()
    //     }
    // }
    //const numWords = remainingWords.length
    let remainingWords = []
    //let numLostAtNull = 0
    for (let i = 0; i < word_list.length; i++){
        //the current word being checked
        currentWord = word_list[i]
        //bool for whether or not to keep the word
        let keep = true
        for (let letter of nullLetters){
            if (currentWord.indexOf(letter) != -1){
                //if the current word contains a letter known to not be in the answer, set keep to false
                keep = false
                // if (currentWord == document.getElementById("test_word").value){
                //     console.log("Throwing out the test word because it contains ", letter)
                // }
                //numLostAtNull++
            }
        }
        //if the current only contains known (or unknown) letters
        if (keep){
            //assume that the word does not match any form
            keep = false
            for (let form of forms){
                //assume that the current form matches the word
                let match = true
                //for each index in the current form
                for (let letterIndex = 0; letterIndex < 5; letterIndex++){
                    //match = false if at the current index, the form is '_' and the letter in the current word is known
                    //if((form[letterIndex] == '_') && (knownChars.indexOf(currentWord[letterIndex].toLowerCase()) != -1)){
                    if((form[letterIndex] == '_') && (knownChars.has(currentWord[letterIndex].toLowerCase()))){
                        match = false
                    }
                    //match = false if at the current index, the form is not '_' and the letter in the current word does not match the letter in form
                    else if((form[letterIndex] != '_') && (currentWord[letterIndex].toLowerCase() != form[letterIndex])){
                        match = false
                    }
                }
                if (match){
                    //console.log(currentWord, form)
                    keep = true
                    break
                }
            }
        }
        if (keep){
            //console.log("pushing", currentWord)
            remainingWords.push(currentWord)
        }
        //numLostAtForms++
        // else{
        //     if (currentWord == document.getElementById("test_word").value){
        //         console.log("Throwing out the test word")
        //     }
        // }
    }
    //return remainingWords
    //console.log("length of remainingWords", remainingWords.length)
    //console.log("Threw out", numLostAtNull, "at null")
    positionMapObject.numRemaining = remainingWords.length
    let suggestion = new wordScore("filler", 0)
    suggestion = suggestWord(remainingWords)
    positionMapObject.nextSuggestion = suggestion.word
    positionMapObject.suggestionScore = suggestion.score
    //let numwordpara = "The number of remaining possible words: " + remainingWords.length.toString()
    //document.getElementById("numwordpara").innerHTML = numwordpara
}

function suggestWord(remainingWords){
    let bestWord = 'alert'
    let bestWordScore = -1
    console.log("Num of remaining words:", remainingWords.length)
    // if (posObj.numRemaining == 1){
    //     bestWord = remainingWords[0]
    // }
    if (remainingWords.length < 2315){
        for (let checkBest of remainingWords){
        let wordScore = 0
            for (let chechAgainst of remainingWords){
                if (checkBest != chechAgainst){
                    let seenLetters = ""
                    //console.log("Checking", checkBest, "against", chechAgainst, "having seen letters", seenLetters)
                    for (let i = 0; i < 5; i++){
                        let letter = checkBest[i]
                        if (seenLetters.indexOf(letter) == -1){
                            seenLetters += letter
                            if (chechAgainst.indexOf(letter) != -1){
                                //console.log("Gaining 1 for", letter, "at", chechAgainst.indexOf(letter))
                                wordScore += 1
                            }
                        }
                    }
                }
            }
            // if (checkBest.length > 0){
            //     console.log("word score:", checkBest, wordScore)
            // }
            if (wordScore > bestWordScore){
                //console.log("Current and successor", bestWord, bestWordScore, checkBest, wordScore)
                bestWord = checkBest
                bestWordScore = wordScore
            }
        }
    }
    console.log("Word and score", bestWord, bestWordScore)
    return new wordScore(bestWord, bestWordScore)
    // if (lastKnown == "test"){
    //     testWordReturn = bestWord
    // }
    // else if(lastKnown == "tool"){
    //     let suggestwordpara = "Suggest a Word: " + bestWord.toUpperCase()
    //     document.getElementById("suggestwordpara").innerHTML = suggestwordpara
    // }
}

function countChar(word, character){
    let numChar = 0
    for (let letter of word){
        if (letter == character){
            numChar += 1
        }
    }
    return numChar
}



const word_list = ["aback","abase","abate","abbey","abbot","abhor","abide","abled","abode","abort","about","above","abuse","abyss","acorn","acrid","actor","acute","adage","adapt","adept","admin","admit","adobe","adopt","adore","adorn","adult","affix","afire","afoot","afoul","after","again","agape","agate","agent","agile","aging","aglow","agony","agora","agree","ahead","aider","aisle","alarm","album","alert","algae","alibi","alien","align","alike","alive","allay","alley","allot","allow","alloy","aloft","alone","along","aloof","aloud","alpha","altar","alter","amass","amaze","amber","amble","amend","amiss","amity","among","ample","amply","amuse","angel","anger","angle","angry","angst","anime","ankle","annex","annoy","annul","anode","antic","anvil","aorta","apart","aphid","aping","apnea","apple","apply","apron","aptly","arbor","ardor","arena","argue","arise","armor","aroma","arose","array","arrow","arson","artsy","ascot","ashen","aside","askew","assay","asset","atoll","atone","attic","audio","audit","augur","aunty","avail","avert","avian","avoid","await","awake","award","aware","awash","awful","awoke","axial","axiom","axion","azure","bacon","badge","badly","bagel","baggy","baker","baler","balmy","banal","banjo","barge","baron","basal","basic","basil","basin","basis","baste","batch","bathe","baton","batty","bawdy","bayou","beach","beady","beard","beast","beech","beefy","befit","began","begat","beget","begin","begun","being","belch","belie","belle","belly","below","bench","beret","berry","berth","beset","betel","bevel","bezel","bible","bicep","biddy","bigot","bilge","billy","binge","bingo","biome","birch","birth","bison","bitty","black","blade","blame","bland","blank","blare","blast","blaze","bleak","bleat","bleed","bleep","blend","bless","blimp","blind","blink","bliss","blitz","bloat","block","bloke","blond","blood","bloom","blown","bluer","bluff","blunt","blurb","blurt","blush","board","boast","bobby","boney","bongo","bonus","booby","boost","booth","booty","booze","boozy","borax","borne","bosom","bossy","botch","bough","boule","bound","bowel","boxer","brace","braid","brain","brake","brand","brash","brass","brave","bravo","brawl","brawn","bread","break","breed","briar","bribe","brick","bride","brief","brine","bring","brink","briny","brisk","broad","broil","broke","brood","brook","broom","broth","brown","brunt","brush","brute","buddy","budge","buggy","bugle","build","built","bulge","bulky","bully","bunch","bunny","burly","burnt","burst","bused","bushy","butch","butte","buxom","buyer","bylaw","cabal","cabby","cabin","cable","cacao","cache","cacti","caddy","cadet","cagey","cairn","camel","cameo","canal","candy","canny","canoe","canon","caper","caput","carat","cargo","carol","carry","carve","caste","catch","cater","catty","caulk","cause","cavil","cease","cedar","cello","chafe","chaff","chain","chair","chalk","champ","chant","chaos","chard","charm","chart","chase","chasm","cheap","cheat","check","cheek","cheer","chess","chest","chick","chide","chief","child","chili","chill","chime","china","chirp","chock","choir","choke","chord","chore","chose","chuck","chump","chunk","churn","chute","cider","cigar","cinch","circa","civic","civil","clack","claim","clamp","clang","clank","clash","clasp","class","clean","clear","cleat","cleft","clerk","click","cliff","climb","cling","clink","cloak","clock","clone","close","cloth","cloud","clout","clove","clown","cluck","clued","clump","clung","coach","coast","cobra","cocoa","colon","color","comet","comfy","comic","comma","conch","condo","conic","copse","coral","corer","corny","couch","cough","could","count","coupe","court","coven","cover","covet","covey","cower","coyly","crack","craft","cramp","crane","crank","crash","crass","crate","crave","crawl","craze","crazy","creak","cream","credo","creed","creek","creep","creme","crepe","crept","cress","crest","crick","cried","crier","crime","crimp","crisp","croak","crock","crone","crony","crook","cross","croup","crowd","crown","crude","cruel","crumb","crump","crush","crust","crypt","cubic","cumin","curio","curly","curry","curse","curve","curvy","cutie","cyber","cycle","cynic","daddy","daily","dairy","daisy","dally","dance","dandy","datum","daunt","dealt","death","debar","debit","debug","debut","decal","decay","decor","decoy","decry","defer","deign","deity","delay","delta","delve","demon","demur","denim","dense","depot","depth","derby","deter","detox","deuce","devil","diary","dicey","digit","dilly","dimly","diner","dingo","dingy","diode","dirge","dirty","disco","ditch","ditto","ditty","diver","dizzy","dodge","dodgy","dogma","doing","dolly","donor","donut","dopey","doubt","dough","dowdy","dowel","downy","dowry","dozen","draft","drain","drake","drama","drank","drape","drawl","drawn","dread","dream","dress","dried","drier","drift","drill","drink","drive","droit","droll","drone","drool","droop","dross","drove","drown","druid","drunk","dryer","dryly","duchy","dully","dummy","dumpy","dunce","dusky","dusty","dutch","duvet","dwarf","dwell","dwelt","dying","eager","eagle","early","earth","easel","eaten","eater","ebony","eclat","edict","edify","eerie","egret","eight","eject","eking","elate","elbow","elder","elect","elegy","elfin","elide","elite","elope","elude","email","embed","ember","emcee","empty","enact","endow","enema","enemy","enjoy","ennui","ensue","enter","entry","envoy","epoch","epoxy","equal","equip","erase","erect","erode","error","erupt","essay","ester","ether","ethic","ethos","etude","evade","event","every","evict","evoke","exact","exalt","excel","exert","exile","exist","expel","extol","extra","exult","eying","fable","facet","faint","fairy","faith","false","fancy","fanny","farce","fatal","fatty","fault","fauna","favor","feast","fecal","feign","fella","felon","femme","femur","fence","feral","ferry","fetal","fetch","fetid","fetus","fever","fewer","fiber","fibre","ficus","field","fiend","fiery","fifth","fifty","fight","filer","filet","filly","filmy","filth","final","finch","finer","first","fishy","fixer","fizzy","fjord","flack","flail","flair","flake","flaky","flame","flank","flare","flash","flask","fleck","fleet","flesh","flick","flier","fling","flint","flirt","float","flock","flood","floor","flora","floss","flour","flout","flown","fluff","fluid","fluke","flume","flung","flunk","flush","flute","flyer","foamy","focal","focus","foggy","foist","folio","folly","foray","force","forge","forgo","forte","forth","forty","forum","found","foyer","frail","frame","frank","fraud","freak","freed","freer","fresh","friar","fried","frill","frisk","fritz","frock","frond","front","frost","froth","frown","froze","fruit","fudge","fugue","fully","fungi","funky","funny","furor","furry","fussy","fuzzy","gaffe","gaily","gamer","gamma","gamut","gassy","gaudy","gauge","gaunt","gauze","gavel","gawky","gayer","gayly","gazer","gecko","geeky","geese","genie","genre","ghost","ghoul","giant","giddy","gipsy","girly","girth","given","giver","glade","gland","glare","glass","glaze","gleam","glean","glide","glint","gloat","globe","gloom","glory","gloss","glove","glyph","gnash","gnome","godly","going","golem","golly","gonad","goner","goody","gooey","goofy","goose","gorge","gouge","gourd","grace","grade","graft","grail","grain","grand","grant","grape","graph","grasp","grass","grate","grave","gravy","graze","great","greed","green","greet","grief","grill","grime","grimy","grind","gripe","groan","groin","groom","grope","gross","group","grout","grove","growl","grown","gruel","gruff","grunt","guard","guava","guess","guest","guide","guild","guile","guilt","guise","gulch","gully","gumbo","gummy","guppy","gusto","gusty","gypsy","habit","hairy","halve","handy","happy","hardy","harem","harpy","harry","harsh","haste","hasty","hatch","hater","haunt","haute","haven","havoc","hazel","heady","heard","heart","heath","heave","heavy","hedge","hefty","heist","helix","hello","hence","heron","hilly","hinge","hippo","hippy","hitch","hoard","hobby","hoist","holly","homer","honey","honor","horde","horny","horse","hotel","hotly","hound","house","hovel","hover","howdy","human","humid","humor","humph","humus","hunch","hunky","hurry","husky","hussy","hutch","hydro","hyena","hymen","hyper","icily","icing","ideal","idiom","idiot","idler","idyll","igloo","iliac","image","imbue","impel","imply","inane","inbox","incur","index","inept","inert","infer","ingot","inlay","inlet","inner","input","inter","intro","ionic","irate","irony","islet","issue","itchy","ivory","jaunt","jazzy","jelly","jerky","jetty","jewel","jiffy","joint","joist","joker","jolly","joust","judge","juice","juicy","jumbo","jumpy","junta","junto","juror","kappa","karma","kayak","kebab","khaki","kinky","kiosk","kitty","knack","knave","knead","kneed","kneel","knelt","knife","knock","knoll","known","koala","krill","label","labor","laden","ladle","lager","lance","lanky","lapel","lapse","large","larva","lasso","latch","later","lathe","latte","laugh","layer","leach","leafy","leaky","leant","leapt","learn","lease","leash","least","leave","ledge","leech","leery","lefty","legal","leggy","lemon","lemur","leper","level","lever","libel","liege","light","liken","lilac","limbo","limit","linen","liner","lingo","lipid","lithe","liver","livid","llama","loamy","loath","lobby","local","locus","lodge","lofty","logic","login","loopy","loose","lorry","loser","louse","lousy","lover","lower","lowly","loyal","lucid","lucky","lumen","lumpy","lunar","lunch","lunge","lupus","lurch","lurid","lusty","lying","lymph","lynch","lyric","macaw","macho","macro","madam","madly","mafia","magic","magma","maize","major","maker","mambo","mamma","mammy","manga","mange","mango","mangy","mania","manic","manly","manor","maple","march","marry","marsh","mason","masse","match","matey","mauve","maxim","maybe","mayor","mealy","meant","meaty","mecca","medal","media","medic","melee","melon","mercy","merge","merit","merry","metal","meter","metro","micro","midge","midst","might","milky","mimic","mince","miner","minim","minor","minty","minus","mirth","miser","missy","mocha","modal","model","modem","mogul","moist","molar","moldy","money","month","moody","moose","moral","moron","morph","mossy","motel","motif","motor","motto","moult","mound","mount","mourn","mouse","mouth","mover","movie","mower","mucky","mucus","muddy","mulch","mummy","munch","mural","murky","mushy","music","musky","musty","myrrh","nadir","naive","nanny","nasal","nasty","natal","naval","navel","needy","neigh","nerdy","nerve","never","newer","newly","nicer","niche","niece","night","ninja","ninny","ninth","noble","nobly","noise","noisy","nomad","noose","north","nosey","notch","novel","nudge","nurse","nutty","nylon","nymph","oaken","obese","occur","ocean","octal","octet","odder","oddly","offal","offer","often","olden","older","olive","ombre","omega","onion","onset","opera","opine","opium","optic","orbit","order","organ","other","otter","ought","ounce","outdo","outer","outgo","ovary","ovate","overt","ovine","ovoid","owing","owner","oxide","ozone","paddy","pagan","paint","paler","palsy","panel","panic","pansy","papal","paper","parer","parka","parry","parse","party","pasta","paste","pasty","patch","patio","patsy","patty","pause","payee","payer","peace","peach","pearl","pecan","pedal","penal","pence","penne","penny","perch","peril","perky","pesky","pesto","petal","petty","phase","phone","phony","photo","piano","picky","piece","piety","piggy","pilot","pinch","piney","pinky","pinto","piper","pique","pitch","pithy","pivot","pixel","pixie","pizza","place","plaid","plain","plait","plane","plank","plant","plate","plaza","plead","pleat","plied","plier","pluck","plumb","plume","plump","plunk","plush","poesy","point","poise","poker","polar","polka","polyp","pooch","poppy","porch","poser","posit","posse","pouch","pound","pouty","power","prank","prawn","preen","press","price","prick","pride","pried","prime","primo","print","prior","prism","privy","prize","probe","prone","prong","proof","prose","proud","prove","prowl","proxy","prude","prune","psalm","pubic","pudgy","puffy","pulpy","pulse","punch","pupal","pupil","puppy","puree","purer","purge","purse","pushy","putty","pygmy","quack","quail","quake","qualm","quark","quart","quash","quasi","queen","queer","quell","query","quest","queue","quick","quiet","quill","quilt","quirk","quite","quota","quote","quoth","rabbi","rabid","racer","radar","radii","radio","rainy","raise","rajah","rally","ralph","ramen","ranch","randy","range","rapid","rarer","raspy","ratio","ratty","raven","rayon","razor","reach","react","ready","realm","rearm","rebar","rebel","rebus","rebut","recap","recur","recut","reedy","refer","refit","regal","rehab","reign","relax","relay","relic","remit","renal","renew","repay","repel","reply","rerun","reset","resin","retch","retro","retry","reuse","revel","revue","rhino","rhyme","rider","ridge","rifle","right","rigid","rigor","rinse","ripen","riper","risen","riser","risky","rival","river","rivet","roach","roast","robin","robot","rocky","rodeo","roger","rogue","roomy","roost","rotor","rouge","rough","round","rouse","route","rover","rowdy","rower","royal","ruddy","ruder","rugby","ruler","rumba","rumor","rupee","rural","rusty","sadly","safer","saint","salad","sally","salon","salsa","salty","salve","salvo","sandy","saner","sappy","sassy","satin","satyr","sauce","saucy","sauna","saute","savor","savoy","savvy","scald","scale","scalp","scaly","scamp","scant","scare","scarf","scary","scene","scent","scion","scoff","scold","scone","scoop","scope","score","scorn","scour","scout","scowl","scram","scrap","scree","screw","scrub","scrum","scuba","sedan","seedy","segue","seize","semen","sense","sepia","serif","serum","serve","setup","seven","sever","sewer","shack","shade","shady","shaft","shake","shaky","shale","shall","shalt","shame","shank","shape","shard","share","shark","sharp","shave","shawl","shear","sheen","sheep","sheer","sheet","sheik","shelf","shell","shied","shift","shine","shiny","shire","shirk","shirt","shoal","shock","shone","shook","shoot","shore","shorn","short","shout","shove","shown","showy","shrew","shrub","shrug","shuck","shunt","shush","shyly","siege","sieve","sight","sigma","silky","silly","since","sinew","singe","siren","sissy","sixth","sixty","skate","skier","skiff","skill","skimp","skirt","skulk","skull","skunk","slack","slain","slang","slant","slash","slate","slave","sleek","sleep","sleet","slept","slice","slick","slide","slime","slimy","sling","slink","sloop","slope","slosh","sloth","slump","slung","slunk","slurp","slush","slyly","smack","small","smart","smash","smear","smell","smelt","smile","smirk","smite","smith","smock","smoke","smoky","smote","snack","snail","snake","snaky","snare","snarl","sneak","sneer","snide","sniff","snipe","snoop","snore","snort","snout","snowy","snuck","snuff","soapy","sober","soggy","solar","solid","solve","sonar","sonic","sooth","sooty","sorry","sound","south","sower","space","spade","spank","spare","spark","spasm","spawn","speak","spear","speck","speed","spell","spelt","spend","spent","sperm","spice","spicy","spied","spiel","spike","spiky","spill","spilt","spine","spiny","spire","spite","splat","split","spoil","spoke","spoof","spook","spool","spoon","spore","sport","spout","spray","spree","sprig","spunk","spurn","spurt","squad","squat","squib","stack","staff","stage","staid","stain","stair","stake","stale","stalk","stall","stamp","stand","stank","stare","stark","start","stash","state","stave","stead","steak","steal","steam","steed","steel","steep","steer","stein","stern","stick","stiff","still","stilt","sting","stink","stint","stock","stoic","stoke","stole","stomp","stone","stony","stood","stool","stoop","store","stork","storm","story","stout","stove","strap","straw","stray","strip","strut","stuck","study","stuff","stump","stung","stunk","stunt","style","suave","sugar","suing","suite","sulky","sully","sumac","sunny","super","surer","surge","surly","sushi","swami","swamp","swarm","swash","swath","swear","sweat","sweep","sweet","swell","swept","swift","swill","swine","swing","swirl","swish","swoon","swoop","sword","swore","sworn","swung","synod","syrup","tabby","table","taboo","tacit","tacky","taffy","taint","taken","taker","tally","talon","tamer","tango","tangy","taper","tapir","tardy","tarot","taste","tasty","tatty","taunt","tawny","teach","teary","tease","teddy","teeth","tempo","tenet","tenor","tense","tenth","tepee","tepid","terra","terse","testy","thank","theft","their","theme","there","these","theta","thick","thief","thigh","thing","think","third","thong","thorn","those","three","threw","throb","throw","thrum","thumb","thump","thyme","tiara","tibia","tidal","tiger","tight","tilde","timer","timid","tipsy","titan","tithe","title","toast","today","toddy","token","tonal","tonga","tonic","tooth","topaz","topic","torch","torso","torus","total","totem","touch","tough","towel","tower","toxic","toxin","trace","track","tract","trade","trail","train","trait","tramp","trash","trawl","tread","treat","trend","triad","trial","tribe","trice","trick","tried","tripe","trite","troll","troop","trope","trout","trove","truce","truck","truer","truly","trump","trunk","truss","trust","truth","tryst","tubal","tuber","tulip","tulle","tumor","tunic","turbo","tutor","twang","tweak","tweed","tweet","twice","twine","twirl","twist","twixt","tying","udder","ulcer","ultra","umbra","uncle","uncut","under","undid","undue","unfed","unfit","unify","union","unite","unity","unlit","unmet","unset","untie","until","unwed","unzip","upper","upset","urban","urine","usage","usher","using","usual","usurp","utile","utter","vague","valet","valid","valor","value","valve","vapid","vapor","vault","vaunt","vegan","venom","venue","verge","verse","verso","verve","vicar","video","vigil","vigor","villa","vinyl","viola","viper","viral","virus","visit","visor","vista","vital","vivid","vixen","vocal","vodka","vogue","voice","voila","vomit","voter","vouch","vowel","vying","wacky","wafer","wager","wagon","waist","waive","waltz","warty","waste","watch","water","waver","waxen","weary","weave","wedge","weedy","weigh","weird","welch","welsh","wench","whack","whale","wharf","wheat","wheel","whelp","where","which","whiff","while","whine","whiny","whirl","whisk","white","whole","whoop","whose","widen","wider","widow","width","wield","wight","willy","wimpy","wince","winch","windy","wiser","wispy","witch","witty","woken","woman","women","woody","wooer","wooly","woozy","wordy","world","worry","worse","worst","worth","would","wound","woven","wrack","wrath","wreak","wreck","wrest","wring","wrist","write","wrong","wrote","wrung","wryly","yacht","yearn","yeast","yield","young","youth","zebra","zesty","zonal"]
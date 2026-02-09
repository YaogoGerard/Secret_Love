//Cacher  les sections unitiles pour le moment
const declarationSection=document.getElementById("declarationSection");
declarationSection.classList.add("hidden");
const copySection=document.getElementById("copySection");
copySection.classList.add("hidden");
const answerSection=document.getElementById("answerSection");
answerSection.classList.add("hidden");
const rejetedSection=document.getElementById("rejetedSection");
rejetedSection.classList.add("hidden");
const acceptedSection=document.getElementById("acceptedSection");
acceptedSection.classList.add("hidden");
/*
Recuperation de l'url et traitement pour obtenir un les donneés voulues
*/
const loveUrl=window.location.href
if (loveUrl.includes("?data=")) {
    answerSection.classList.remove("hidden");
    declarationSection.classList.add("hidden");
    const ores=loveUrl.split("?data=")[1];
    const bruteData=decodeURIComponent(atob(ores));
    const data=bruteData.split("|");
    const nom=data[0]
    const prenom=data[1]
    const sexe=data[2]
    const loveNom=data[3]
    const lovePrenom=data[4]
    const question=data[5]
    const answer=data[6]
    const qName=document.getElementById("qName");
    const qQuestion=document.getElementById("qQuestion")
    qName.innerHTML=`La quesion de <span style="color:orange;">${nom} ${prenom}</span> est:`;
    qQuestion.innerHTML=`<span style="color:orange;">${question}</span>`;
    const verif=document.getElementById('verif');
    function verify(){
        const reponse=document.getElementById("repondez").value;
        if(reponse==""){
            alert("Veuillez remplir tous les champs avant de continuer !")
        }
         else{
            if(reponse.toLowerCase()==answer.toLowerCase()){
            answerSection.classList.add("hidden");
            acceptedSection.classList.remove("hidden");
            const aName=document.getElementById("aName");
            aName.innerHTML=`accepté, <span style="color:orange;">${nom} ${prenom}</span>  est amoureux(euse) de <span style="color:orange;">${loveNom} ${lovePrenom}</span>`;
        }else{
            answerSection.classList.add("hidden");
            rejetedSection.classList.remove("hidden");
            const rName=document.getElementById("rName");
            rName.innerHTML=`réjeté, vous n'etes pas apte à voir le nom de l'amoureux de <span style="color:orange;">${nom} ${prenom}</span>`
        }
        }
    }
    verif.addEventListener('click',verify);
    
}else{
    declarationSection.classList.remove("hidden");
}
/*
fonction pour recuperer les donnees de declaration Section
*/

function declare(){
    //recuperer les donnneés de des diférents input
    const nom=document.getElementById("nom").value;
    const prenom=document.getElementById("prenom").value;
    const sexe=document.querySelector('input[name="sexe"]:checked')?.value;
    const loveNom=document.getElementById("loveNom").value;
    const lovePrenom=document.getElementById("lovePrenom").value;
     const question=document.getElementById("q").value;
    const answer=document.getElementById("a").value;
    const confirm=document.getElementById("confirm")
    const copierInput=document.getElementById("copierInput")
    const copybutton=document.getElementById("copybutton")
    //verifier que les champs ne sont pas vides
    if (nom ==""  || prenom =="" || !sexe || loveNom=="" || lovePrenom=="" || question==""|| answer=="" || !confirm.checked) {
     alert("Veuillez remplir tous les champs avant de continuer !")   
    }else{
        const data=nom+"|"+prenom+"|"+sexe+"|"+loveNom+"|"+lovePrenom+"|"+question+"|"+answer;
        //encodeURIComponent permet de gérer les cas ou l'utilisateur mettrai des accents
        const encodeData=btoa(encodeURIComponent(data));
        const url=window.location.origin + window.location.pathname+'?data='+encodeData;
        declarationSection.classList.add("hidden");
        copySection.classList.remove("hidden");
        copierInput.value="Pour la Saint-Valentin, je laisse parler mon cœur ❤️ Il y a quelqu'un qui occupe toutes mes pensées en ce moment... Si on est vraiment complices, tu as sûrement déjà une petite idée de qui il s'agit 😉✨ Sauras-tu deviner ce que je n'ose pas encore te dire en face ? 🤫 La réponse est ici : "+url
        //fonction pour copier le message à partager
        function copy(){
            navigator.clipboard.writeText(copierInput.value).then(()=>{
            copybutton.innerText="Copié ! ✅"
            setTimeout(() => copybutton.innerText = "Copier", 2000)
        })
        }
        copybutton.addEventListener('click',copy)
    }
}
//bouton de soumission de la #declarationSection
const submit=document.getElementById('decSubmit');
submit.addEventListener('click',declare);

function reset(){
    const newUrl=window.location.origin + window.location.pathname;
    window.location.href = newUrl;
}
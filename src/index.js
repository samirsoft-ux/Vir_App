import AppID from 'ibmcloud-appid-js';
import config from './config.json';

const $loginButton = document.getElementById('login');
const $welcome = document.getElementById('welcome');
const $afterLogin = document.getElementById('afterLogin');
const $welcomeNameId = document.getElementById('welcomeNameID');
const $tokenContent = document.getElementById('tokenContent');
const $userContent = document.getElementById('userContent');
const $error = document.getElementById('error');

const appID = new AppID();



async function onLoginButtonClick() {
	try {
		hideElement($loginButton);

		const tokens = await appID.signin();
		let userInfo = await appID.getUserInfo(tokens.accessToken);

		hideElement($welcome);
		showElement($afterLogin);
		showChat();

		let decodeIDToken = tokens.idTokenPayload;

		$welcomeNameId.textContent = 'Hola ' + decodeIDToken.name + ' bienvenido a tu asistente virtual.';
		$tokenContent.textContent = JSON.stringify(decodeIDToken);
		$userContent.textContent = JSON.stringify(userInfo);
	} catch (e) {
		$error.textContent = e;
		showElement($loginButton);
	}
}

(async () => {
	try {
		await appID.init(config);
		showElement($loginButton);
		$loginButton.addEventListener('click', onLoginButtonClick);
	} catch (e) {
		$error.textContent = e;
	}
})();

function hideElement($element) {
	$element.classList.add('hidden');
}

function showElement($element) {
	$element.classList.remove('hidden');
}

//mi parte
function showChat() {
	window.watsonAssistantChatOptions = {
		integrationID: "090f60e0-7779-4722-9ced-5d063a85eaf3", // The ID of this integration.
		region: "us-south", // The region your integration is hosted in.
		serviceInstanceID: "0d736a72-8196-427b-b678-2c723d72cdfa", // The ID of your service instance.
		onLoad: function(instance) { instance.render(); }
	  };
	  setTimeout(function(){
		const t=document.createElement('script');
		t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
		document.head.appendChild(t);
	  });
}
//

const collaps = document.getElementsByClassName("collapsible");
for (let collapsible of collaps) {
	const btn = collapsible.getElementsByTagName("button")[0];
	btn.addEventListener("click", () => {
		collapsible.classList.toggle("active");
	});
}


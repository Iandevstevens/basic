const test = `<script data-cfasync="false" type="text/javascript" id="clever-core">
/* <![CDATA[ */
  (function (document, window) {
        var a, c = document.createElement("script"), f = window.frameElement;

  c.id = "CleverCoreLoader79054";
  c.src = "https://scripts.cleverwebserver.com/e9d3e7e390883deb09ca5982302bd3bd.js";

  c.async = !0;
  c.type = "text/javascript";
  c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));
  c.setAttribute("data-callback", "put-your-callback-function-here");
  c.setAttribute("data-callback-url-click", "put-your-click-macro-here");
  c.setAttribute("data-callback-url-view", "put-your-view-macro-here");


  try {
    a = parent.document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
        } catch (e) {
    a = !1;
        }

  a || (a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
  a.parentNode.insertBefore(c, a);
    })(document, window);
/* ]]> */
</script>`

const t = {
  "ad_elements":
    [
      {
        "position": "head",
        "markup": [{
          "tag": "script", "properties": { "data-cfasync": "false", "type": "text/javascript", "id": "cleaver-core" },
          "script": `
          /* <![CDATA[ */
            (function (document, window) {
                  var a, c = document.createElement("script"), f = window.frameElement;
          
            c.id = "CleverCoreLoader79054";
            c.src = "https://scripts.cleverwebserver.com/e9d3e7e390883deb09ca5982302bd3bd.js";
          
            c.async = !0;
            c.type = "text/javascript";
            c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));
            c.setAttribute("data-callback", "put-your-callback-function-here");
            c.setAttribute("data-callback-url-click", "put-your-click-macro-here");
            c.setAttribute("data-callback-url-view", "put-your-view-macro-here");
          
          
            try {
              a = parent.document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
                  } catch (e) {
              a = !1;
                  }
          
            a || (a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
            a.parentNode.insertBefore(c, a);
              })(document, window);
          /* ]]> */
          `,
          children: []
        }],
        "redirect_url": "https:\/\/play.mtn.co.za\/get\/showmax_premier_league_pass\/?utm_source=paid+media&utm_medium=arena+holdings&utm_campaign=showmax+epl+march_24",
        "behaviour": "breakout",
        "thumbnail": "<img class=\"contentslot-img\" src=\"https:\/\/romulus-cf.sebenza.taxi\/adengine\/campaigns\/arena-holdings-showmax-mtn-march-2024-po12345\/creatives\/ada449cf07f5572513e727084fe74535.gif\"\r\n            data-width=\"600\"\r\n            data-height=\"500\"\r\n            onload=\"recordImpression('ea3de368-4ecb-48a4-b287-4562061f8c44')\"\r\n    >"
      }
    ]
}


window.recordImpression = async function (impressionId) {
  await getFetch(`${window.PLATTER_URL}/r/${impressionId}`);
};

window.startPlay = async function (url) {
  await getFetch(url);
};

const getFetch = link => fetch(link, {
  method: "GET",
  redirect: "follow",
  credentials: "include",
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
}).then(async response => {
  try {
    const result = await response.json();
    if (response.status > 399 || response.status < 200) {
      postError(response, result);
    }
    return result;
  } catch (e) {
    return;
  }
}).then(result => result).catch(error => {
  postError500(error);
  console.error("error", error);
});

async function retrievePlatter(type, id) {
  const data = (await getFetch(`${window.PLATTER_URL}/ad/serve/${type}`)).data;
  constructPlatter(data.ad_elements, id);
};

function createTag(parentElement, markup) {
  markup.forEach(element => {
    const tag = document.createElement(element.tag);
    Object.keys(element.properties).forEach(key => {
      tag.setAttribute(key, element.properties[key]);
    });
    if (element.children.length > 0) {
      createTag(tag, element.children);
    }
    if (element.script) {
      tag.innerHTML = element.script;
    }
    parentElement.appendChild(tag);
  });
};

async function constructPlatter(tags, id) {
  tags.forEach(element => {
    if (element.position === "head") {
      const head = document.getElementsByTagName("head")[0];
      createTag(head, element.markup);
    } else {
      const adTag = document.getElementById(id);
      createTag(adTag, element.markup);
    }
  });
}

constructPlatter(t.ad_elements, "ad-container");
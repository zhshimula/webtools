function generateRobotsTxt() {
  let websiteLink = document.getElementById("websiteLink").value;
  // remove trailing '/' if present
  websiteLink = websiteLink.replace(/\/$/, "");
  // check if the link starts with https
  if(!websiteLink.startsWith("https")) {
    alert("Error: Please enter a valid website link starting with 'https'");
    return;
  }
  let robotsTxt = `User-agent: *
Disallow: /search
Disallow: /category/
Disallow: /tag/
Allow: /
Sitemap: ${websiteLink}/sitemap.xml
Sitemap: ${websiteLink}/sitemap-pages.xml`;
  document.getElementById("output").innerHTML = robotsTxt;
}

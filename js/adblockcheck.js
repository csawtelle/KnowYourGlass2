<script> 
  window.onload = function(){ 
    setTimeout(function() { 
      var ad = document.querySelector("");
      if (ad && ad.innerHTML.replace(/\s/g, "").length == 0) {
        ad.style.cssText = 'display:block !important'; 
        ad.innerHTML = 'Your custom HTML messages goes here';
      }
    }, 1000);  
  }; 
</script>

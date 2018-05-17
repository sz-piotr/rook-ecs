(function () {
  var sidebar = document.querySelector('.sidebar')
  var close = document.querySelector('.sidebar-close')

  var open = true
  close.addEventListener('click', function (event) {
    event.preventDefault()
    if (open) {
      sidebar.className = 'sidebar'
    } else {
      sidebar.className = 'sidebar open'
    }
    open = !open
  }, false)
})()
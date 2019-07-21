function confirmDelete(message) {
    if (confirm(String(message))) {

      $.ajax({
        type: 'POST',
        url: event.target.value,
        success: function () {
          location.reload();
        },
        error: function () {
          location.reload();
        }
      });

      return true;
    } else {
      return false;
    }
  }
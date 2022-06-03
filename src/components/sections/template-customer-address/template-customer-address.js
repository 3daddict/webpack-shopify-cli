class CustomerAddress {
  constructor() {
    this.initCustomerAddress();
    this.customerAddressesSelector();
    this.initDeleteAddressButtons();
  }

  initDeleteAddressButtons() {
    const deleteButtons = document.querySelectorAll(
      'button[data-delete-address]',
    );
    if (deleteButtons.length < 1) return;

    deleteButtons.forEach(button => {
      button.addEventListener('click', function () {
        var url = this.dataset.url;

        var confirmation = window.confirm(
          'Do you really wish to delete this address?',
        );

        if (confirmation) {
          document.querySelector(`form[action="${url}"]`).submit();
        }
      });
    });
  }

  initCustomerAddress() {
    const allAddressesSelector = document.querySelectorAll(
      'select[data-country-selector]',
    );
    if (allAddressesSelector.length < 1) return;

    //console.log(allAddressesSelector);

    allAddressesSelector.forEach(select => {
      var selectedCountry = this.getSelectedCountry(select);

      if (!selectedCountry) return;

      var provinces = selectedCountry.dataset.provinces;
      var arrayOfProvince = JSON.parse(provinces);

      var provinceSelector = document.querySelector(
        `#address_province_${select.dataset.id}`,
      );

      if (arrayOfProvince.length < 1) {
        provinceSelector.setAttribute('disabled', 'disabled');
      } else {
        provinceSelector.removeAttribute('disabled');
      }

      provinceSelector.innerHTML = '';
      var options = '';
      for (var index = 0; index < arrayOfProvince.length; index++) {
        if (
          arrayOfProvince[index][0] === provinceSelector.getAttribute('value')
        ) {
          options += `<option value="${arrayOfProvince[index][0]}" selected>${arrayOfProvince[index][0]}</option>`;
        } else {
          options += `<option value="${arrayOfProvince[index][0]}">${arrayOfProvince[index][0]}</option>`;
        }
      }

      provinceSelector.innerHTML = options;
    });
  }

  getSelectedCountry(select) {
    var option, selectedOption;
    for (var index = 0; index < select.options.length; index++) {
      option = select.options[index];

      if (option.value === select.getAttribute('value')) {
        selectedOption = option;
        selectedOption.setAttribute('selected', 'selected');
        break;
      }
    }

    return selectedOption;
  }

  customerAddressesSelector() {
    const addressesSelector = document.querySelectorAll(
      'select[data-country-selector]',
    );
    if (addressesSelector.length < 1) return;

    addressesSelector.forEach(select => {
      select.addEventListener('change', function () {
        var provinces = this.options[this.selectedIndex].dataset.provinces;
        var arrayOfProvince = JSON.parse(provinces);

        var provinceSelector = document.querySelector(
          `#address_province_${this.dataset.id}`,
        );

        if (arrayOfProvince.length < 1) {
          provinceSelector.setAttribute('disabled', 'disabled');
        } else {
          provinceSelector.removeAttribute('disabled');
        }

        provinceSelector.innerHTML = '';
        var options = '';
        for (var index = 0; index < arrayOfProvince.length; index++) {
          options += `<option value="${arrayOfProvince[index][0]}">${arrayOfProvince[index][0]}</option>`;
        }

        provinceSelector.innerHTML = options;
      });
    });
  }
}

new CustomerAddress();

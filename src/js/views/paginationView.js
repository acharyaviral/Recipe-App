import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * Adds click event listener to pagination buttons.
   * Triggers the handler with the page number to go to when a pagination button is clicked.
   * @param {Function} handler - The function to call when a pagination button is clicked.
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      // Extract target page number from the button's data attribute
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  /**
   * Generates markup for pagination buttons based on the current page and total number of pages.
   * Displays:
   * - "Next" button if on the first page and there are more pages.
   * - "Previous" button if on the last page and there are more pages.
   * - Both "Previous" and "Next" buttons for middle pages.
   * - No buttons if only one page is available.
   * @returns {string} - HTML string for pagination buttons.
   */
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // If on the first page and there are multiple pages, show "Next" button only
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // If on the last page, show "Previous" button only
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    // For middle pages, show both "Previous" and "Next" buttons
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // If on the only page (no other pages), return an empty string
    return '';
  }
}

export default new PaginationView();

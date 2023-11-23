/**
 * Хранилище состояния приложения
 */
class Store {

  constructor(initState = {}) {
    this.flag =false; //глобальный флаг выделения. изначально ни один элемент не выделен
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.N = this.state.list.length; //глобальный счетчик элементов
  }


  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
  this.N+=1; //увеличиваем глобальный счетчик элементов
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.N, title: 'Новая запись', numb: 0}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.flag = true
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        //убираем все выделения
        if (item.code !== code) {
          item.selected = false;

        }
        //выделяемый выбранный объект и увеличиваем счетчик нажатия этого элемента 
        if (item.code === code) {
          item.numb += 1;
          item.selected = !item.selected;
        }
        return item;
      })
    })
  }
}

export default Store;

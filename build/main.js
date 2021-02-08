/**
 * Функция генерирует n-массивов, заполняет их случайными числами. Каждый массив имеет случайный размер.
 * Массивы с четным порядковым номером отсортировать по возрастанию,
 * с нечетным порядковым номером - по убыванию.
 * @param n - максимум 65536 (это лимит в js для Uint8, его мы используем для генерации случайных чисел), хотим больше - юзаем Uint16 или Uint32
 * Но так как не оговаривается максимальное число n, возьмем оптимальный для производительности Uint8.
 */
var calcAlg = function (n) {
    if (n > 65536) {
        return window.alert("Введите число меньше 65536");
    }
    var result = [];
    //   Подразумевается, что этот код будет выполняться на клиенте
    if (typeof window === "undefined") {
        return;
    }
    // Сгенирируем n-ключей, они будут использованы как размер каждого массива
    var array = new Uint8Array(n);
    // https://developer.mozilla.org/ru/docs/Web/API/Window/crypto
    window.crypto.getRandomValues(array);
    // Для каждого ключа - создадим массив
    for (var i = 0; i < array.length; i++) {
        var ind = array[i];
        // Сгенерируем случайные числа для заполнения каждого массива
        var subArr = new Uint8Array(ind);
        window.crypto.getRandomValues(subArr);
        // Здесь храним значеним подмассива
        var tmp = [];
        for (var j = 0; j < ind; j++) {
            tmp.push(subArr[j]);
        }
        // Сразу запушим отсортированные массивы (в соответствии с четностью/нечетностью индекса)
        result.push(isEven(i) ? tmp.sort(function (a, b) { return a - b; }) : tmp.sort(function (a, b) { return b - a; }));
    }
    return result;
};
/**
 * Проверка на чётность
 * @param a - проверяемое число
 */
var isEven = function (a) {
    return a % 2 === 0;
};
//# sourceMappingURL=main.js.map
var Utils = (function () {
    function toFiniteOrZero(value) {
        return Number.isFinite(value) ? value : 0;
    }

    function formatMoney(value) {
        var safe = toFiniteOrZero(value);
        return '$' + Math.round(safe).toLocaleString('en-US');
    }

    function formatPercent(value) {
        var safe = toFiniteOrZero(value);
        return (safe * 100).toFixed(1) + '%';
    }

    function formatCurrencyCompact(value) {
        if (!Number.isFinite(value)) return '$0';
        if (value >= 1000000000) return '$' + (value / 1000000000).toFixed(1) + 'B';
        if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M';
        if (value >= 1000) return '$' + Math.round(value / 1000) + 'k';
        return '$' + Math.round(value);
    }

    function isEditingTarget(target) {
        var tag = (target.tagName || '').toLowerCase();
        return tag === 'input' || tag === 'textarea' || target.isContentEditable;
    }

    return {
        toFiniteOrZero: toFiniteOrZero,
        formatMoney: formatMoney,
        formatPercent: formatPercent,
        formatCurrencyCompact: formatCurrencyCompact,
        isEditingTarget: isEditingTarget,
    };
})();

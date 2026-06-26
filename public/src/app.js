// 페이지 가 열릴 때 저장된 테마 색상을 자동으로 불러옴
document.addEventListener("DOMContentLoaded", () => {
    loadSavedColors();
});

// 사용자가 색상을 바꿨을 때 상태를 적용하고 저장하는 함수
function setColor(colorValue, cssVariable) {
    // 1. 문서 전체(Root)에 해당 색상 변수 즉시 반영
    document.documentElement.style.setProperty(cssVariable, colorValue);
    
    // 2. 브라우저 로컬 저장소에 저장하여 다른 페이지로 가도 기억하게 함
    localStorage.setItem(cssVariable, colorValue);
}

// 저장된 테마 데이터를 불러와 화면 및 인풋 창에 넣어주는 함수
function loadSavedColors() {
    const targetVariables = ['--primary', '--text', '--accent'];
    
    targetVariables.forEach(variable => {
        const savedColor = localStorage.getItem(variable);
        
        if (savedColor) {
            // 저장된 색상이 있으면 CSS 변수에 할당
            document.documentElement.style.setProperty(variable, savedColor);
            
            // 만약 현재 세팅 페이지(settings.html)라면 인풋 창 초기값도 매칭시켜줌
            const inputElementId = variable.replace('--', '') + '-color';
            const colorInput = document.getElementById(inputElementId);
            if (colorInput) {
                colorInput.value = savedColor;
            }
        }
    });
}
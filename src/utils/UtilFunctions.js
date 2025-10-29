function animateScrollTo(target, principalContainer, duration = 1000) {
    
    const start = principalContainer.current.scrollTop;
    const change = target - start;
    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const ease = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        principalContainer.current.scrollTop = start + change * ease;

        if (elapsed < duration) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

export { animateScrollTo };
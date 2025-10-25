import { useEffect, useRef } from 'react';

export default function Chart({ data, type = 'line', height = 300 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (type === 'line') {
            drawLineChart(ctx, canvas, data);
        } else if (type === 'doughnut') {
            drawDoughnutChart(ctx, canvas, data);
        }
    }, [data, type]);

    const drawLineChart = (ctx, canvas, data) => {
        const { labels, users, appointments } = data;
        const padding = 40;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;

        // Draw axes
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Draw grid lines
        ctx.strokeStyle = '#f3f4f6';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();
        }

        // Draw user line
        if (users) {
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.beginPath();
            users.forEach((value, index) => {
                const x = padding + (chartWidth / (users.length - 1)) * index;
                const y = canvas.height - padding - (value / Math.max(...users)) * chartHeight;
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();

            // Draw points
            ctx.fillStyle = '#3b82f6';
            users.forEach((value, index) => {
                const x = padding + (chartWidth / (users.length - 1)) * index;
                const y = canvas.height - padding - (value / Math.max(...users)) * chartHeight;
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
            });
        }

        // Draw labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        labels.forEach((label, index) => {
            const x = padding + (chartWidth / (labels.length - 1)) * index;
            ctx.fillText(label, x, canvas.height - padding + 20);
        });
    };

    const drawDoughnutChart = (ctx, canvas, data) => {
        const { labels, datasets } = data;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 40;
        const innerRadius = radius * 0.6;

        let currentAngle = 0;
        const total = datasets[0].data.reduce((sum, value) => sum + value, 0);

        datasets[0].data.forEach((value, index) => {
            const sliceAngle = (value / total) * 2 * Math.PI;

            // Draw slice
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
            ctx.closePath();
            ctx.fillStyle = datasets[0].backgroundColor[index];
            ctx.fill();

            // Draw label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 20);

            ctx.fillStyle = '#374151';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(labels[index], labelX, labelY);

            currentAngle += sliceAngle;
        });
    };

    return (
        <div className="w-full">
            <canvas ref={canvasRef} width={800} height={height} className="h-full w-full" />
        </div>
    );
}

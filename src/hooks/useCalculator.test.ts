import { renderHook, act, waitFor } from '@testing-library/react';
import useCalculator, { UseCalculatorInput } from './useCalculator';

describe('useCalculator', () => {
  const initialProps: UseCalculatorInput = {
    itemsPriceTotalA: 100,
    itemsPriceTotalB: 200,
  };

  it('should initialize with correct initial values', () => {
    const { result } = renderHook(() => useCalculator(initialProps));
    expect(result.current.input).toBe('');
    expect(result.current.result).toBe('');
    expect(result.current.error).toBe('');
  });

  it('should set input correctly', async () => {
    const { result } = renderHook(() => useCalculator(initialProps));

    act(() => {
      result.current.setInput('A+B');
    });

    await waitFor(() => {
      expect(result.current.input).toBe('A+B');
    });
  });

  it('should calculate the correct result for "A+B"', async () => {
    const { result } = renderHook(() => useCalculator(initialProps));

    act(() => {
      result.current.setInput('A+B');
    });

    act(() => {
      result.current.calculate();
    });

    await waitFor(() => {
      expect(result.current.result).toBe('300.00');
      expect(result.current.error).toBe('');
    });
  });

  it('should calculate the correct result for "A-B"', async () => {
    const { result } = renderHook(() => useCalculator(initialProps));

    act(() => {
      result.current.setInput('A-B');
    });

    act(() => {
      result.current.calculate();
    });

    await waitFor(() => {
      expect(result.current.result).toBe('-100.00');
      expect(result.current.error).toBe('');
    });
  });

  it('should calculate the correct result for "A*B"', async () => {
    const { result } = renderHook(() => useCalculator(initialProps));

    act(() => {
      result.current.setInput('A*B');
    });

    act(() => {
      result.current.calculate();
    });

    await waitFor(() => {
      expect(result.current.result).toBe('20000.00');
      expect(result.current.error).toBe('');
    });
  });

  it('should handle invalid input gracefully', async () => {
    const { result } = renderHook(() => useCalculator(initialProps));

    act(() => {
      result.current.setInput('A#B');
    });

    act(() => {
      result.current.calculate();
    });

    await waitFor(() => {
      expect(result.current.result).toBe('');
      expect(result.current.error).toBe(
        'Invalid input format. Please enter "A", "B", or use A or B followed by an operator (+, -, *, /, %) and A or B (e.g., A+B, B-A).'
      );
    });
  });

  it('should handle division by zero', async () => {
    const zeroProps: UseCalculatorInput = {
      itemsPriceTotalA: 100,
      itemsPriceTotalB: 0,
    };
    const { result } = renderHook(() => useCalculator(zeroProps));

    act(() => {
      result.current.setInput('A/B');
    });

    act(() => {
      result.current.calculate();
    });

    await waitFor(() => {
      expect(result.current.result).toBe('');
      expect(result.current.error).toBe('Error in calculation: Division by zero.');
    });
  });
});

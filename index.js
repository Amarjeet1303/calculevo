import { useEffect, useState } from 'react'
import Head from 'next/head'

function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)

  function calculateBMI() {
    if (!weight || !height) return
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    const bmiVal = w / (h * h)
    setBmi(bmiVal.toFixed(2))
  }

  return (
    <div>
      <div className="flex gap-3 mb-3 flex-wrap">
        <input
          type="number"
          className="border px-2 py-1 rounded w-32"
          placeholder="Weight (kg)"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
        <input
          type="number"
          className="border px-2 py-1 rounded w-32"
          placeholder="Height (cm)"
          value={height}
          onChange={e => setHeight(e.target.value)}
        />
        <button
          onClick={calculateBMI}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Calculate
        </button>
      </div>
      {bmi && (
        <div>
          <p>Your BMI is <span className="font-bold">{bmi}</span></p>
        </div>
      )}
    </div>
  )
}

function LoanCalculator() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [emi, setEmi] = useState(null)

  function calculateEMI() {
    const P = parseFloat(principal)
    const N = parseFloat(years) * 12
    const R = parseFloat(rate) / 12 / 100
    if (!P || !N || !R) return
    const emiVal = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1)
    setEmi(emiVal.toFixed(2))
  }

  return (
    <div>
      <div className="flex gap-3 mb-3 flex-wrap">
        <input
          type="number"
          className="border px-2 py-1 rounded w-32"
          placeholder="Principal (₹)"
          value={principal}
          onChange={e => setPrincipal(e.target.value)}
        />
        <input
          type="number"
          className="border px-2 py-1 rounded w-32"
          placeholder="Rate (%)"
          value={rate}
          onChange={e => setRate(e.target.value)}
        />
        <input
          type="number"
          className="border px-2 py-1 rounded w-32"
          placeholder="Tenure (years)"
          value={years}
          onChange={e => setYears(e.target.value)}
        />
        <button
          onClick={calculateEMI}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Calculate
        </button>
      </div>
      {emi && (
        <div>
          <p>Your monthly EMI: <span className="font-bold">₹{emi}</span></p>
        </div>
      )}
    </div>
  )
}

function AgeCalculator() {
  const [dob, setDob] = useState('')
  const [age, setAge] = useState(null)

  function calculateAge() {
    if (!dob) return
    const birthDate = new Date(dob)
    const now = new Date()
    let years = now.getFullYear() - birthDate.getFullYear()
    let months = now.getMonth() - birthDate.getMonth()
    let days = now.getDate() - birthDate.getDate()
    if (days < 0) {
      months--
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }
    setAge({ years, months, days })
  }

  return (
    <div>
      <div className="flex gap-3 mb-3">
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={dob}
          onChange={e => setDob(e.target.value)}
        />
        <button
          onClick={calculateAge}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Calculate
        </button>
      </div>
      {age && (
        <div>
          <p>
            You are <span className="font-bold">{age.years}</span> years,{' '}
            <span className="font-bold">{age.months}</span> months,{' '}
            <span className="font-bold">{age.days}</span> days old.
          </p>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  // Simple dark mode toggle
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <>
      <Head>
        <title>Pro Calculators | All-in-One</title>
        <meta name="description" content="BMI, Loan, Age - Trending Professional Calculator Website" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pro Calculators</h1>
          <button
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>
        </header>
        <main className="flex-1 container mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold mb-6">All Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* BMI Calculator */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">BMI Calculator</h3>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">Calculate your Body Mass Index and see if you're in a healthy range.</p>
              <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded mb-4 text-xs">
                <strong>Formula:</strong> BMI = weight (kg) / [height (m)]²
              </div>
              <BMICalculator />
            </div>
            {/* Loan Calculator */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Loan Calculator</h3>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">Estimate your monthly loan payments and total interest.</p>
              <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded mb-4 text-xs">
                <strong>Formula:</strong> EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
              </div>
              <LoanCalculator />
            </div>
            {/* Age Calculator */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Age Calculator</h3>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">Find out your exact age in years, months, and days.</p>
              <div className="bg-blue-50 dark:bg-gray-700 p-2 rounded mb-4 text-xs">
                <strong>Formula:</strong> Age = Current Date - Birth Date
              </div>
              <AgeCalculator />
            </div>
          </div>
        </main>
        <footer className="text-center text-xs py-4 opacity-70 dark:text-gray-200">
          &copy; {new Date().getFullYear()} Pro Calculators. All rights reserved.
        </footer>
      </div>
    </>
  )
}

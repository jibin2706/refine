import { Clipboard, getPreferenceValues, getSelectedText, showToast, Toast } from '@raycast/api'
import OpenAI from 'openai'

interface Preferences {
	apiKey: string
	model: string
}

const SYSTEM_PROMPT = `You are a grammar correction assistant. Fix grammar, spelling, and punctuation in the provided text. Return ONLY the corrected text, with no explanations, commentary, or extra content. Preserve the original tone, style, and meaning.`

export default async function main() {
	const { apiKey, model } = getPreferenceValues<Preferences>()

	let selectedText: string
	try {
		selectedText = await getSelectedText()
	} catch {
		await showToast({
			style: Toast.Style.Failure,
			title: 'No text selected',
			message: 'Please select some text before running this command',
		})
		return
	}

	if (!selectedText.trim()) {
		await showToast({
			style: Toast.Style.Failure,
			title: 'No text selected',
			message: 'Please select some text before running this command',
		})
		return
	}

	const toast = await showToast({
		style: Toast.Style.Animated,
		title: 'Improving grammar...',
	})

	try {
		const client = new OpenAI({ apiKey })

		const response = await client.chat.completions.create({
			model: model || 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: SYSTEM_PROMPT },
				{ role: 'user', content: selectedText },
			],
			temperature: 0.2,
		})

		const improvedText = response.choices[0]?.message?.content
		if (!improvedText) {
			throw new Error('Empty response from OpenAI')
		}

		await Clipboard.paste(improvedText)

		toast.style = Toast.Style.Success
		toast.title = 'Grammar improved'
	} catch (error) {
		toast.style = Toast.Style.Failure
		toast.title = 'Failed to improve grammar'
		toast.message = error instanceof Error ? error.message : String(error)
	}
}

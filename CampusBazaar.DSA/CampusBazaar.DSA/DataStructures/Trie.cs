using System;
using System.Collections.Generic;

namespace CampusBazaar.DSA.DataStructures
{
    public class TrieNode
    {
        // Maps each character to its next TrieNode
        public Dictionary<char, TrieNode> Children { get; set; }

        // True if a complete word/token ends at this node
        public bool IsEndOfWord { get; set; }

        // Stores IDs of ResourceItem objects that match this word/prefix
        public HashSet<int> ResourceIds { get; set; }

        public TrieNode()
        {
            Children = new Dictionary<char, TrieNode>();
            IsEndOfWord = false;
            ResourceIds = new HashSet<int>();
        }
    }

    public class Trie
    {
        private readonly TrieNode _root;

        public Trie()
        {
            _root = new TrieNode();
        }

        // Inserts a single word/token and associates it with a ResourceItem ID
        public void InsertWord(string word, int resourceId)
        {
            if (string.IsNullOrWhiteSpace(word))
                return;

            string normalized = word.ToLowerInvariant().Trim();
            TrieNode current = _root;

            foreach (char ch in normalized)
            {
                if (!current.Children.ContainsKey(ch))
                {
                    current.Children[ch] = new TrieNode();
                }

                current = current.Children[ch];
                // Storing resourceId along the path also helps collect matching IDs later
                current.ResourceIds.Add(resourceId);
            }

            current.IsEndOfWord = true;
        }

        // Splits a title/phrase into searchable words and inserts each one
        public void IndexTitle(string title, int resourceId)
        {
            if (string.IsNullOrWhiteSpace(title))
                return;

            char[] delimiters = { ' ', '-', '_', '/', '\\', ',', '.', ':', ';', '(', ')', '[', ']' };
            string[] tokens = title.Split(delimiters, StringSplitOptions.RemoveEmptyEntries);

            foreach (string token in tokens)
            {
                InsertWord(token, resourceId);
            }
        }

        // Helper check to verify if a full word was inserted
        public bool ContainsWord(string word)
        {
            if (string.IsNullOrWhiteSpace(word))
                return false;

            string normalized = word.ToLowerInvariant().Trim();
            TrieNode current = _root;

            foreach (char ch in normalized)
            {
                if (!current.Children.TryGetValue(ch, out TrieNode nextNode))
                {
                    return false;
                }
                current = nextNode;
            }

            return current.IsEndOfWord;
        }

        // Returns all ResourceItem IDs whose indexed words start with the given prefix
        public List<int> SearchPrefix(string prefix)
        {
            List<int> results = new List<int>();

            if (string.IsNullOrWhiteSpace(prefix))
                return results;

            string normalized = prefix.ToLowerInvariant().Trim();
            TrieNode current = _root;

            foreach (char ch in normalized)
            {
                if (!current.Children.TryGetValue(ch, out TrieNode nextNode))
                {
                    return results;
                }
                current = nextNode;
            }

            results.AddRange(current.ResourceIds);
            return results;
        }
    }
}